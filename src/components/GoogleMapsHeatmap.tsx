/// <reference types="google.maps" />
// Source: Google Maps Platform Code Assist
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { 
  APIProvider, 
  Map, 
  useMap, 
  useMapsLibrary,
  InfoWindow,
  AdvancedMarker
} from '@vis.gl/react-google-maps';
import { 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Layers, 
  Flame, 
  MapPin, 
  Sliders, 
  CheckCircle2, 
  Eye,
  Award
} from 'lucide-react';
import { BairroMapItem } from './FortalezaElectoralMap';
import { FORTALEZA_COORDINATES } from '../data/electoralFortalezaData';

const GOOGLE_MAPS_API_KEY = 
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCA0oMrVvB0LROTVsngMoLvs5VslNYwOSw';

interface GoogleMapsHeatmapProps {
  bairrosData: BairroMapItem[];
  totalVotosRecorte: number;
  selectedBairro?: string | null;
  onSelectBairro?: (bairro: string) => void;
}

// Subcomponent: Native Google Maps HeatmapLayer
const GoogleHeatmapLayer: React.FC<{
  bairrosData: BairroMapItem[];
  radius: number;
  opacity: number;
  visible: boolean;
}> = ({ bairrosData, radius, opacity, visible }) => {
  const map = useMap();
  const visualizationLib = useMapsLibrary('visualization');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heatmapRef = useRef<any>(null);

  useEffect(() => {
    if (!map || !visualizationLib) return;

    if (!heatmapRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const HeatmapConstructor = (visualizationLib as any).HeatmapLayer || (window as any).google?.maps?.visualization?.HeatmapLayer;
      if (HeatmapConstructor) {
        heatmapRef.current = new HeatmapConstructor({
          map: visible ? map : null,
          radius,
          opacity,
          gradient: [
            'rgba(0, 0, 0, 0)',
            'rgba(56, 189, 248, 0.4)',
            'rgba(56, 189, 248, 0.8)',
            'rgba(251, 191, 36, 0.9)',
            'rgba(249, 115, 22, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(185, 28, 28, 1)'
          ]
        });
      }
    }

    return () => {
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
        heatmapRef.current = null;
      }
    };
  }, [map, visualizationLib]);

  // Update data & parameters
  useEffect(() => {
    if (!heatmapRef.current) return;

    heatmapRef.current.setMap(visible && map ? map : null);
    heatmapRef.current.set('radius', radius);
    heatmapRef.current.set('opacity', opacity);

    const points = bairrosData
      .filter((b) => b.votos > 0)
      .map((b) => {
        const coords = FORTALEZA_COORDINATES[b.bairro] || [b.lat, b.lon];
        return {
          location: new google.maps.LatLng(coords[0], coords[1]),
          weight: Math.sqrt(b.votos) // Scaled weight for smooth kernel density
        };
      });

    heatmapRef.current.setData(points);
  }, [bairrosData, radius, opacity, visible, map]);

  return null;
};

// Subcomponent: Interactive Circles (Heat Bubbles Overlay)
const InteractiveCircles: React.FC<{
  bairrosData: BairroMapItem[];
  visible: boolean;
  selectedBairro?: string | null;
  onSelectBairro?: (bairro: string) => void;
  onOpenInfoWindow: (item: BairroMapItem) => void;
}> = ({ bairrosData, visible, selectedBairro, onSelectBairro, onOpenInfoWindow }) => {
  const map = useMap();
  const circlesRef = useRef<google.maps.Circle[]>([]);

  useEffect(() => {
    if (!map) return;

    // Clear old circles
    circlesRef.current.forEach((c) => c.setMap(null));
    circlesRef.current = [];

    if (!visible || bairrosData.length === 0) return;

    const maxVotes = Math.max(...bairrosData.map((b) => b.votos), 1);
    const minVotes = Math.min(...bairrosData.map((b) => b.votos), 0);

    bairrosData.forEach((item) => {
      const coords = FORTALEZA_COORDINATES[item.bairro] || [item.lat, item.lon];
      if (!coords || !coords[0] || !coords[1]) return;

      const normalized = (item.votos - minVotes) / (maxVotes - minVotes || 1);
      const radiusMeters = 350 + Math.sqrt(normalized) * 1150; // Dynamic geographic radius (350m to 1500m)

      let fillColor = '#38bdf8';
      let strokeColor = '#0284c7';
      if (normalized > 0.65) {
        fillColor = '#ef4444';
        strokeColor = '#b91c1c';
      } else if (normalized > 0.35) {
        fillColor = '#f97316';
        strokeColor = '#c2410c';
      } else if (normalized > 0.15) {
        fillColor = '#f59e0b';
        strokeColor = '#d97706';
      }

      const isSelected = selectedBairro === item.bairro;

      const circle = new google.maps.Circle({
        strokeColor: isSelected ? '#ffffff' : strokeColor,
        strokeOpacity: 0.95,
        strokeWeight: isSelected ? 3 : 1.5,
        fillColor,
        fillOpacity: isSelected ? 0.75 : 0.45,
        map,
        center: { lat: coords[0], lng: coords[1] },
        radius: isSelected ? radiusMeters * 1.15 : radiusMeters,
        clickable: true,
        zIndex: isSelected ? 999 : Math.floor(normalized * 100)
      });

      circle.addListener('click', () => {
        if (onSelectBairro) onSelectBairro(item.bairro);
        onOpenInfoWindow(item);
      });

      circlesRef.current.push(circle);
    });

    return () => {
      circlesRef.current.forEach((c) => c.setMap(null));
      circlesRef.current = [];
    };
  }, [map, bairrosData, visible, selectedBairro, onSelectBairro, onOpenInfoWindow]);

  return null;
};

// Dark Style for Google Maps
const DARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#111827' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#111827' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9ca3af' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3f4f6' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b7280' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#1f2937' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1f2937' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#374151' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca3af' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#374151' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#4b5563' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1f2937' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#090d16' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4b5563' }]
  }
];

export const GoogleMapsHeatmap: React.FC<GoogleMapsHeatmapProps> = ({
  bairrosData,
  totalVotosRecorte,
  selectedBairro,
  onSelectBairro
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');
  const [viewMode, setViewMode] = useState<'heatmap' | 'bubbles' | 'hybrid'>('heatmap');
  const [radius, setRadius] = useState<number>(34);
  const [opacity, setOpacity] = useState<number>(0.85);
  const [activeInfoWindow, setActiveInfoWindow] = useState<BairroMapItem | null>(null);

  const FORTALEZA_CENTER = { lat: -3.7550, lng: -38.5300 };

  const handleResetCenter = () => {
    setActiveInfoWindow(null);
  };

  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 transition-all ${
      isFullscreen ? 'fixed inset-4 z-50 shadow-2xl flex flex-col' : 'w-full'
    }`}>
      
      {/* Google Maps Toolbar */}
      <div className="bg-slate-900/95 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          {/* Google Maps Icon Badge */}
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Google Maps Platform · Heatmap Oficial
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {bairrosData.length} Bairros Mapeados
          </span>
        </div>

        {/* View Mode Switches */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Mode Selector */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'heatmap'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mapa de Calor
            </button>
            <button
              onClick={() => setViewMode('bubbles')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'bubbles'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bolhas
            </button>
            <button
              onClick={() => setViewMode('hybrid')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'hybrid'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Híbrido
            </button>
          </div>

          {/* Map Type (Roadmap vs Satellite) */}
          <button
            onClick={() => setMapType(mapType === 'roadmap' ? 'hybrid' : 'roadmap')}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Alternar visão de satélite / roadmap"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{mapType === 'roadmap' ? 'Satélite' : 'Vetor Escuro'}</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Alternar tela cheia"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Fechar' : 'Tela Cheia'}</span>
          </button>
        </div>
      </div>

      {/* Google Maps Container */}
      <div className={`w-full ${isFullscreen ? 'flex-1 h-full' : 'h-[520px] sm:h-[600px]'} relative bg-slate-950`}>
        <APIProvider 
          apiKey={GOOGLE_MAPS_API_KEY}
          solutionChannel="GMP_aistudio"
        >
          <Map
            id="fortaleza-electoral-map"
            mapId="DEMO_MAP_ID"
            defaultCenter={FORTALEZA_CENTER}
            defaultZoom={11.7}
            mapTypeId={mapType}
            styles={mapType === 'roadmap' ? DARK_MAP_STYLE : undefined}
            disableDefaultUI={false}
            zoomControl={true}
            streetViewControl={false}
            mapTypeControl={false}
            fullscreenControl={false}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            className="w-full h-full"
          >
            {/* Native Google Maps Heatmap Layer */}
            <GoogleHeatmapLayer
              bairrosData={bairrosData}
              radius={radius}
              opacity={opacity}
              visible={viewMode === 'heatmap' || viewMode === 'hybrid'}
            />

            {/* Interactive Circles / Heat Bubbles */}
            <InteractiveCircles
              bairrosData={bairrosData}
              visible={viewMode === 'bubbles' || viewMode === 'hybrid'}
              selectedBairro={selectedBairro}
              onSelectBairro={onSelectBairro}
              onOpenInfoWindow={(item) => setActiveInfoWindow(item)}
            />

            {/* InfoWindow for Clicked Neighborhood */}
            {activeInfoWindow && (
              <InfoWindow
                position={{
                  lat: FORTALEZA_COORDINATES[activeInfoWindow.bairro]?.[0] || activeInfoWindow.lat,
                  lng: FORTALEZA_COORDINATES[activeInfoWindow.bairro]?.[1] || activeInfoWindow.lon
                }}
                onCloseClick={() => setActiveInfoWindow(null)}
              >
                <div className="p-1 min-w-[210px] text-slate-900 font-sans">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 border-b border-slate-200 pb-1 mb-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{activeInfoWindow.bairro}</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Votos no Bairro:</span>
                      <span className="font-bold text-slate-950">
                        {activeInfoWindow.votos.toLocaleString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-600">% do Recorte:</span>
                      <span className="font-bold text-emerald-600">
                        {totalVotosRecorte > 0 
                          ? ((activeInfoWindow.votos / totalVotosRecorte) * 100).toFixed(2)
                          : '0.00'}%
                      </span>
                    </div>
                  </div>

                  {activeInfoWindow.topCandidatos && activeInfoWindow.topCandidatos.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500 mb-1">
                        Mais Votados no Bairro:
                      </div>
                      <div className="space-y-1">
                        {activeInfoWindow.topCandidatos.slice(0, 3).map((c, idx) => (
                          <div key={idx} className="flex justify-between text-[11px] text-slate-700">
                            <span className="truncate max-w-[130px]">{idx + 1}. {c.nome}</span>
                            <span className="font-mono font-bold text-amber-700">
                              {c.votos.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>

        {/* Floating Parameter Controls (Slider para Raio e Opacidade do Heatmap) */}
        <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-3 text-xs shadow-2xl max-w-xs space-y-2.5">
          <div className="flex items-center justify-between text-slate-200 font-semibold border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Parâmetros Térmicos
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Google Maps</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Raio de Dispersão:</span>
              <span className="font-mono font-bold text-amber-400">{radius}px</span>
            </div>
            <input
              type="range"
              min="15"
              max="55"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Opacidade:</span>
              <span className="font-mono font-bold text-amber-400">{(opacity * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.3"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Bottom Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-3 text-xs shadow-xl max-w-xs pointer-events-auto">
          <div className="font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Gradiente Térmico de Densidade</span>
          </div>
          
          <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 via-orange-500 to-red-600 mb-1.5" />
          
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>Baixa Densidade</span>
            <span>Média</span>
            <span>Alta Concentração</span>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
            * Processamento oficial Google Maps Platform via biblioteca Visualization.
          </div>
        </div>
      </div>
    </div>
  );
};
