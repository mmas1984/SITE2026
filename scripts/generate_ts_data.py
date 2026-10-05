import json

with open('public/votacao_fortaleza.json') as f:
    records = json.load(f)

candidates = {}
for r in records:
    c = r['candidato']
    if c not in candidates:
        candidates[c] = {
            'nome': c,
            'numero': r['numero'],
            'status': r['status'],
            'totalVotos': 0,
            'bairrosPresentes': 0
        }
    candidates[c]['totalVotos'] += r['votos']
    candidates[c]['bairrosPresentes'] += 1

sorted_cands = sorted(candidates.values(), key=lambda x: x['totalVotos'], reverse=True)

bairros = {}
for r in records:
    b = r['bairro']
    if b not in bairros:
        bairros[b] = {
            'nome': b,
            'lat': r['lat'],
            'lon': r['lon'],
            'totalVotos': 0
        }
    bairros[b]['totalVotos'] += r['votos']

sorted_bairros = sorted(bairros.values(), key=lambda x: x['totalVotos'], reverse=True)

coords_lines = []
for b in sorted_bairros:
    coords_lines.append(f'  {json.dumps(b["nome"], ensure_ascii=False)}: [{b["lat"]}, {b["lon"]}],')

coords_block = "\n".join(coords_lines)

ts_content = f'''export interface ElectoralRecord {{
  ano: number;
  turno: number;
  municipio: string;
  numero: string;
  candidato: string;
  bairro: string;
  votos: number;
  pct: number;
  status: 'ELEITO' | 'SUPLENTE';
  lat: number;
  lon: number;
}}

export interface CandidateSummary {{
  nome: string;
  numero: string;
  status: 'ELEITO' | 'SUPLENTE';
  totalVotos: number;
  bairrosPresentes: number;
}}

export interface BairroSummary {{
  nome: string;
  lat: number;
  lon: number;
  totalVotos: number;
}}

export const CANDIDATES_LIST: CandidateSummary[] = {json.dumps(sorted_cands, indent=2, ensure_ascii=False)};

export const BAIRROS_LIST: BairroSummary[] = {json.dumps(sorted_bairros, indent=2, ensure_ascii=False)};

export const FORTALEZA_COORDINATES: Record<string, [number, number]> = {{
{coords_block}
}};

export const ELECTORAL_METADATA = {{
  titulo: 'Análise Geoespacial de Votação por Bairro — Fortaleza/CE',
  ano: 2024,
  turno: 1,
  municipio: 'Fortaleza',
  uf: 'CE',
  fonte: 'TRE/CE — Tribunal Regional Eleitoral do Ceará',
  elaboradoPor: 'Marcos Silveira',
  totalVotosApurados: {sum(c["totalVotos"] for c in sorted_cands)},
  totalCandidatos: {len(sorted_cands)},
  totalBairros: {len(sorted_bairros)}
}};
'''

with open('src/data/electoralFortalezaData.ts', 'w', encoding='utf-8') as out:
    out.write(ts_content)

print('Generated src/data/electoralFortalezaData.ts successfully!')
