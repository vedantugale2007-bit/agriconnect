import { VehicleType, CargoType } from '../types';

export interface VehicleCapacityInfo {
  maxWeightKg: number;
  maxWeightTons: number;
  recommendedCrops: CargoType[];
  displayNameMr: string;
}

export const VEHICLE_CAPACITIES: Record<VehicleType, VehicleCapacityInfo> = {
  'Tata Ace Gold': {
    maxWeightKg: 1500,
    maxWeightTons: 1.5,
    recommendedCrops: ['Tomato', 'Pomegranate', 'Grapes'],
    displayNameMr: 'टाटा एस (Tata Ace - १.५ टन)',
  },
  'Mahindra Bolero Pickup': {
    maxWeightKg: 2500,
    maxWeightTons: 2.5,
    recommendedCrops: ['Onion', 'Tomato', 'Pomegranate', 'Wheat', 'Maize'],
    displayNameMr: 'महेंद्र बोलेरो पिकअप (Bolero Pickup - २.५ टन)',
  },
  'Mahindra Jeeto': {
    maxWeightKg: 1200,
    maxWeightTons: 1.2,
    recommendedCrops: ['Tomato', 'Grapes'],
    displayNameMr: 'महेंद्र जितो (Mahindra Jeeto - १.२ टन)',
  },
  'Ashok Leyland Dost': {
    maxWeightKg: 2000,
    maxWeightTons: 2.0,
    recommendedCrops: ['Onion', 'Tomato', 'Pomegranate'],
    displayNameMr: 'अशोक लेलँड दोस्त (Ashok Leyland Dost - २.० टन)',
  },
  'Eicher 14 ft': {
    maxWeightKg: 6000,
    maxWeightTons: 6.0,
    recommendedCrops: ['Onion', 'Grapes', 'Soybean', 'Wheat', 'Maize'],
    displayNameMr: 'आयशर १४ फूट (Eicher 14 ft - ६ टन)',
  },
  'BharatBenz Truck': {
    maxWeightKg: 16000,
    maxWeightTons: 16.0,
    recommendedCrops: ['Onion', 'Sugarcane', 'Maize', 'Soybean', 'Wheat'],
    displayNameMr: 'भारतबेंझ १० चाकी (BharatBenz Heavy - १६ टन)',
  },
  'Tata 407': {
    maxWeightKg: 4500,
    maxWeightTons: 4.5,
    recommendedCrops: ['Onion', 'Grapes', 'Soybean', 'Wheat'],
    displayNameMr: 'टाटा ४०७ (Tata 407 - ४.५ टन)',
  },
};

export interface LoadAnalysis {
  isOverloaded: boolean;
  overloadPercent: number;
  maxCapacityKg: number;
  recommendedVehicle?: VehicleType;
  messageMr: string;
  messageEn: string;
}

export function analyzeLoadCapacity(vehicle: VehicleType, weightKg: number): LoadAnalysis {
  const spec = VEHICLE_CAPACITIES[vehicle] || VEHICLE_CAPACITIES['Eicher 14 ft'];
  const maxCapacityKg = spec.maxWeightKg;

  if (weightKg <= maxCapacityKg) {
    return {
      isOverloaded: false,
      overloadPercent: 0,
      maxCapacityKg,
      messageMr: `वाहन क्षमता सुरेख जुळत आहे (${weightKg} किग्रा / ${maxCapacityKg} किग्रा क्षमता)`,
      messageEn: `Optimal load weight (${weightKg} kg / ${maxCapacityKg} kg max)`,
    };
  }

  const overloadKg = weightKg - maxCapacityKg;
  const overloadPercent = Math.round((overloadKg / maxCapacityKg) * 100);

  // Suggest better vehicle
  let recommendedVehicle: VehicleType = 'Eicher 14 ft';
  if (weightKg <= 1500) recommendedVehicle = 'Tata Ace Gold';
  else if (weightKg <= 2500) recommendedVehicle = 'Mahindra Bolero Pickup';
  else if (weightKg <= 6000) recommendedVehicle = 'Eicher 14 ft';
  else recommendedVehicle = 'BharatBenz Truck';

  return {
    isOverloaded: true,
    overloadPercent,
    maxCapacityKg,
    recommendedVehicle,
    messageMr: `इशारा: निवडलेले वाहन ${overloadPercent}% ने ओव्हरलोड आहे! सुरक्षिततेसाठी ${VEHICLE_CAPACITIES[recommendedVehicle]?.displayNameMr} वापरा.`,
    messageEn: `Warning: Vehicle is overloaded by ${overloadPercent}%! Recommended: ${recommendedVehicle}.`,
  };
}
