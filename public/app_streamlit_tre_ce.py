# -*- coding: utf-8 -*-
"""
===============================================================================
DASHBOARD GEOESPACIAL ELEITORAL - FORTALEZA / CE (ELEIÇÕES 2024)
Fonte dos dados: TRE/CE (Tribunal Regional Eleitoral do Ceará)
Elaborado por: Marcos Silveira (Especialista em Dados & BI / DPO)
===============================================================================
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import os

# -----------------------------------------------------------------------------
# 1. CONFIGURAÇÃO DA PÁGINA (STREAMLIT)
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="Dashboard Eleitoral Fortaleza 2024 | TRE/CE",
    page_icon="🗳️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Estilização CSS personalizada para acabamento executivo
st.markdown("""
<style>
    .main-header {
        font-size: 2rem;
        font-weight: 800;
        color: #1e293b;
        margin-bottom: 0.2rem;
    }
    .sub-header {
        font-size: 0.95rem;
        color: #64748b;
        margin-bottom: 1.5rem;
    }
    .badge-tre {
        background-color: #fef3c7;
        color: #92400e;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.8rem;
        display: inline-block;
        margin-right: 8px;
    }
    .badge-author {
        background-color: #e0f2fe;
        color: #0369a1;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.8rem;
        display: inline-block;
    }
    div[data-testid="stMetricValue"] {
        font-size: 1.8rem;
        font-weight: 700;
    }
</style>
""", unsafe_allow_html=True)

# -----------------------------------------------------------------------------
# 2. DICIONÁRIO DE COORDENADAS GEOESPACIAIS (BAIRROS DE FORTALEZA)
# -----------------------------------------------------------------------------
# NOTA TÉCNICA GEOESPACIAL:
# Se a sua planilha original não contiver colunas de Latitude e Longitude,
# este dicionário mapeia o centróide oficial de cada bairro no município de Fortaleza.
# Para integrar com uma malha GeoJSON oficial (ex: IPECE / SEPLA), veja o comentário
# no método 'merge_geodata' abaixo.
BAIRROS_COORDENADAS = {
    'AEROLÂNDIA': (-3.7719, -38.5132),
    'AEROPORTO': (-3.7761, -38.5325),
    'ALDEOTA': (-3.7375, -38.4988),
    'ALTO DA BALANÇA': (-3.7656, -38.5175),
    'AMADEU FURTADO': (-3.7431, -38.5583),
    'ANCURI': (-3.8544, -38.5217),
    'ANTÔNIO BEZERRA': (-3.7397, -38.5919),
    'AUTRAN NUNES': (-3.7547, -38.5936),
    'BARRA DO CEARÁ': (-3.7042, -38.5833),
    'BARROSO': (-3.8189, -38.5222),
    'BELA VISTA': (-3.7503, -38.5564),
    'BENFICA': (-3.7428, -38.5372),
    'BOA VISTA-CASTELÃO': (-3.8064, -38.5244),
    'BOM FUTURO': (-3.7558, -38.5447),
    'BOM JARDIM': (-3.7917, -38.6019),
    'BONSUCESSO': (-3.7739, -38.5889),
    'CAIS DO PORTO': (-3.7183, -38.4683),
    'CAJAZEIRAS': (-3.8058, -38.5083),
    'CAMBEBA': (-3.8011, -38.4897),
    'CANINDEZINHO': (-3.8156, -38.6067),
    'CARLITO PAMPLONA': (-3.7175, -38.5542),
    'CENTRO': (-3.7275, -38.5275),
    'CIDADE 2000': (-3.7497, -38.4697),
    'CIDADE DOS FUNCIONÁRIOS': (-3.7933, -38.4981),
    'COAÇU': (-3.8375, -38.4858),
    'COCÓ': (-3.7542, -38.4853),
    'CONJUNTO CEARÁ I': (-3.7719, -38.6033),
    'CONJUNTO CEARÁ II': (-3.7797, -38.6094),
    'CONJUNTO ESPERANÇA': (-3.8153, -38.5911),
    'CONJUNTO PALMEIRAS': (-3.8344, -38.5147),
    'CRISTO REDENTOR': (-3.7125, -38.5611),
    'DAMAS': (-3.7508, -38.5467),
    'DE LOURDES': (-3.7317, -38.4650),
    'DEMOCRITO ROCHA': (-3.7667, -38.5600),
    'DIAS MACEDO': (-3.7958, -38.5306),
    'DOM LUSTOSA': (-3.7533, -38.5806),
    'Dionísio Torres': (-3.7511, -38.5056),
    'EDSON QUEIROZ': (-3.7711, -38.4764),
    'ENGENHEIRO LUCIANO CAVALCANTE': (-3.7758, -38.4919),
    'FARIAS BRITO': (-3.7344, -38.5472),
    'FLORESTA': (-3.7139, -38.5750),
    'Fatima': (-3.7550, -38.5267),
    'GENIBAÚ': (-3.7722, -38.6181),
    'GRANJA LISBOA': (-3.7981, -38.6183),
    'GRANJA PORTUGAL': (-3.7842, -38.6039),
    'GUARARAPES': (-3.7681, -38.4850),
    'Guajiru': (-3.8444, -38.4889),
    'HENRIQUE JORGE': (-3.7606, -38.5833),
    'ITAOCA': (-3.7708, -38.5458),
    'ITAPERI': (-3.7869, -38.5528),
    'JACARECANGA': (-3.7214, -38.5417),
    'JANGURUSSU': (-3.8389, -38.5292),
    'JARDIM AMÉRICA': (-3.7578, -38.5489),
    'MEIRELES': (-3.7292, -38.4967),
    'MESSEJANA': (-3.8292, -38.4967),
    'PARANGABA': (-3.7761, -38.5617),
    'Vila Ellery': (-3.7219, -38.5639),
    'ÁLVARO WEYNE': (-3.7194, -38.5681)
}

# -----------------------------------------------------------------------------
# 3. CARREGAMENTO E TRATAMENTO DOS DADOS (PANDAS COM CACHE)
# -----------------------------------------------------------------------------
@st.cache_data
def carregar_dados(caminho_arquivo="public/votacao_fortaleza_tre_ce.csv"):
    """
    Carrega o arquivo de dados eleitorais (CSV ou Excel), padroniza colunas
    e injeta coordenadas geoespaciais dos bairros de Fortaleza.
    """
    if not os.path.exists(caminho_arquivo):
        # Tenta procurar na raiz ou em diretórios comuns
        caminhos_alternativos = [
            "votacao_fortaleza_tre_ce.csv",
            "public/votacao_fortaleza_tre_ce.csv",
            "dados_votacao_fortaleza.xlsx"
        ]
        for alt in caminhos_alternativos:
            if os.path.exists(alt):
                caminho_arquivo = alt
                break

    if caminho_arquivo.endswith(".csv"):
        df = pd.read_csv(caminho_arquivo, encoding="utf-8")
    else:
        df = pd.read_excel(caminho_arquivo)

    # Padronização de nomes de colunas
    df.columns = [c.strip() for c in df.columns]

    # Tratamento numérico de votos
    df["Votos"] = pd.to_numeric(df["Votos"], errors="coerce").fillna(0).astype(int)

    # Tratamento da coluna % Votos Obtidos (caso venha com vírgula do Excel brasileiro)
    if "% Votos Obtidos" in df.columns:
        if df["% Votos Obtidos"].dtype == object:
            df["% Votos Obtidos"] = (
                df["% Votos Obtidos"]
                .astype(str)
                .str.replace("%", "", regex=False)
                .str.replace(",", ".", regex=False)
                .str.strip()
            )
        df["% Votos Obtidos"] = pd.to_numeric(df["% Votos Obtidos"], errors="coerce").fillna(0.0)

    # Padronização de texto
    df["Candidato"] = df["Candidato"].astype(str).str.strip().str.upper()
    df["Bairro"] = df["Bairro"].astype(str).str.strip()
    df["STATUS"] = df["STATUS"].astype(str).str.strip().str.upper()

    # Mapeamento / Merge de Coordenadas de Bairros de Fortaleza
    # [COMO MESCLAR COM GEOJSON OU DICIONÁRIO EXTERNO]:
    # Exemplo com GeoJSON:
    #   import geopandas as gpd
    #   geo_df = gpd.read_file('bairros_fortaleza.geojson')
    #   df = df.merge(geo_df[['NM_BAIRRO', 'geometry']], left_on='Bairro', right_on='NM_BAIRRO')
    df["Latitude"] = df["Bairro"].map(lambda b: BAIRROS_COORDENADAS.get(b, (-3.7319, -38.5267))[0])
    df["Longitude"] = df["Bairro"].map(lambda b: BAIRROS_COORDENADAS.get(b, (-3.7319, -38.5267))[1])

    return df

# Executa carga
try:
    df_raw = carregar_dados()
except Exception as e:
    st.error(f"Erro ao carregar a planilha eleitoral: {e}")
    st.stop()

# -----------------------------------------------------------------------------
# 4. BARRA LATERAL (FILTROS INTERATIVOS DINÂMICOS)
# -----------------------------------------------------------------------------
st.sidebar.image("https://upload.wikimedia.org/wikipedia/commons/b/b3/Bras%C3%A3o_de_Fortaleza.svg", width=60)
st.sidebar.markdown("### 🎛️ Painel de Filtros")
st.sidebar.caption("Segmentação Eleitoral Geoespacial")

# Filtro 1: Checkboxes independentes para STATUS (Eleito / Suplente)
st.sidebar.markdown("**Status da Candidatura:**")
col_s1, col_s2 = st.sidebar.columns(2)
with col_s1:
    filtro_eleito = st.checkbox("Eleito", value=True)
with col_s2:
    filtro_suplente = st.checkbox("Suplente", value=True)

status_selecionados = []
if filtro_eleito:
    status_selecionados.append("ELEITO")
if filtro_suplente:
    status_selecionados.append("SUPLENTE")

# Filtro 2: Seleção Múltipla de Candidatos
todos_candidatos = sorted(df_raw["Candidato"].unique())
candidatos_selecionados = st.sidebar.multiselect(
    "Filtrar Candidato(s):",
    options=todos_candidatos,
    default=[],
    help="Deixe vazio para visualizar todos os candidatos cadastrados."
)

# Filtro 3: Seleção Múltipla de Bairros
todos_bairros = sorted(df_raw["Bairro"].unique())
bairros_selecionados = st.sidebar.multiselect(
    "Filtrar Bairro(s):",
    options=todos_bairros,
    default=[],
    help="Deixe vazio para considerar todos os bairros de Fortaleza."
)

st.sidebar.divider()
st.sidebar.markdown("""
**Créditos & Autoria:**
- **Fonte Oficial:** Dados abertos TRE/CE (Eleições Municipais Fortaleza 2024).
- **Elaborado por:** Marcos Silveira
- **Perfil:** Especialista em Dados & BI · Servidor Público · DPO
""")

# -----------------------------------------------------------------------------
# 5. APLICAÇÃO DOS FILTROS E TRATAMENTO DE ERROS (EDGE CASES)
# -----------------------------------------------------------------------------
df_filtrado = df_raw.copy()

# Tratamento: se desmarcar ambos os checkboxes de status
if not status_selecionados:
    st.warning("⚠️ **Nenhum status eleitoral selecionado.** Por favor, marque pelo menos 'Eleito' ou 'Suplente' no painel lateral à esquerda.")
    st.stop()
else:
    df_filtrado = df_filtrado[df_filtrado["STATUS"].isin(status_selecionados)]

# Aplica filtro de candidatos se houver seleção
if candidatos_selecionados:
    df_filtrado = df_filtrado[df_filtrado["Candidato"].isin(candidatos_selecionados)]

# Aplica filtro de bairros se houver seleção
if bairros_selecionados:
    df_filtrado = df_filtrado[df_filtrado["Bairro"].isin(bairros_selecionados)]

# Verificação se o filtro gerou resultado vazio
if df_filtrado.empty:
    st.info("ℹ️ Não foram encontrados votos com a combinação atual de filtros. Ajuste os filtros na barra lateral.")
    st.stop()

# -----------------------------------------------------------------------------
# 6. CABEÇALHO E KPIS EM DESTAQUE (MÉTRICAS NO TOPO)
# -----------------------------------------------------------------------------
st.markdown("""
<div>
    <span class="badge-tre">🏛️ FONTE OFICIAL: TRE/CE</span>
    <span class="badge-author">👨‍💻 ELABORADO POR MARCOS SILVEIRA</span>
</div>
<h1 class="main-header">Análise Geoespacial de Votação por Bairro — Fortaleza/CE</h1>
<p class="sub-header">
Painel analítico e mapa de bolhas térmicas (Heat Bubbles) para segmentação e cruzamento de densidade eleitoral.
</p>
""", unsafe_allow_html=True)

# Cálculo de KPIs executivos
total_votos = df_filtrado["Votos"].sum()
total_bairros_ativos = df_filtrado["Bairro"].nunique()
total_candidatos_ativos = df_filtrado["Candidato"].nunique()
bairro_mais_votado = (
    df_filtrado.groupby("Bairro")["Votos"]
    .sum()
    .idxmax()
)
votos_bairro_top = df_filtrado.groupby("Bairro")["Votos"].sum().max()

kpi1, kpi2, kpi3, kpi4 = st.columns(4)
with kpi1:
    st.metric("Total de Votos (Recorte)", f"{total_votos:,.0f}".replace(",", "."))
with kpi2:
    st.metric("Bairros com Votação", f"{total_bairros_ativos} bairros")
with kpi3:
    st.metric("Candidatos Analisados", f"{total_candidatos_ativos}")
with kpi4:
    st.metric("Bairro Top Votos", f"{bairro_mais_votado}", f"{votos_bairro_top:,.0f} votos".replace(",", "."))

st.markdown("<br>", unsafe_allow_html=True)

# -----------------------------------------------------------------------------
# 7. ABAS PRINCIPAIS DO DASHBOARD
# -----------------------------------------------------------------------------
tab_mapa, tab_graficos, tab_tabela = st.tabs([
    "📍 Mapa Geoespacial (Heat Bubbles)", 
    "📊 Análise de Concentração & Rankings", 
    "📑 Tabela de Dados & Exportação"
])

# -----------------------------------------------------------------------------
# ABA 1: MAPA INTERATIVO (HEAT BUBBLES COM PLOTLY EXPRESS)
# -----------------------------------------------------------------------------
with tab_mapa:
    st.subheader("Concentração Geoespacial de Votos em Fortaleza")
    st.caption("O tamanho e a intensidade cromática da bolha representam a densidade de votos obtidos no bairro.")

    # Agregação por bairro e coordenadas
    df_mapa = (
        df_filtrado.groupby(["Bairro", "Latitude", "Longitude"], as_index=False)
        .agg(
            Votos_Totais=("Votos", "sum"),
            Media_Pct=("% Votos Obtidos", "mean")
        )
    )

    # Geração do mapa de bolhas (scatter_mapbox)
    fig_map = px.scatter_mapbox(
        df_mapa,
        lat="Latitude",
        lon="Longitude",
        size="Votos_Totais",
        color="Votos_Totais",
        hover_name="Bairro",
        hover_data={
            "Votos_Totais": ":,.0f",
            "Media_Pct": ":.2f%",
            "Latitude": False,
            "Longitude": False
        },
        color_continuous_scale="YlOrRd",
        size_max=36,
        zoom=11.2,
        center={"lat": -3.7550, "lon": -38.5300},
        mapbox_style="carto-positron",
        title=""
    )

    fig_map.update_layout(
        margin={"r": 0, "t": 0, "l": 0, "b": 0},
        height=620,
        coloraxis_colorbar=dict(
            title="Densidade de Votos",
            thickness=15,
            len=0.7
        )
    )

    st.plotly_chart(fig_map, use_container_width=True)

# -----------------------------------------------------------------------------
# ABA 2: ANÁLISE DE CONCENTRAÇÃO & RANKINGS
# -----------------------------------------------------------------------------
with tab_graficos:
    col_g1, col_g2 = st.columns(2)

    with col_g1:
        st.subheader("Top 10 Bairros com Maior Votação")
        top_bairros = (
            df_filtrado.groupby("Bairro")["Votos"]
            .sum()
            .reset_index()
            .sort_values(by="Votos", ascending=True)
            .tail(10)
        )
        fig_bar_bairro = px.bar(
            top_bairros,
            x="Votos",
            y="Bairro",
            orientation="h",
            color="Votos",
            color_continuous_scale="Blues",
            text="Votos"
        )
        fig_bar_bairro.update_traces(texttemplate='%{text:,.0f}', textposition='outside')
        fig_bar_bairro.update_layout(height=450, margin={"r": 10, "t": 20, "l": 10, "b": 10}, coloraxis_showscale=False)
        st.plotly_chart(fig_bar_bairro, use_container_width=True)

    with col_g2:
        st.subheader("Ranking de Votos por Candidato")
        top_cand = (
            df_filtrado.groupby(["Candidato", "STATUS"])["Votos"]
            .sum()
            .reset_index()
            .sort_values(by="Votos", ascending=True)
            .tail(10)
        )
        fig_bar_cand = px.bar(
            top_cand,
            x="Votos",
            y="Candidato",
            orientation="h",
            color="STATUS",
            color_discrete_map={"ELEITO": "#10b981", "SUPLENTE": "#f59e0b"},
            text="Votos"
        )
        fig_bar_cand.update_traces(texttemplate='%{text:,.0f}', textposition='outside')
        fig_bar_cand.update_layout(height=450, margin={"r": 10, "t": 20, "l": 10, "b": 10}, legend_title_text="Status")
        st.plotly_chart(fig_bar_cand, use_container_width=True)

# -----------------------------------------------------------------------------
# ABA 3: TABELA DE DADOS & EXPORTAÇÃO
# -----------------------------------------------------------------------------
with tab_tabela:
    st.subheader("Detalhamento Analítico dos Votos")
    st.caption("Visão granular com ordenação e exportação de dados filtrados.")

    col_tabela = ["Ano", "Turno", "Município", "Número", "Candidato", "Bairro", "Votos", "% Votos Obtidos", "STATUS"]
    cols_existentes = [c for c in col_tabela if c in df_filtrado.columns]

    st.dataframe(
        df_filtrado[cols_existentes].sort_values(by="Votos", ascending=False),
        use_container_width=True,
        hide_index=True
    )

    csv_data = df_filtrado[cols_existentes].to_csv(index=False, sep=";", encoding="utf-8-sig")
    st.download_button(
        label="📥 Baixar Dados Filtrados (CSV)",
        data=csv_data,
        file_name="votacao_fortaleza_tre_ce_filtrado.csv",
        mime="text/csv"
    )

# Rodapé profissional
st.markdown("---")
st.markdown(
    "<small style='color: #64748b;'>Desenvolvido por <b>Marcos Silveira</b> · Dados Oficiais TRE/CE · Fortaleza/CE · 2024</small>",
    unsafe_allow_html=True
)
