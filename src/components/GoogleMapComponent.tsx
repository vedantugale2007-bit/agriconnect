import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Compass, Layers, ShieldCheck, AlertCircle } from 'lucide-react';

interface GoogleMapProps {
  pickupLat?: number;
  pickupLng?: number;
  destinationLat?: number;
  destinationLng?: number;
  vehicleLat?: number;
  vehicleLng?: number;
  pickupTitle?: string;
  destinationTitle?: string;
  vehicleTitle?: string;
  height?: string;
  interactive?: boolean;
}

// Inner route rendering component using Routes library
const DirectionsRoute: React.FC<{
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  showTraffic?: boolean;
}> = ({ origin, destination, showTraffic }) => {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (showTraffic) {
      if (!trafficLayerRef.current) {
        trafficLayerRef.current = new google.maps.TrafficLayer();
      }
      trafficLayerRef.current.setMap(map);
    } else if (trafficLayerRef.current) {
      trafficLayerRef.current.setMap(null);
    }
  }, [map, showTraffic]);

  useEffect(() => {
    if (!routesLib || !map) return;

    // Clear previous polylines
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    routesLib.Route.computeRoutes({
      origin,
      destination,
      travelMode: 'DRIVING',
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport'],
    })
      .then(({ routes }) => {
        if (routes?.[0]) {
          const newPolylines = routes[0].createPolylines({
            polylineOptions: {
              strokeColor: '#10b981', // Emerald 500
              strokeWeight: 6,
              strokeOpacity: 0.9,
            },
          });
          newPolylines.forEach((p) => p.setMap(map));
          polylinesRef.current = newPolylines;

          if (routes[0].viewport) {
            map.fitBounds(routes[0].viewport);
          }
        }
      })
      .catch((err) => {
        console.warn('Google Routes compute error (fallback active):', err);
      });

    return () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, [routesLib, map, origin.lat, origin.lng, destination.lat, destination.lng]);

  return null;
};

export const GoogleMapComponent: React.FC<GoogleMapProps> = ({
  pickupLat = 19.845,
  pickupLng = 74.02,
  destinationLat = 20.08,
  destinationLng = 74.52,
  vehicleLat = 19.92,
  vehicleLng = 74.25,
  pickupTitle = 'सिन्नर (Sinnar Pickup)',
  destinationTitle = 'लासलगाव APMC (Lasalgaon Market)',
  vehicleTitle = 'MH 15 EG 4821 (आयशर १४ फूट)',
  height = '400px',
  interactive = true,
}) => {
  const API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
    '';

  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [showTraffic, setShowTraffic] = useState<boolean>(true);

  // Center calculation
  const centerLat = (pickupLat + destinationLat) / 2;
  const centerLng = (pickupLng + destinationLng) / 2;

  if (!hasValidKey) {
    return (
      <div
        style={{ height }}
        className="w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative flex flex-col justify-between p-4 shadow-2xl"
      >
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#052e16_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Top Control Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white font-display">
              नाशिक - अहमदनगर महामार्ग क्र. ६० (Live GPS Route)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              लासलगाव APMC मार्ग
            </span>
          </div>
        </div>

        {/* Center Route Canvas Simulation */}
        <div className="relative z-10 my-auto text-center space-y-4 px-2">
          <div className="inline-flex items-center space-x-3 bg-slate-900/90 border border-emerald-500/40 px-4 py-2.5 rounded-2xl shadow-xl">
            <Navigation className="w-5 h-5 text-teal-400 animate-pulse" />
            <div className="text-left">
              <div className="text-xs font-extrabold text-white">{vehicleTitle}</div>
              <div className="text-[10px] text-emerald-300 font-medium">
                पिंपळगाव बायपास जवळ • ५५ किमी/तास • ५०० किग्रा कांदा
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full w-[68%] transition-all duration-500" />
          </div>

          <div className="flex justify-between max-w-md mx-auto text-[11px] font-bold text-slate-300 px-1">
            <span className="text-emerald-400 flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{pickupTitle}</span>
            </span>
            <span className="text-amber-300 flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{destinationTitle}</span>
            </span>
          </div>
        </div>

        {/* Key Info Banner */}
        <div className="relative z-10 bg-slate-900/90 border border-amber-500/30 p-2.5 rounded-xl text-left flex items-start space-x-2 text-[11px]">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-slate-300">
            <strong className="text-amber-300">गूगल मॅप जोडण्यासाठी:</strong> Settings (⚙️) → Secrets →
            <code className="text-emerald-300 mx-1 px-1 bg-slate-950 rounded border border-slate-800">
              GOOGLE_MAPS_PLATFORM_KEY
            </code>
            मधे तुमची API Key टाका.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Map Control Toolbar */}
      <div className="absolute top-3 right-3 z-20 flex items-center space-x-2 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 text-xs backdrop-blur-md">
        <button
          onClick={() => setMapType('roadmap')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            mapType === 'roadmap' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          रस्ता (Map)
        </button>
        <button
          onClick={() => setMapType('satellite')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            mapType === 'satellite' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          उपग्रह (Satellite)
        </button>
        <button
          onClick={() => setMapType('hybrid')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            mapType === 'hybrid' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          हायब्रिड (Hybrid)
        </button>
        <button
          onClick={() => setMapType('terrain')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            mapType === 'terrain' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          जमीन (Terrain)
        </button>
        <button
          onClick={() => setShowTraffic(!showTraffic)}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            showTraffic ? 'bg-teal-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          रहदारी (Traffic)
        </button>
      </div>

      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: centerLat, lng: centerLng }}
          defaultZoom={10}
          mapId="DEMO_MAP_ID"
          mapTypeId={mapType}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Directions & Polyline */}
          <DirectionsRoute
            origin={{ lat: pickupLat, lng: pickupLng }}
            destination={{ lat: destinationLat, lng: destinationLng }}
            showTraffic={showTraffic}
          />

          {/* Pickup Marker */}
          <AdvancedMarker position={{ lat: pickupLat, lng: pickupLng }} title={pickupTitle}>
            <Pin background="#10b981" borderColor="#047857" glyphColor="#ffffff" />
          </AdvancedMarker>

          {/* Destination Marker */}
          <AdvancedMarker position={{ lat: destinationLat, lng: destinationLng }} title={destinationTitle}>
            <Pin background="#f59e0b" borderColor="#b45309" glyphColor="#ffffff" />
          </AdvancedMarker>

          {/* Vehicle Marker */}
          <AdvancedMarker position={{ lat: vehicleLat, lng: vehicleLng }} title={vehicleTitle}>
            <div className="p-2 bg-emerald-500 text-slate-950 font-black text-xs rounded-full shadow-xl border-2 border-white animate-bounce flex items-center justify-center">
              <Navigation className="w-4 h-4 fill-slate-950" />
            </div>
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};
