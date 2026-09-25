import { CaseStudy, TechnicalArticle, CodeSnippet, DiagnosticQuestion } from '../types';

export const PERSONAL_INFO = {
  name: 'Marcos Silveira',
  title: 'Especialista em Dados & Business Intelligence',
  headline: 'Engenharia Analítica, Governança e Decisões Baseadas em Dados',
  linkedinUrl: 'https://www.linkedin.com/in/marcos-silveira-97bb7a85?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  powerBiEmbedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMmI4NmUyNWMtODE2Mi00MDVmLTkzOTQtYzBiYTEwMWYyZWNjIiwidCI6ImQxOWIyZDA1LTBkNmUtNDIzNC1iZDBlLTliN2ExZTcxNzIyNiJ9',
  location: 'Brasil · Atendimento Remoto Nacional',
  stack: [
    'Power BI',
    'DAX Avançado',
    'Power Query (M)',
    'SQL (PostgreSQL / SQL Server)',
    'HTML5 & CSS3',
    'JavaScript',
    'Google Apps Script',
  ],
};

export const FEATURED_DASHBOARD_METRICS = {
  title: 'Painel Executivo Interativo — Power BI',
  description: 'Ambiente analítico com granularidade controlada, modelagem dimensional em Star Schema e cálculos otimizados em DAX para alta velocidade de renderização.',
  businessPillars: [
    { label: 'Setor', value: 'Gestão Estratégica & Performance' },
    { label: 'Taxa de Atualização', value: 'Automática via Gateway / Cloud' },
    { label: 'Arquitetura', value: 'Star Schema (1 Fato / 5 Dimensões)' },
    { label: 'Otimização DAX', value: 'VertiPaq Memory Footprint < 15MB' },
  ],
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'auditoria-publica',
    title: 'Monitoramento Contínuo de Gastos e Folha no Setor Público',
    sector: 'publico',
    clientType: 'Órgão de Controle & Gestão Pública Municipal',
    summary: 'Estruturação de pipeline analítico para auditoria cruzada de folha salarial, teto constitucional, diárias e fornecedores licitados.',
    challenge: 'Dados fragmentados em arquivos legados e planilhas descentralizadas, gerando demora de 45 dias para apuração de inconformidades e risco de apontamentos pelo Tribunal de Contas.',
    solution: 'Criação de repositório unificado em SQL com rotinas automáticas de higienização no Power Query. Implementação de modelo Star Schema no Power BI com alertas visuais de desconformidades.',
    impactMetrics: [
      { label: 'Tempo de Apuração', value: 'De 45 dias para 2 horas' },
      { label: 'Economia Identificada', value: 'R$ 1.8M em pagamentos indevidos' },
      { label: 'Conformidade LRF', value: '100% monitorada em tempo real' },
    ],
    stack: ['Power BI', 'SQL Server', 'Power Query M', 'DAX'],
    architecture: {
      sources: 'Folha de pagamento (TXT/CSV), ERP Público de Empenhos e Base de Contratos',
      etl: 'Power Query M com normalização de CPFs, CNPJs e rubricas salariais',
      model: 'Fato_Pagamentos, Fato_Empenhos conectadas a dCalendario, dServidor, dLotacao e dRubrica',
      viz: 'Dashboard de Auditoria com RLS por setor e matriz drill-through para nível de empenho',
    },
    sampleDaxOrSql: {
      type: 'DAX',
      title: 'Métrica de Detecção de Servidores Acima do Teto Constitucional',
      code: `Vlr_Ultrapassagem_Teto = 
VAR _RemuneracaoTotal = 
    CALCULATE(
        SUM(fFolhaPagamento[Valor_Bruto]),
        ALL(dRubrica[Tipo_Rubrica])
    )
VAR _TetoVigente = 
    MAX(dParametrosGoverno[Teto_Remuneratorio])
RETURN
    IF(
        _RemuneracaoTotal > _TetoVigente,
        _RemuneracaoTotal - _TetoVigente,
        0
    )`,
      explanation: 'Avalia no contexto de filtro se a soma bruta de todas as rubricas salariais do servidor ultrapassa o teto legal municipal, isolando o montante de glosa imediata.',
    },
  },
  {
    id: 'dre-gerencial-privado',
    title: 'Controladoria & DRE Dinâmico para C-Level',
    sector: 'privado',
    clientType: 'Empresa Médio Porte (Indústria e Distribuição)',
    summary: 'Consolidação de faturamento, custos de mercadorias vendidas (CMV), despesas operacionais e margem de contribuição com drill-down por unidade de negócio.',
    challenge: 'Relatórios financeiros gerados no Excel com fechamento mensal defasado em 20 dias, impossibilitando decisões táticas rápidas para correção de margens.',
    solution: 'Arquitetura de dados conectada ao ERP via SQL, com tabela de layout contábil customizada e medidas DAX com matriz financeira hierárquica sem travamentos.',
    impactMetrics: [
      { label: 'Fechamento de DRE', value: 'Do D+20 para D+1 automático' },
      { label: 'Visibilidade de Margem', value: 'Visão diária por SKU e canal' },
      { label: 'Redução de Custos', value: '8.4% em despesas operacionais' },
    ],
    stack: ['Power BI', 'PostgreSQL', 'DAX Avançado', 'Google Apps Script'],
    architecture: {
      sources: 'Banco transacional PostgreSQL do ERP e plano de contas orçamentário',
      etl: 'Views SQL estruturadas com cálculo prévio de CMV e impostos dedutíveis',
      model: 'fLancamentosContabeis ligada a dPlanoContas, dCentroCusto e dCalendario',
      viz: 'Matriz financeira multinível no Power BI com formatação condicional executiva',
    },
    sampleDaxOrSql: {
      type: 'DAX',
      title: 'DRE Dinâmico com Hierarquia Customizada e Inversão de Sinais',
      code: `DRE_Valor_Formatado = 
VAR _LinhaOrdem = SELECTEDVALUE(dPlanoContas[Ordem])
VAR _Multiplicador = SELECTEDVALUE(dPlanoContas[SinalContabil], 1)
VAR _ValorTotal = 
    CALCULATE(
        SUM(fLancamentosContabeis[Valor_Liquido]),
        TREATAS(
            VALUES(dPlanoContas[ContaContabil]),
            fLancamentosContabeis[ContaContabil]
        )
    ) * _Multiplicador
RETURN
    SWITCH(
        TRUE(),
        _LinhaOrdem IN {10, 25, 40}, [Total_Receita_Operacional],
        _LinhaOrdem = 50, [Margem_Contribuicao_Calculada],
        _LinhaOrdem = 80, [EBITDA_Gerencial],
        _ValorTotal
    )`,
      explanation: 'Permite exibir balancetes e DRE no visual de matriz respeitando regras contábeis brasileiras (subtotais matemáticos e inversão de débito/crédito sem quebrar o totalizador).',
    },
  },
  {
    id: 'transparencia-lai-publico',
    title: 'Portal de Transparência Analítica e Indicadores da LAI',
    sector: 'publico',
    clientType: 'Consórcio Público Intermunicipal',
    summary: 'Disponibilização de dados abertos para prestação de contas com linguagem acessível ao cidadão e rigor metodológico para órgãos de controle.',
    challenge: 'Exigência legal da Lei de Acesso à Informação (LAI) e recomendações do Ministério Público para publicação de dados orçamentários de forma clara e interativa.',
    solution: 'Painéis públicos integrados ao portal oficial utilizando Power BI Embed, com camadas de dados tratadas para proteger informações sensíveis (LGPD) e enfatizar a destinação dos recursos.',
    impactMetrics: [
      { label: 'Índice de Transparência', value: 'Nota 9.8 nos órgãos fiscalizadores' },
      { label: 'Atendimento a Pedidos LAI', value: '-70% de solicitações manuais' },
      { label: 'Acessibilidade Cidadã', value: '+12.000 visualizações mensais' },
    ],
    stack: ['Power BI Embed', 'HTML5/CSS3', 'JavaScript', 'SQL'],
    architecture: {
      sources: 'Sistema de Contabilidade Pública (SIAFIC) e Portal de Compras',
      etl: 'Rotina em SQL com anonimização de dados pessoais e sumarização diária',
      model: 'Esquema estrito de dados abertos com tabelas agregadas para performance web',
      viz: 'Iframe responsivo com menu customizado em HTML/JS integrado ao CMS do portal',
    },
    sampleDaxOrSql: {
      type: 'SQL',
      title: 'Query de Agregação Orçamentária e Anonimização de Beneficiários',
      code: `WITH EmpenhosAgregados AS (
    SELECT 
        e.ano_exercicio,
        e.orgao_codigo,
        o.nome_orgao,
        f.nome_funcao,
        sf.nome_subfuncao,
        DATE_TRUNC('month', e.data_empenho) AS mes_empenho,
        SUM(e.valor_empenhado) AS total_empenhado,
        SUM(e.valor_liquidado) AS total_liquidado,
        SUM(e.valor_pago) AS total_pago
    FROM t_empenho e
    INNER JOIN d_orgao o ON e.orgao_codigo = o.codigo
    INNER JOIN d_funcao f ON e.funcao_codigo = f.codigo
    INNER JOIN d_subfuncao sf ON e.subfuncao_codigo = sf.codigo
    WHERE e.status_empenho != 'CANCELADO'
    GROUP BY 1, 2, 3, 4, 5, 6
)
SELECT * FROM EmpenhosAgregados
ORDER BY ano_exercicio DESC, mes_empenho DESC;`,
      explanation: 'Consolidação de despesas empenhadas, liquidadas e pagas agrupadas por função de governo, eliminando dados pessoais para conformidade com a LGPD e otimizando a velocidade de renderização.',
    },
  },
  {
    id: 'automacao-apps-script-privado',
    title: 'Automação Operacional com Google Apps Script e Sincronização de KPIs',
    sector: 'privado',
    clientType: 'Empresa de Serviços & Vendas Corporativas',
    summary: 'Automação de relatórios gerenciais diários sem custo de servidor, integrando Google Workspace, disparo de alertas e sincronização de dados com Power BI.',
    challenge: 'Equipe de vendas perdia 15 horas semanais consolidando planilhas manuais para enviar o status diário de metas e comissionamento por email para a diretoria.',
    solution: 'Desenvolvimento de scripts serverless em Google Apps Script para extração de dados via webhook, consolidação automática às 06h00 e geração de relatórios em PDF com alertas via email.',
    impactMetrics: [
      { label: 'Tempo Manual Economizado', value: '60 horas/mês da equipe' },
      { label: 'Custo de Infraestrutura', value: 'R$ 0,00 (uso de cotas nativas)' },
      { label: 'Velocidade da Informação', value: 'Relatório entregue às 06h30 diariamente' },
    ],
    stack: ['Google Apps Script', 'JavaScript', 'Google Sheets API', 'Power BI'],
    architecture: {
      sources: 'Google Forms, Planilhas de Metas e API de Faturamento do ERP',
      etl: 'Google Apps Script com rotinas acionadas por tempo (Time-driven triggers)',
      model: 'Data model tabular exportado automaticamente para consumo no Power BI',
      viz: 'Email executivo estilizado em HTML com KPIs embutidos + link para o dashboard',
    },
    sampleDaxOrSql: {
      type: 'GAS',
      title: 'Rotina Serverless em Google Apps Script para Consolidação e Disparo',
      code: `function dispararRelatorioExecutivoDiario() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Consolidado_Vendas");
  const dados = planilha.getDataRange().getValues();
  
  // Cálculo de KPIs principais
  let totalFaturado = 0;
  let metaMes = 500000;
  
  for (let i = 1; i < dados.length; i++) {
    totalFaturado += Number(dados[i][4]) || 0; // Coluna de valor líquido
  }
  
  const atingimentoPercentual = ((totalFaturado / metaMes) * 100).toFixed(1);
  const dataHoje = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy");
  
  const corpoHtml = \`
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1e293b;">
      <h2 style="color: #0f172a; margin-bottom: 4px;">Posição Gerencial Diária — \${dataHoje}</h2>
      <p style="color: #64748b;">Consolidação automática gerada por Marcos Silveira Analytics.</p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0; font-size: 13px; color: #64748b;">Faturamento Acumulado</p>
        <p style="margin: 4px 0 12px 0; font-size: 24px; font-weight: bold; color: #0284c7;">R$ \${totalFaturado.toLocaleString('pt-BR')}</p>
        <p style="margin: 0; font-size: 13px; color: #64748b;">Atingimento da Meta: <strong>\${atingimentoPercentual}%</strong></p>
      </div>
      <p style="font-size: 12px; color: #94a3b8;">Rotina automatizada sem custo de servidor.</p>
    </div>
  \`;
  
  MailApp.sendEmail({
    to: "diretoria@empresa.com.br",
    subject: \`[Painel C-Level] Posição de Vendas - \${dataHoje}\`,
    htmlBody: corpoHtml
  });
}`,
      explanation: 'Script em JavaScript executado na infraestrutura Google (sem taxa de servidor) que processa dados consolidados e entrega o briefing executivo direto no email dos diretores.',
    },
  },
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'dax-star-schema',
    title: 'DAX: Time Intelligence YTD com Calendário Não-Contínuo',
    language: 'dax',
    badge: 'Power BI / DAX',
    description: 'Cálculo de faturamento acumulado no ano (YTD) com respeito estrito ao contexto de filtro e performance otimizada no motor VertiPaq.',
    code: `Faturamento_YTD = 
VAR _DataMaxContexto = MAX(dCalendario[Data])
VAR _AnoContexto = YEAR(_DataMaxContexto)
RETURN
    CALCULATE(
        [Faturamento_Liquido],
        dCalendario[Ano] = _AnoContexto,
        dCalendario[Data] <= _DataMaxContexto
    )`,
  },
  {
    id: 'sql-window-audit',
    title: 'SQL: Detecção de Anomalias em Compras Públicas (CTEs & Window Functions)',
    language: 'sql',
    badge: 'SQL / Auditoria',
    description: 'Query analítica que identifica variações superiores a 25% no preço unitário de um mesmo item licitado em relação à mediana histórica.',
    code: `WITH EstatisticasPreco AS (
    SELECT 
        codigo_item,
        descricao_item,
        numero_processo,
        data_homologacao,
        preco_unitario,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY preco_unitario) 
            OVER (PARTITION BY codigo_item) AS mediana_historica,
        AVG(preco_unitario) OVER (PARTITION BY codigo_item) AS media_preco
    FROM t_itens_licitacao
    WHERE data_homologacao >= CURRENT_DATE - INTERVAL '12 months'
)
SELECT 
    codigo_item,
    descricao_item,
    numero_processo,
    data_homologacao,
    preco_unitario,
    mediana_historica,
    ROUND(((preco_unitario - mediana_historica) / mediana_historica) * 100, 2) AS variacao_percentual
FROM EstatisticasPreco
WHERE preco_unitario > (mediana_historica * 1.25)
ORDER BY variacao_percentual DESC;`,
  },
  {
    id: 'power-query-m',
    title: 'Power Query (M): Limpeza e Tipagem com Tratamento de Exceções',
    language: 'powerquery',
    badge: 'Power Query / M',
    description: 'Script M avançado que higieniza colunas nulas, converte strings para datas com padrão brasileiro e elimina caracteres especiais.',
    code: `let
    Fonte = Sql.Database("servidor-bd", "db_governo", [Query="SELECT * FROM v_gastos_publicos"]),
    LinhasFiltradas = Table.SelectRows(Fonte, each [Valor_Liquidado] <> null and [Valor_Liquidado] > 0),
    TextoLimpo = Table.TransformColumns(LinhasFiltradas, {
        {"Documento_Credor", each Text.Select(_, {"0".."9"}), type text},
        {"Descricao_Despesa", Text.Trim, type text}
    }),
    TiposAjustados = Table.TransformColumnTypes(TextoLimpo, {
        {"Data_Liquidacao", type date},
        {"Valor_Liquidado", Currency.Type},
        {"Ano_Exercicio", Int64.Type}
    })
in
    TiposAjustados`,
  },
  {
    id: 'gas-webhook',
    title: 'Google Apps Script: Endpoint Webhook para Recepção de Dados',
    language: 'javascript',
    badge: 'Google Apps Script',
    description: 'Criação de endpoint HTTP POST serverless no Google Workspace para receber alertas de sistemas externos e gravar na planilha de auditoria.',
    code: `function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs_Auditoria");
    
    planilha.appendRow([
      new Date(),
      payload.sistemaOrigem || "Desconhecido",
      payload.tipoEvento,
      payload.usuario,
      JSON.stringify(payload.detalhes)
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "sucesso", timestamp: new Date() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService.createTextOutput(JSON.stringify({ status: "erro", mensagem: erro.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`,
  },
];

export const TECHNICAL_ARTICLES: TechnicalArticle[] = [
  {
    id: 'auditoria-continua-setor-publico',
    slug: 'auditoria-continua-setor-publico',
    title: 'Auditoria Contínua no Setor Público: Detectando Inconsistências em Folha e Licitações com Power BI e SQL',
    subtitle: 'Como sair do modelo de auditoria amostral tardia para um controle analítico contínuo que antecipa apontamentos dos Tribunais de Contas.',
    sector: 'publico',
    category: 'Setor Público',
    readTime: '6 min de leitura',
    publishedDate: 'Março de 2026',
    summary: 'A gestão pública não pode esperar 6 a 12 meses pelo relatório do Tribunal de Contas para descobrir irregularidades em folha de pagamento ou sobrepreço licitatório. Este artigo detalha a arquitetura de dados necessária para estruturar uma auditoria interna contínua usando SQL e Power BI.',
    keyTakeaways: [
      'Por que a auditoria amostral deixa escapar 95% das anomalias cadastrais e salariais.',
      'Arquitetura do pipeline: ingestão de bases de folha (SIAFIC) e cruzamento automatizado com o teto constitucional.',
      'Modelagem dimensional para controle interno: separando fatos de empenho e pagamentos de dimensões de servidores.',
      'Criação de regras DAX com alertas de conformidade para o Controle Interno Municipal.',
    ],
    techStack: ['Power BI', 'SQL Server / PostgreSQL', 'DAX', 'Power Query'],
    content: `
### O Desafio da Fiscalização na Gestão Pública Moderna

Tradicionalmente, os órgãos de controle interno e secretarias municipais realizavam auditorias por amostragem. Analisavam-se 5% a 10% dos processos físicos ao final do exercício orçamentário. O resultado inevitável eram apontamentos severos dos Tribunais de Contas do Estado (TCE) e Ministério Público (MP) meses após o fato consumado, quando o dano ao erário já havia se consolidado.

Com a consolidação de repositórios estruturados (SIAFIC e sistemas integrados de gestão), o papel do analista de dados no setor público é **transformar a auditoria em um processo contínuo e preventivo**.

---

### Arquitetura de Dados para o Controle Interno

Para implantar um ecossistema de auditoria contínua de baixa manutenção, recomendamos uma arquitetura em 3 camadas:

\`\`\`
[SIAFIC / Folha de Pagamento / Compras]
                  │
                  ▼ (Query SQL Agendada / View)
      [Camada de Higienização & Unificação]
                  │
                  ▼ (Modelo Star Schema)
[Power BI: Painel de Controle Interno com Alertas de Risco]
\`\`\`

1. **Camada de Ingestão**: Extração diária ou semanal via SQL ou arquivos estruturados (CSV/TXT padronizados).
2. **Camada de Higienização**: Tratamento de CPF com máscara, normalização de rubricas de proventos e descontos, unificação de nomes de credores com CNPJ raiz.
3. **Camada de Modelagem (Star Schema)**:
   - **Tabela Fato**: \`fFolhaPagamento\` (grão: servidor × competência × rubrica).
   - **Tabelas Dimensão**: \`dServidor\` (dados funcionais, cargo, vínculo), \`dRubrica\` (natureza jurídica da verba), \`dCalendario\` e \`dUnidadeLotacao\`.

---

### Regras Críticas Automatizadas em DAX

A chave para o sucesso do painel não é acumular gráficos decorativos, mas sim fornecer **visões de exceção**. O controlador público precisa abrir o painel e ver exatamente quais registros fogem da normalidade.

Exemplo de métrica para servidores recebendo acima do teto constitucional:

\`\`\`dax
Valor_Ultrapassagem_Teto = 
VAR _RemuneracaoBruta = 
    CALCULATE(
        SUM(fFolhaPagamento[Valor]),
        dRubrica[Tipo] = "Provento"
    )
VAR _TetoVigente = MAX(dParametros[TetoConstitucional])
RETURN
    IF(_RemuneracaoBruta > _TetoVigente, _RemuneracaoBruta - _TetoVigente, 0)
\`\`\`

---

### Resultados Práticos Alcançados

Em implantações reais, essa sistemática proporcionou:
- **Redução de 90% no tempo** de preparação de respostas para diligências do Tribunal de Contas.
- **Identificação imediata de acúmulo ilegal de cargos públicos** por meio do cruzamento de bases de horários e matrículas.
- **Economia fiscal real**, permitindo estorno de pagamentos incorretos antes da virada do exercício financeiro.
    `,
  },
  {
    id: 'otimizacao-modelos-power-bi-star-schema',
    slug: 'otimizacao-modelos-power-bi-star-schema',
    title: 'Modelagem Dimensional e Star Schema: Como Reduzir Modelos Power BI de 2GB para 150MB',
    subtitle: 'Boas práticas de engenharia de dados, eliminação de bi-direcionalidade e otimização do mecanismo colunar VertiPaq.',
    sector: 'geral',
    category: 'Engenharia & DAX',
    readTime: '7 min de leitura',
    publishedDate: 'Fevereiro de 2026',
    summary: 'Muitos analistas sofrem com relatórios lentos e travamentos ao atualizar bases com milhões de linhas. Entenda como o mecanismo VertiPaq comprime dados e como o Star Schema puro destrói a lentidão de relatórios corporativos.',
    keyTakeaways: [
      'Como o algoritmo de compressão colunar do VertiPaq funciona na prática.',
      'O perigo mortal de relacionamentos Muitos-para-Muitos (M:N) e filtros bi-direcionais.',
      'Estratégias de cardinalidade: remoção de colunas com alta cardinalidade desnecessárias.',
      'Diferença de performance entre medidas calculadas com CALCULATE bem indexado vs colunas calculadas.',
    ],
    techStack: ['Power BI', 'DAX', 'VertiPaq Analyzer', 'DAX Studio'],
    content: `
### Por que Relatórios do Power BI Ficam Lentos?

Um dos erros mais comuns em projetos de Business Intelligence é tratar o Power BI como se fosse um Excel gigante. Modelos com tabelas planas (\`flat tables\`) de 40 ou 50 colunas, repletas de textos longos e códigos únicos de transação, esgotam a memória RAM do computador e sobrecarregam a capacidade do Power BI Service.

O mecanismo interno do Power BI — o **VertiPaq** — é um banco de dados colunar em memória. Ele foi projetado para compactar repetições verticais (Run-Length Encoding, Dictionary Encoding e Bit-Packed Encoding).

---

### O Princípio da Baixa Cardinalidade

A cardinalidade é a quantidade de valores distintos presentes em uma coluna. 

| Tipo de Coluna | Exemplo | Cardinalidade | Impacto no VertiPaq |
| :--- | :--- | :--- | :--- |
| Data/Hora combinada | \`2026-03-24 14:32:19\` | Muito Alta (milhões) | **Catastrófico (consome muita RAM)** |
| Data isolada | \`2026-03-24\` | Baixa (365 valores/ano) | **Altamente comprimido (<1KB)** |
| Código de Transação (GUID) | \`e4b1-987... \` | Extrema | **Evite carregar para o modelo** |

> **Regra de Ouro**: Nunca carregue para o modelo colunas que você não usará em filtros, eixos ou medidas. Se precisar de hora, separe a Data em uma coluna e a Hora inteira (ou faixa horária) em outra.

---

### Star Schema vs Snowflake

O esquema estrela consiste em centralizar as **Tabelas Fato** (métricas numéricas e chaves estrangeiras) circundadas por **Tabelas Dimensão** (contexto: quem, quando, onde, qual produto).

Relacionamentos devem ser estritamente **1 para Muitos (1:N)** e com **direção única de filtro** (Dimensão filtra Fato).

\`\`\`
       [ dCalendario ]       [ dCliente ]
              │                    │
              ▼ (1:N)              ▼ (1:N)
        ┌────────────────────────────────┐
        │        fVendas_Transacoes      │
        └────────────────────────────────┘
              ▲ (1:N)              ▲ (1:N)
              │                    │
       [ dProduto ]         [ dFilial ]
\`\`\`

---

### O Custo Oculto da Bi-direcionalidade

Filtros bi-direcionais forçam o motor DAX a executar varreduras ambíguas em tempo de execução, desabilitando o cache do Storage Engine e forçando o Formula Engine (que é single-threaded) a processar a consulta linha a linha.

Se precisar filtrar uma dimensão através de outra dimensão, utilize a função \`CROSSFILTER\` dentro da medida DAX específica, mantendo o modelo estático limpo e estável.
    `,
  },
  {
    id: 'dre-gerencial-planejamento-financeiro',
    slug: 'dre-gerencial-planejamento-financeiro',
    title: 'DRE Gerencial Dinâmico no Power BI: Estruturando Planos de Contas e Margem C-Level',
    subtitle: 'Como montar uma Demonstração do Resultado do Exercício com matriz multinível, formatação brasileira e velocidade instantânea.',
    sector: 'privado',
    category: 'Setor Privado',
    readTime: '5 min de leitura',
    publishedDate: 'Janeiro de 2026',
    summary: 'Apresentar números financeiros para Diretores e Conselheiros exige precisão contábil e fluidez visual. Veja como desenhar uma DRE Gerencial no Power BI que calcula margens operacionais, EBITDA e resultado líquido sem quebrar o balanço.',
    keyTakeaways: [
      'Estruturação da tabela dPlanoContas com ordenação hierárquica e flags de sinal contábil.',
      'O padrão DAX para cálculo dinâmico de subtotais e margens percentuais na mesma coluna visual.',
      'Como conectar o ERP via SQL para ter fechamento diário de margem de contribuição por SKU.',
      'Storytelling financeiro: como diretores consomem métricas de EBITDA e burn-rate.',
    ],
    techStack: ['Power BI', 'SQL Server / PostgreSQL', 'DAX Financeiro'],
    content: `
### Por que o Excel Ainda Domina a Controladoria?

Muitos CFOs ainda recorrem ao Excel porque acreditam que o Power BI não consegue montar demonstrações contábeis hierárquicas com a formatação exigida pelo padrão contábil (linhas com cabeçalhos em negrito, subtotais calculados, margens em percentual e valores em moeda na mesma coluna).

Com a modelagem correta de uma **Tabela de Layout Financeiro**, o Power BI não apenas substitui o Excel com perfeição, mas adiciona o poder de fazer **drill-down instantâneo** de uma despesa administrativa até o fornecedor que emitiu a nota fiscal.

---

### O Modelo de Dados do DRE Gerencial

Para viabilizar a estrutura multinível, criamos uma tabela dimensão desconectada ou semi-conectada chamada \`dPlanoContas_Layout\`:

- \`ID_Linha\`: Inteiro sequencial para ordenação (\`10, 20, 30...\`).
- \`Descricao\`: Nome exibido na matriz (Ex: "Receita Bruta", "(-) Deduções", "Receita Líquida", "(=) Lucro Bruto", "EBITDA").
- \`TipoLinha\`: \`Valor\` ou \`Subtotal\` ou \`Percentual\`.
- \`SinalContabil\`: \`1\` para somar, \`-1\` para subtrair.

---

### A Métrica Mestra em DAX

A mágica ocorre em uma única medida que inspeciona qual linha da matriz está sendo renderizada:

\`\`\`dax
Valor_DRE_Executivo = 
VAR _Ordem = SELECTEDVALUE(dPlanoContas_Layout[Ordem])
VAR _Tipo = SELECTEDVALUE(dPlanoContas_Layout[TipoLinha])
RETURN
    SWITCH(
        TRUE(),
        _Tipo = "Percentual", FORMAT([Margem_EBITDA_Pct], "0.0%"),
        _Ordem = 50, FORMAT([Receita_Liquida], "R$ #,##0"),
        _Ordem = 90, FORMAT([EBITDA_Calculado], "R$ #,##0"),
        FORMAT([Saldo_Contabil_Linha], "R$ #,##0")
    )
\`\`\`

Com essa abordagem, a diretoria consegue analisar a DRE consolidada da empresa e, com um simples clique em um canal de venda ou filial, recalculá-la integralmente em menos de 1 segundo.
    `,
  },
  {
    id: 'automacao-google-apps-script-sem-servidor',
    slug: 'automacao-google-apps-script-sem-servidor',
    title: 'Automação Operacional com Google Apps Script: Eliminando 20h Semanais de Retrabalho Manual',
    subtitle: 'Como utilizar recursos serverless do Google Workspace para criar integrações ágeis, webhooks e alertas executivos sem custo de infraestrutura.',
    sector: 'privado',
    category: 'Automação',
    readTime: '5 min de leitura',
    publishedDate: 'Dezembro de 2025',
    summary: 'Nem toda automação precisa de servidores dedicados na AWS ou orquestradores pesados. Aprenda a usar o Google Apps Script para integrar planilhas, APIs de ERPs e disparo de briefings executivos por email com custo zero.',
    keyTakeaways: [
      'Quando o Google Apps Script é a melhor escolha para consultores independentes e PMEs.',
      'Criação de gatilhos acionados por tempo (Triggers) para atualização periódica.',
      'Geração e envio automatizado de relatórios em PDF com gráficos para gestores.',
      'Boas práticas de tratamento de erros e limites de cotas da infraestrutura Google.',
    ],
    techStack: ['Google Apps Script', 'JavaScript', 'Google Sheets API', 'HTML Email Templates'],
    content: `
### A Realidade das Pequenas e Médias Empresas

Muitas empresas não possuem orçamentos para licenciar ferramentas corporativas caras de automação como Alteryx ou instâncias em nuvem no Azure/AWS. No entanto, suas operações dependem intensamente do ecossistema Google Workspace (Google Sheets, Gmail, Google Drive).

O **Google Apps Script (GAS)** é um ambiente de execução JavaScript baseado em nuvem mantido pelo Google. Ele roda diretamente nos servidores da nuvem do Google, com autenticação nativa e custo zero para a grande maioria dos fluxos operacionais.

---

### Casos de Uso Mais Frequentes

1. **Disparo Diário de Posição de Caixa e Faturamento**: O script acorda às 06h30, puxa os dados consolidados da planilha de vendas, monta um layout em HTML responsivo e dispara para os sócios.
2. **Recepção de Leads via Webhook**: Integração com formulários web que insere dados instantaneamente na planilha sem risco de concorrência de escrita.
3. **Backup e Versionamento de Bases**: Cópia programada de abas operacionais com congelamento de valores para auditoria interna.

---

### Exemplo Prático: Tratamento de Erros e Logs

Ao construir scripts que rodam sem intervenção humana, o tratamento de erros é mandatório para evitar falhas silenciosas:

\`\`\`javascript
function executarRotinaComLog(funcaoProcesso) {
  try {
    funcaoProcesso();
    console.log("Rotina concluída com sucesso em: " + new Date());
  } catch (err) {
    console.error("Falha na rotina: " + err.message);
    MailApp.sendEmail(
      "alertas-bi@empresa.com.br",
      "[ALERTA CRÍTICO] Falha no Pipeline Automático",
      "Ocorreu um erro na execução do processo:\\n\\n" + err.stack
    );
  }
}
\`\`\`

A união do Google Apps Script com painéis no Power BI forma uma esteira robusta, escalável e de manutenção simplificada, entregando valor palpável em poucos dias de projeto.
    `,
  },
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    question: 'Qual é o contexto prioritário da sua organização atualmente?',
    description: 'A metodologia analítica varia entre conformidade regulatória e otimização de margens de lucro.',
    sector: 'all',
    options: [
      {
        label: 'Setor Público (Prefeitura, Câmara, Autarquia, Órgão de Controle)',
        points: 10,
        description: 'Foco primordial em conformidade, auditoria contínua, transparência (LAI) e prestação de contas.',
      },
      {
        label: 'Setor Privado (Indústria, Comércio, Serviços, Distribuição)',
        points: 20,
        description: 'Foco em maximização de margens, redução de custos operacionais, vendas e DRE C-Level.',
      },
      {
        label: 'Misto / Terceiro Setor / Consórcio',
        points: 15,
        description: 'Necessita simultaneamente de prestação de contas rigorosa e gestão orçamentária eficiente.',
      },
    ],
  },
  {
    id: 2,
    question: 'Como os dados da sua organização são atualmente consolidados?',
    description: 'A dispersão de fontes é o principal fator de lentidão e divergência de informações.',
    sector: 'all',
    options: [
      {
        label: 'Totalmente manual em dezenas de planilhas Excel soltas por funcionário',
        points: 1,
        description: 'Alto risco de erro humano, retrabalho diário e versões concorrentes da mesma verdade.',
      },
      {
        label: 'Extrações parciais de ERPs/Sistemas com tratamento repetitivo todo mês',
        points: 2,
        description: 'Perda de dias preciosos apenas higienizando tabelas antes de começar a analisar.',
      },
      {
        label: 'Modelagem com consultas SQL estruturadas e pipelines automatizados',
        points: 4,
        description: 'Bases centralizadas com tempo de resposta ágil e governança de acesso.',
      },
    ],
  },
  {
    id: 3,
    question: 'Quanto tempo sua equipe leva para gerar um relatório executivo ou prestação de contas?',
    description: 'A defasagem temporal compromete ações corretivas tempestivas.',
    sector: 'all',
    options: [
      {
        label: 'Mais de 15 a 30 dias após o fechamento do período',
        points: 1,
        description: 'Decisões tomadas no escuro, olhando pelo retrovisor muito depois dos acontecimentos.',
      },
      {
        label: 'Entre 5 a 10 dias úteis com esforço intensivo da equipe',
        points: 2,
        description: 'Gargalo operacional concentrado nos mesmos colaboradores-chave.',
      },
      {
        label: 'Atualização diária automática ou em menos de 24 horas (D+1)',
        points: 4,
        description: 'Operação orientada por dados com capacidade de reação imediata.',
      },
    ],
  },
  {
    id: 4,
    question: 'Qual o nível de maturidade em Business Intelligence e Power BI?',
    description: 'Identifica a sustentabilidade técnica das soluções existentes.',
    sector: 'all',
    options: [
      {
        label: 'Não utilizamos Power BI ou temos apenas testes pontuais sem padrão',
        points: 1,
        description: 'Oportunidade para estruturar desde a base com as melhores práticas de mercado.',
      },
      {
        label: 'Temos dashboards, mas são lentos, travam ou têm fórmulas DAX complexas sem Star Schema',
        points: 2,
        description: 'Sintoma clássico de ausência de engenharia de dados na modelagem.',
      },
      {
        label: 'Painéis estruturados com Star Schema, RLS (segurança de linha) e gateway configurado',
        points: 4,
        description: 'Ambiente analítico corporativo com estabilidade e governança sólida.',
      },
    ],
  },
];
