import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Maximize2, Minimize2, RotateCcw, MapPin, Layers } from 'lucide-react';
import { FORTALEZA_COORDINATES } from '../data/electoralFortalezaData';

export interface BairroMapItem {
  bairro: string;
  votos: number;
  pct: number;
  lat: number;
  lon: number;
  topCandidatos?: { nome: string; votos: number; status: string }[];
}

interface FortalezaElectoralMapProps {
  bairrosData: BairroMapItem[];
  totalVotosRecorte: number;
  selectedBairro?: string | null;
  onSelectBairro?: (bairro: string) => void;
}

export const FortalezaElectoralMap: React.FC<FortalezaElectoralMapProps> = ({
  bairrosData,
  totalVotosRecorte,
  selectedBairro,
  onSelectBairro
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tileMode, setTileMode] = useState<'dark' | 'streets'>('dark');
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const FORTALEZA_CENTER: [number, number] = [-3.7550, -38.5300];
  const DEFAULT_ZOOM = 11.4;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: FORTALEZA_CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: 10,
      maxZoom: 17,
      zoomControl: true
    });

    const darkTiles = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; OpenStreetMap &copy; CARTO · TRE/CE',
        subdomains: 'abcd',
        maxZoom: 19
      }
    ).addTo(map);

    tileLayerRef.current = darkTiles;

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch Tile layers (Dark vs Streets)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    if (tileMode === 'dark') {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; OpenStreetMap &copy; CARTO · TRE/CE',
          subdomains: 'abcd',
          maxZoom: 19
        }
      ).addTo(mapInstanceRef.current);
    } else {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}.png',
        {
          attribution: '&copy; OpenStreetMap contributors · TRE/CE',
          maxZoom: 19
        }
      ).addTo(mapInstanceRef.current);
    }
  }, [tileMode]);

  // Update Markers (Heat Bubbles) when data changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    if (bairrosData.length === 0) return;

    const maxVotes = Math.max(...bairrosData.map((b) => b.votos), 1);
    const minVotes = Math.min(...bairrosData.map((b) => b.votos), 0);

    bairrosData.forEach((item) => {
      const coords = FORTALEZA_COORDINATES[item.bairro] || [item.lat, item.lon];
      if (!coords || !coords[0] || !coords[1]) return;

      // Compute bubble radius
      const normalized = (item.votos - minVotes) / (maxVotes - minVotes || 1);
      const radius = 6 + Math.sqrt(normalized) * 26; // 6px to 32px

      // Compute bubble color (amber -> orange -> red-crimson)
      let fillColor = '#38bdf8'; // Blue for low
      let borderColor = '#0284c7';
      if (normalized > 0.65) {
        fillColor = '#ef4444'; // Red for high density
        borderColor = '#b91c1c';
      } else if (normalized > 0.35) {
        fillColor = '#f97316'; // Orange for medium-high
        borderColor = '#c2410c';
      } else if (normalized > 0.15) {
        fillColor = '#f59e0b'; // Amber for medium
        borderColor = '#d97706';
      }

      const isSelected = selectedBairro === item.bairro;

      const circle = L.circleMarker(coords, {
        radius: isSelected ? radius + 4 : radius,
        fillColor,
        color: isSelected ? '#ffffff' : borderColor,
        weight: isSelected ? 3 : 1.5,
        opacity: 0.95,
        fillOpacity: isSelected ? 0.9 : 0.65
      });

      // Tooltip
      const pctOverTotal = totalVotosRecorte > 0 
        ? ((item.votos / totalVotosRecorte) * 100).toFixed(2)
        : '0.00';

      circle.bindTooltip(
        `<div style="font-family: inherit; font-size: 12px; color: #0f172a; line-height: 1.3;">
          <strong style="display: block; font-size: 13px; color: #0284c7;">${item.bairro}</strong>
          <div><b>${item.votos.toLocaleString('pt-BR')}</b> votos</div>
          <div style="font-size: 11px; color: #64748b;">${pctOverTotal}% do recorte</div>
        </div>`,
        { direction: 'top', className: 'custom-leaflet-tooltip' }
      );

      // Popup with richer stats
      let topCandHtml = '';
      if (item.topCandidatos && item.topCandidatos.length > 0) {
        topCandHtml = `
          <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #334155; font-size: 11px;">
            <div style="color: #94a3b8; font-weight: 600; margin-bottom: 3px;">Principais Votações:</div>
            ${item.topCandidatos.slice(0, 3).map((c, i) => `
              <div style="display: flex; justify-content: space-between; gap: 8px; color: #e2e8f0; font-size: 11px;">
                <span>${i + 1}. ${c.nome}</span>
                <span style="font-weight: 700; color: #f59e0b;">${c.votos.toLocaleString('pt-BR')}</span>
              </div>
            `).join('')}
          </div>
        `;
      }

      circle.bindPopup(
        `<div style="font-family: inherit; font-size: 13px; min-width: 190px; color: #f8fafc; background: #0f172a; padding: 2px;">
          <div style="font-size: 14px; font-weight: 800; color: #38bdf8; border-bottom: 1px solid #334155; padding-bottom: 4px; margin-bottom: 6px;">
            📍 ${item.bairro}
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 12px;">
            <span style="color: #94a3b8;">Total de Votos:</span>
            <span style="font-weight: 700; color: #f8fafc;">${item.votos.toLocaleString('pt-BR')}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px;">
            <span style="color: #94a3b8;">% do Recorte:</span>
            <span style="font-weight: 700; color: #34d399;">${pctOverTotal}%</span>
          </div>
          ${topCandHtml}
        </div>`,
        { className: 'custom-leaflet-popup' }
      );

      circle.on('click', () => {
        if (onSelectBairro) {
          onSelectBairro(item.bairro);
        }
      });

      layerGroup.addLayer(circle);
    });
  }, [bairrosData, totalVotosRecorte, selectedBairro, onSelectBairro]);

  const resetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView(FORTALEZA_CENTER, DEFAULT_ZOOM, {
      animate: true
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);
  };

  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 transition-all ${
      isFullscreen ? 'fixed inset-4 z-50 shadow-2xl flex flex-col' : 'w-full'
    }`}>
      {/* Map Header Toolbar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Mapa de Calor Geoespacial (Heat Bubbles)
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-slate-400">
            {bairrosData.length} Bairros Mapeados
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tile switch */}
          <button
            onClick={() => setTileMode(tileMode === 'dark' ? 'streets' : 'dark')}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Alternar estilo do mapa"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{tileMode === 'dark' ? 'Tema Escuro' : 'Tema Ruas'}</span>
          </button>

          {/* Reset View */}
          <button
            onClick={resetView}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Recentralizar em Fortaleza"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recentralizar</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Alternar tela cheia"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Fechar' : 'Tela Cheia'}</span>
          </button>
        </div>
      </div>

      {/* Map DOM Canvas */}
      <div 
        ref={mapContainerRef}
        className={`w-full ${isFullscreen ? 'flex-1 h-full' : 'h-[520px] sm:h-[580px]'} z-0`}
      />

      {/* Floating Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-3 text-xs shadow-xl max-w-xs pointer-events-auto">
        <div className="font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Densidade de Votação (Bolhas)</span>
        </div>
        <div className="space-y-1.5 text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 inline-block border border-red-700" />
            <span>Alta Concentração (Top 35%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block border border-amber-700" />
            <span>Média Concentração</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block border border-sky-600" />
            <span>Votação Dispersa</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
          * O raio e a cor da bolha são proporcionais aos votos válidos apurados.
        </div>
      </div>
    </div>
  );
};
