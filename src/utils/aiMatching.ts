import { Transporter, CargoType, VehicleType } from '../types';

export interface TransporterMatchResult {
  transporter: Transporter;
  matchScore: number; // 0 to 100
  matchReason: string;
  badge: 'BEST_VALUE' | 'FASTEST' | 'TOP_RATED' | 'COLD_CHAIN_RECOMMENDED' | 'HIGH_CAPACITY';
  estimatedCost: number;
}

export function matchTransportersForLoad(
  crop: CargoType,
  weightKg: number,
  transporters: Transporter[],
  distanceKm: number = 65
): TransporterMatchResult[] {
  const weightTons = weightKg / 1000;

  return transporters
    .map((transporter) => {
      let score = 70;
      let reason = 'मानक जुळणी (Standard Fit)';
      let badge: TransporterMatchResult['badge'] = 'BEST_VALUE';

      // Capacity Check
      const capacityRatio = weightTons / transporter.capacityTons;
      if (capacityRatio > 1.0) {
        score -= 40; // Overloaded
        reason = 'क्षमता अपुरी आहे (Capacity Insufficient)';
      } else if (capacityRatio >= 0.7 && capacityRatio <= 0.95) {
        score += 15; // Optimal load
        reason = 'योग्य वाहन क्षमता (Optimal Vehicle Capacity)';
      }

      // Crop specific requirement
      if ((crop === 'Grapes' || crop === 'Tomato') && transporter.vehicleType.toLowerCase().includes('cold')) {
        score += 20;
        reason = 'शीत साखळी उपलब्ध (Cold Chain Available)';
        badge = 'COLD_CHAIN_RECOMMENDED';
      }

      // High Rating Bonus
      if (transporter.rating >= 4.9) {
        score += 10;
        if (badge !== 'COLD_CHAIN_RECOMMENDED') badge = 'TOP_RATED';
      }

      // Cost estimation
      const estimatedCost = Math.round(weightTons * transporter.ratePerTonMile * distanceKm * 0.1) + 500;

      // Price Competitiveness
      if (transporter.ratePerTonMile <= 22) {
        score += 10;
        if (badge === 'BEST_VALUE') badge = 'BEST_VALUE';
      }

      if (transporter.capacityTons >= 10 && weightTons >= 8) {
        badge = 'HIGH_CAPACITY';
      }

      const finalScore = Math.min(99, Math.max(30, Math.round(score)));

      return {
        transporter,
        matchScore: finalScore,
        matchReason: reason,
        badge,
        estimatedCost,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
