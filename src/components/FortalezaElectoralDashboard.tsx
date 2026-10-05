import React, { useState, useEffect, useMemo } from 'react';
import { 
  Vote, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Clock, 
  Filter, 
  RotateCcw, 
  Download, 
  FileText, 
  Search, 
  BarChart3, 
  Map as MapIcon, 
  Table as TableIcon, 
  Code2, 
  Copy, 
  Check, 
  AlertTriangle,
  Award,
  ChevronRight,
  Sparkles,
  Info,
  Flame
} from 'lucide-react';
import { 
  ElectoralRecord, 
  CANDIDATES_LIST, 
  BAIRROS_LIST, 
  ELECTORAL_METADATA 
} from '../data/electoralFortalezaData';
import { FortalezaElectoralMap, BairroMapItem } from './FortalezaElectoralMap';
import { GoogleMapsHeatmap } from './GoogleMapsHeatmap';

export const FortalezaElectoralDashboard: React.FC = () => {
  // Raw Data State
  const [records, setRecords] = useState<ElectoralRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Map Provider State (Google Maps by default)
  const [mapEngine, setMapEngine] = useState<'google' | 'leaflet'>('google');

  // Filters State
  const [filterEleito, setFilterEleito] = useState(true);
  const [filterSuplente, setFilterSuplente] = useState(true);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [selectedBairros, setSelectedBairros] = useState<string[]>([]);
  const [candidateSearchQuery, setCandidateSearchQuery] = useState('');
  const [bairroSearchQuery, setBairroSearchQuery] = useState('');

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'mapa' | 'graficos' | 'tabela' | 'python'>('mapa');

  // Selected Bairro for highlight
  const [highlightedBairro, setHighlightedBairro] = useState<string | null>(null);

  // Table pagination and search
  const [tableSearch, setTableSearch] = useState('');
  const [tablePage, setTablePage] = useState(1);
  const pageSize = 12;

  // Code Copy State
  const [codeCopied, setCodeCopied] = useState(false);

  // Fetch Dataset
  useEffect(() => {
    let isMounted = true;
    fetch('/votacao_fortaleza.json')
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar arquivo de dados geoespaciais');
        return res.json();
      })
      .then((data: ElectoralRecord[]) => {
        if (isMounted) {
          setRecords(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Erro ao ler votacao_fortaleza.json:', err);
        if (isMounted) {
          setLoadError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter Logic
  const filteredRecords = useMemo(() => {
    if (!filterEleito && !filterSuplente) {
      return [];
    }

    return records.filter((r) => {
      // Status filter
      if (r.status === 'ELEITO' && !filterEleito) return false;
      if (r.status === 'SUPLENTE' && !filterSuplente) return false;

      // Candidate filter
      if (selectedCandidates.length > 0 && !selectedCandidates.includes(r.candidato)) {
        return false;
      }

      // Bairro filter
      if (selectedBairros.length > 0 && !selectedBairros.includes(r.bairro)) {
        return false;
      }

      return true;
    });
  }, [records, filterEleito, filterSuplente, selectedCandidates, selectedBairros]);

  // Aggregated Bairros for Map (Heat Bubbles)
  const bairrosMapData: BairroMapItem[] = useMemo(() => {
    const map = new Map<string, { votos: number; lat: number; lon: number; candMap: Map<string, { votos: number; status: string }> }>();

    filteredRecords.forEach((r) => {
      const existing = map.get(r.bairro);
      if (!existing) {
        const candMap = new Map<string, { votos: number; status: string }>();
        candMap.set(r.candidato, { votos: r.votos, status: r.status });
        map.set(r.bairro, {
          votos: r.votos,
          lat: r.lat,
          lon: r.lon,
          candMap
        });
      } else {
        existing.votos += r.votos;
        const c = existing.candMap.get(r.candidato);
        if (!c) {
          existing.candMap.set(r.candidato, { votos: r.votos, status: r.status });
        } else {
          c.votos += r.votos;
        }
      }
    });

    const totalFiltered = filteredRecords.reduce((acc, curr) => acc + curr.votos, 0);

    return Array.from(map.entries()).map(([bairro, data]) => {
      const topCandidatos = Array.from(data.candMap.entries())
        .map(([nome, val]) => ({ nome, votos: val.votos, status: val.status }))
        .sort((a, b) => b.votos - a.votos);

      return {
        bairro,
        votos: data.votos,
        pct: totalFiltered > 0 ? (data.votos / totalFiltered) * 100 : 0,
        lat: data.lat,
        lon: data.lon,
        topCandidatos
      };
    }).sort((a, b) => b.votos - a.votos);
  }, [filteredRecords]);

  // KPIs
  const totalVotos = useMemo(() => {
    return filteredRecords.reduce((acc, curr) => acc + curr.votos, 0);
  }, [filteredRecords]);

  const totalBairros = useMemo(() => {
    return new Set(filteredRecords.map((r) => r.bairro)).size;
  }, [filteredRecords]);

  const totalCandidatos = useMemo(() => {
    return new Set(filteredRecords.map((r) => r.candidato)).size;
  }, [filteredRecords]);

  const topBairro = useMemo(() => {
    if (bairrosMapData.length === 0) return null;
    return bairrosMapData[0];
  }, [bairrosMapData]);

  // Candidate Ranking for Graphics Tab
  const candidateRanking = useMemo(() => {
    const map = new Map<string, { nome: string; numero: string; status: 'ELEITO' | 'SUPLENTE'; votos: number }>();
    filteredRecords.forEach((r) => {
      const ex = map.get(r.candidato);
      if (!ex) {
        map.set(r.candidato, {
          nome: r.candidato,
          numero: r.numero,
          status: r.status,
          votos: r.votos
        });
      } else {
        ex.votos += r.votos;
      }
    });
    return Array.from(map.values()).sort((a, b) => b.votos - a.votos);
  }, [filteredRecords]);

  // Reset Filters
  const handleResetFilters = () => {
    setFilterEleito(true);
    setFilterSuplente(true);
    setSelectedCandidates([]);
    setSelectedBairros([]);
    setCandidateSearchQuery('');
    setBairroSearchQuery('');
    setHighlightedBairro(null);
  };

  // Quick preset: Top 5 Candidates
  const handleSelectTop5 = () => {
    const top5 = CANDIDATES_LIST.slice(0, 5).map((c) => c.nome);
    setSelectedCandidates(top5);
  };

  // Toggle single candidate selection
  const handleToggleCandidate = (nome: string) => {
    setSelectedCandidates((prev) => 
      prev.includes(nome) ? prev.filter((c) => c !== nome) : [...prev, nome]
    );
  };

  // Toggle single bairro selection
  const handleToggleBairro = (bairro: string) => {
    setSelectedBairros((prev) => 
      prev.includes(bairro) ? prev.filter((b) => b !== bairro) : [...prev, bairro]
    );
  };

  // Filtered candidate list in sidebar by search query
  const sidebarCandidates = useMemo(() => {
    return CANDIDATES_LIST.filter((c) => {
      if (!candidateSearchQuery) return true;
      const q = candidateSearchQuery.toLowerCase();
      return c.nome.toLowerCase().includes(q) || c.numero.includes(q);
    });
  }, [candidateSearchQuery]);

  // Filtered bairro list in sidebar by search query
  const sidebarBairros = useMemo(() => {
    return BAIRROS_LIST.filter((b) => {
      if (!bairroSearchQuery) return true;
      return b.nome.toLowerCase().includes(bairroSearchQuery.toLowerCase());
    });
  }, [bairroSearchQuery]);

  // Table Data & Pagination
  const searchedTableData = useMemo(() => {
    if (!tableSearch) return filteredRecords;
    const q = tableSearch.toLowerCase();
    return filteredRecords.filter((r) => 
      r.candidato.toLowerCase().includes(q) ||
      r.bairro.toLowerCase().includes(q) ||
      r.numero.includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  }, [filteredRecords, tableSearch]);

  const totalPages = Math.ceil(searchedTableData.length / pageSize) || 1;
  const paginatedTableData = useMemo(() => {
    const start = (tablePage - 1) * pageSize;
    return searchedTableData.slice(start, start + pageSize);
  }, [searchedTableData, tablePage]);

  // CSV Export Handler
  const handleExportCsv = () => {
    const headers = ['Ano', 'Turno', 'Município', 'Número', 'Candidato', 'Bairro', 'Votos', '% Votos Obtidos', 'STATUS'];
    const rows = filteredRecords.map((r) => [
      r.ano,
      r.turno,
      `"${r.municipio}"`,
      r.numero,
      `"${r.candidato}"`,
      `"${r.bairro}"`,
      r.votos,
      `"${r.pct.toFixed(2).replace('.', ',')}"`,
      r.status
    ]);

    const csvContent = [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `votacao_fortaleza_tre_ce_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pythonScriptCode = `# -*- coding: utf-8 -*-
"""
DASHBOARD GEOESPACIAL ELEITORAL - FORTALEZA / CE (TRE/CE 2024)
Desenvolvido por: Marcos Silveira (Especialista em Dados & BI)
"""
import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="Eleições Fortaleza 2024 | TRE/CE", layout="wide")

# Carga com Pandas
@st.cache_data
def carregar_dados():
    df = pd.read_csv("votacao_fortaleza_tre_ce.csv", encoding="utf-8")
    return df

df = carregar_dados()

st.title("Análise Geoespacial de Votação por Bairro — Fortaleza/CE")
st.caption("Fonte: Dados Abertos TRE/CE · Elaborado por Marcos Silveira")

# Filtros laterais
st.sidebar.header("Filtros")
candidato = st.sidebar.multiselect("Candidato", options=sorted(df['Candidato'].unique()))
status_eleito = st.sidebar.checkbox("Eleito", value=True)
status_suplente = st.sidebar.checkbox("Suplente", value=True)

# Aplicação dos filtros e geração do Mapa de Bolhas de Calor (Heat Bubbles)...
# Execute: streamlit run app_streamlit_tre_ce.py
`;

  const handleCopyPythonCode = () => {
    navigator.clipboard.writeText(pythonScriptCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Attribution & Provenance Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-sky-500/10 border border-amber-500/20 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                <Vote className="w-3.5 h-3.5" />
                Dados Oficiais TRE/CE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                Elaborado por Marcos Silveira
              </span>
              <span className="text-xs text-slate-400">
                Eleições Municipais Fortaleza · 1º Turno
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Análise Geoespacial de Votação por Bairro — Fortaleza/CE
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Painel analítico geoespacial desenvolvido sob dados públicos do Tribunal Regional Eleitoral do Ceará (TRE/CE). Permite cruzamento de votos válidos por candidato, concentração territorial em mapa térmico de bolhas (Heat Bubbles) e segmentação por status de candidatura.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/votacao_fortaleza_tre_ce.csv"
              download="votacao_fortaleza_tre_ce.csv"
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              title="Baixar planilha original em CSV"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Baixar CSV Oficial</span>
            </a>

            <button
              onClick={() => setActiveTab('python')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-amber-400/20"
              title="Ver código Python Streamlit"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Ver Código Python</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Highlight KPIs (Streamlit-style metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total de Votos no Recorte</span>
            <Vote className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isLoading ? '...' : totalVotos.toLocaleString('pt-BR')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span>De 337.605 votos totais apurados</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-300" />
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative overflow-hidden group hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Bairros com Votação</span>
            <MapPin className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isLoading ? '...' : `${totalBairros} bairros`}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {bairrosMapData.length > 0 ? `${((totalBairros / 58) * 100).toFixed(0)}% da malha municipal` : 'Nenhum bairro'}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-sky-300" />
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Candidatos Selecionados</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isLoading ? '...' : `${totalCandidatos}`}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">{filterEleito ? 'Eleitos' : ''}</span>
            {filterEleito && filterSuplente && <span>·</span>}
            <span className="text-amber-400 font-semibold">{filterSuplente ? 'Suplentes' : ''}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300" />
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Bairro Líder em Votos</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-base sm:text-lg font-black text-white tracking-tight truncate" title={topBairro ? topBairro.bairro : '-'}>
            {topBairro ? topBairro.bairro : '-'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            {topBairro ? `${topBairro.votos.toLocaleString('pt-BR')} votos (${topBairro.pct.toFixed(1)}%)` : 'Sem dados'}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300" />
        </div>
      </div>

      {/* Edge-case Warning: No status selected */}
      {!filterEleito && !filterSuplente && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-300">Nenhum status de candidatura selecionado</h4>
            <p className="text-xs text-amber-200/80 mt-1">
              Você desmarcou os filtros de <b>Eleito</b> e <b>Suplente</b>. Por favor, marque pelo menos um status na barra lateral à esquerda para visualizar os dados.
            </p>
          </div>
        </div>
      )}

      {/* Main Studio Workspace: 2 Columns (Sidebar Filters + Main Analytical Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ========================================================================= */}
        {/* SIDEBAR: Painel de Filtros (Estilo Streamlit Sidebar)                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-5">
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-5 sticky top-22 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Filter className="w-4 h-4 text-amber-400" />
                <span>Painel de Filtros</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                title="Restaurar todos os filtros"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpar</span>
              </button>
            </div>

            {/* Filtro 1: Status da Candidatura (Checkboxes independentes) */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                Status da Candidatura
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition-all ${
                  filterEleito 
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-sm' 
                    : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={filterEleito}
                    onChange={(e) => setFilterEleito(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <span className="font-semibold">Eleito</span>
                </label>

                <label className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition-all ${
                  filterSuplente 
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-sm' 
                    : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={filterSuplente}
                    onChange={(e) => setFilterSuplente(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <span className="font-semibold">Suplente</span>
                </label>
              </div>
            </div>

            {/* Filtro 2: Candidato (Multiselect com busca) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                  Candidatos ({selectedCandidates.length || 'Todos'})
                </label>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <button
                    onClick={handleSelectTop5}
                    className="text-amber-400 hover:underline cursor-pointer"
                  >
                    Top 5
                  </button>
                  {selectedCandidates.length > 0 && (
                    <>
                      <span className="text-slate-600">·</span>
                      <button
                        onClick={() => setSelectedCandidates([])}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        Todos
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Search input for candidates */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar candidato ou número..."
                  value={candidateSearchQuery}
                  onChange={(e) => setCandidateSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Scrollable multiselect list */}
              <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border border-slate-800/80 rounded-lg p-1.5 bg-slate-950/60">
                {sidebarCandidates.map((c) => {
                  const isChecked = selectedCandidates.includes(c.nome);
                  return (
                    <div
                      key={c.nome}
                      onClick={() => handleToggleCandidate(c.nome)}
                      className={`flex items-center justify-between p-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30 font-medium' 
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Controlled by div click
                          className="w-3.5 h-3.5 rounded text-amber-500 bg-slate-900 border-slate-700 pointer-events-none"
                        />
                        <span className="truncate">{c.nome}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono ml-1.5 flex-shrink-0">
                        {c.numero}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filtro 3: Bairro (Multiselect com busca) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                  Bairros ({selectedBairros.length || 'Todos'})
                </label>
                {selectedBairros.length > 0 && (
                  <button
                    onClick={() => setSelectedBairros([])}
                    className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Search input for bairros */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar bairro de Fortaleza..."
                  value={bairroSearchQuery}
                  onChange={(e) => setBairroSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Scrollable bairros multiselect */}
              <div className="max-h-40 overflow-y-auto space-y-1 pr-1 border border-slate-800/80 rounded-lg p-1.5 bg-slate-950/60">
                {sidebarBairros.map((b) => {
                  const isChecked = selectedBairros.includes(b.nome);
                  return (
                    <div
                      key={b.nome}
                      onClick={() => handleToggleBairro(b.nome)}
                      className={`flex items-center justify-between p-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-sky-500/20 text-sky-200 border border-sky-500/30 font-medium' 
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 rounded text-sky-500 bg-slate-900 border-slate-700 pointer-events-none"
                        />
                        <span className="truncate">{b.nome}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions in Sidebar */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button
                onClick={handleExportCsv}
                disabled={filteredRecords.length === 0}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Exportar Recorte (CSV)</span>
              </button>

              <div className="text-[11px] text-slate-500 text-center">
                * Filtros calculados instantaneamente na memória.
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN CANVAS: Abas Analíticas (Mapa, Gráficos, Tabela, Python)             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          
          {/* Main Navigation Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2 gap-3 overflow-x-auto">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('mapa')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'mapa'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Mapa de Calor (Google Maps)</span>
              </button>

              <button
                onClick={() => setActiveTab('graficos')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'graficos'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Concentração & Rankings</span>
              </button>

              <button
                onClick={() => setActiveTab('tabela')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'tabela'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Tabela Detalhada</span>
              </button>

              <button
                onClick={() => setActiveTab('python')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'python'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Código Python & Streamlit</span>
              </button>
            </div>

            {/* Map Engine Selector */}
            {activeTab === 'mapa' && (
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 self-end sm:self-auto">
                <span className="text-[10px] uppercase font-bold text-slate-400 px-1">Motor:</span>
                <button
                  onClick={() => setMapEngine('google')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                    mapEngine === 'google'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Google Maps</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
                <button
                  onClick={() => setMapEngine('leaflet')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    mapEngine === 'leaflet'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  OpenStreetMap
                </button>
              </div>
            )}
          </div>

          {/* TAB CONTENT 1: MAPA GEOESPACIAL (HEATMAP / HEAT BUBBLES) */}
          {activeTab === 'mapa' && (
            <div className="space-y-4">
              {mapEngine === 'google' ? (
                <GoogleMapsHeatmap
                  bairrosData={bairrosMapData}
                  totalVotosRecorte={totalVotos}
                  selectedBairro={highlightedBairro}
                  onSelectBairro={(bairro) => setHighlightedBairro(bairro)}
                />
              ) : (
                <FortalezaElectoralMap
                  bairrosData={bairrosMapData}
                  totalVotosRecorte={totalVotos}
                  selectedBairro={highlightedBairro}
                  onSelectBairro={(bairro) => setHighlightedBairro(bairro)}
                />
              )}

              {/* Informações de apoio e orientações geoespaciais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    <span>Metodologia Geoespacial</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Centróides calculados a partir dos 58 bairros oficiais de Fortaleza. As bolhas térmicas escalam dinamicamente pelo volume de votos apurados.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-sky-400" />
                    <span>Cruzamento Eleitoral</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Clique em qualquer bolha para inspecionar os candidatos mais votados no bairro correspondente ou use a barra lateral para segmentar.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Governança & LGPD</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Dados estritamente públicos e agregados por seção eleitoral/bairro em conformidade com as diretrizes de transparência do TSE e LGPD.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: CONCENTRAÇÃO & RANKINGS */}
          {activeTab === 'graficos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Ranking Top 10 Bairros */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>Top 10 Bairros Mais Votados</span>
                      </h4>
                      <p className="text-xs text-slate-400">Concentração absoluta de votos no recorte</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {bairrosMapData.slice(0, 10).map((b, idx) => {
                      const maxVotosBairro = bairrosMapData[0]?.votos || 1;
                      const barPct = (b.votos / maxVotosBairro) * 100;
                      return (
                        <div key={b.bairro} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-200">
                              {idx + 1}. {b.bairro}
                            </span>
                            <span className="font-mono text-amber-400 font-bold">
                              {b.votos.toLocaleString('pt-BR')} votos ({b.pct.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                              style={{ width: `${barPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ranking Top Candidatos */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-sky-400" />
                        <span>Ranking por Candidato</span>
                      </h4>
                      <p className="text-xs text-slate-400">Total de votos e status eleitoral no recorte</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {candidateRanking.slice(0, 10).map((c, idx) => {
                      const maxVotosCand = candidateRanking[0]?.votos || 1;
                      const barPct = (c.votos / maxVotosCand) * 100;
                      return (
                        <div key={c.nome} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="font-semibold text-slate-200 truncate">
                                {idx + 1}. {c.nome}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">({c.numero})</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                c.status === 'ELEITO' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                              }`}>
                                {c.status}
                              </span>
                            </div>
                            <span className="font-mono text-sky-400 font-bold ml-2">
                              {c.votos.toLocaleString('pt-BR')}
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                c.status === 'ELEITO'
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-300'
                                  : 'bg-gradient-to-r from-amber-500 to-orange-300'
                              }`}
                              style={{ width: `${barPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB CONTENT 3: TABELA DETALHADA */}
          {activeTab === 'tabela' && (
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Filtrar nesta tabela..."
                    value={tableSearch}
                    onChange={(e) => {
                      setTableSearch(e.target.value);
                      setTablePage(1);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>Exibindo <b>{searchedTableData.length}</b> registros</span>
                  <button
                    onClick={handleExportCsv}
                    className="px-2.5 py-1 text-xs text-amber-400 hover:text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Candidato</th>
                      <th className="py-2.5 px-3">Número</th>
                      <th className="py-2.5 px-3">Bairro</th>
                      <th className="py-2.5 px-3 text-right">Votos</th>
                      <th className="py-2.5 px-3 text-right">% Obtido</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {paginatedTableData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2 px-3 font-semibold text-white">{row.candidato}</td>
                        <td className="py-2 px-3 font-mono text-slate-400">{row.numero}</td>
                        <td className="py-2 px-3 text-slate-300">{row.bairro}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-amber-400">
                          {row.votos.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-slate-400">
                          {row.pct.toFixed(2)}%
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.status === 'ELEITO'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {paginatedTableData.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          Nenhum registro encontrado para este filtro.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                  <span>Página {tablePage} de {totalPages}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setTablePage((p) => Math.max(1, p - 1))}
                      disabled={tablePage === 1}
                      className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700 cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setTablePage((p) => Math.min(totalPages, p + 1))}
                      disabled={tablePage === totalPages}
                      className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700 cursor-pointer"
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT 4: CÓDIGO PYTHON (STREAMLIT) & ARQUITETURA */}
          {activeTab === 'python' && (
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-amber-400" />
                    <span>Código Python Completo (Streamlit + Plotly Express)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Arquivo pronto para execução local com suporte a bolhas de calor, filtros laterais e merge com GeoJSON.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyPythonCode}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{codeCopied ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>

                  <a
                    href="/app_streamlit_tre_ce.py"
                    download="app_streamlit_tre_ce.py"
                    className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar app.py</span>
                  </a>
                </div>
              </div>

              {/* Guia de Execução Rápida */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Como executar no seu computador:</span>
                </div>
                <div className="font-mono text-[11px] bg-slate-900 p-2.5 rounded border border-slate-800 text-slate-200 space-y-1">
                  <div># 1. Instale as dependências:</div>
                  <div className="text-emerald-400">pip install -r requirements.txt</div>
                  <div className="pt-1"># 2. Execute a aplicação Streamlit:</div>
                  <div className="text-amber-300">streamlit run app_streamlit_tre_ce.py</div>
                </div>
              </div>

              {/* Code viewer snippet */}
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 font-mono text-[11px] text-slate-300 max-h-96 overflow-y-auto">
                <pre>{pythonScriptCode}</pre>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
