const fs = require('fs');

const csvText = fs.readFileSync('public/votacao_fortaleza_tre_ce.csv', 'utf8');
const lines = csvText.trim().split('\n');

const coords = {
  "AEROLÂNDIA": { lat: -3.7712, lng: -38.5147 },
  "AEROPORTO": { lat: -3.7661, lng: -38.5327 },
  "ALDEOTA": { lat: -3.7371, lng: -38.4983 },
  "ALTO DA BALANÇA": { lat: -3.7634, lng: -38.5186 },
  "ÁLVARO WEYNE": { lat: -3.7197, lng: -38.5612 },
  "AMADEU FURTADO": { lat: -3.7423, lng: -38.5583 },
  "ANCURI": { lat: -3.8542, lng: -38.5321 },
  "ANTÔNIO BEZERRA": { lat: -3.7389, lng: -38.5872 },
  "AUTRAN NUNES": { lat: -3.7512, lng: -38.5982 },
  "BARRA DO CEARÁ": { lat: -3.7051, lng: -38.5824 },
  "BARROSO": { lat: -3.8341, lng: -38.5283 },
  "BELA VISTA": { lat: -3.7512, lng: -38.5574 },
  "BENFICA": { lat: -3.7441, lng: -38.5392 },
  "BOA VISTA-CASTELÃO": { lat: -3.8052, lng: -38.5221 },
  "BOM FUTURO": { lat: -3.7584, lng: -38.5471 },
  "BOM JARDIM": { lat: -3.7951, lng: -38.6012 },
  "BONSUCESSO": { lat: -3.7754, lng: -38.5912 },
  "CAIS DO PORTO": { lat: -3.7182, lng: -38.4721 },
  "CAJAZEIRAS": { lat: -3.8184, lng: -38.5092 },
  "CAMBEBA": { lat: -3.8051, lng: -38.4891 },
  "CANINDEZINHO": { lat: -3.8091, lng: -38.6112 },
  "CARLITO PAMPLONA": { lat: -3.7162, lng: -38.5521 },
  "CENTRO": { lat: -3.7275, lng: -38.5284 },
  "CIDADE 2000": { lat: -3.7521, lng: -38.4742 },
  "CIDADE DOS FUNCIONÁRIOS": { lat: -3.7951, lng: -38.4982 },
  "COAÇU": { lat: -3.8312, lng: -38.4762 },
  "COCÓ": { lat: -3.7541, lng: -38.4862 },
  "CONJUNTO CEARÁ I": { lat: -3.7681, lng: -38.6042 },
  "CONJUNTO CEARÁ II": { lat: -3.7721, lng: -38.6091 },
  "CONJUNTO ESPERANÇA": { lat: -3.7991, lng: -38.6052 },
  "CONJUNTO PALMEIRAS": { lat: -3.8471, lng: -38.5251 },
  "CRISTO REDENTOR": { lat: -3.7121, lng: -38.5632 },
  "DAMAS": { lat: -3.7512, lng: -38.5441 },
  "DE LOURDES": { lat: -3.7381, lng: -38.4682 },
  "DEMOCRITO ROCHA": { lat: -3.7612, lng: -38.5612 },
  "DIAS MACEDO": { lat: -3.7941, lng: -38.5262 },
  "DIONÍSIO TORRES": { lat: -3.7512, lng: -38.5042 },
  "DOM LUSTOSA": { lat: -3.7521, lng: -38.5821 },
  "EDSON QUEIROZ": { lat: -3.7721, lng: -38.4772 },
  "ENGENHEIRO LUCIANO CAVALCANTE": { lat: -3.7782, lng: -38.4931 },
  "FARIAS BRITO": { lat: -3.7351, lng: -38.5482 },
  "FÁTIMA": { lat: -3.7532, lng: -38.5281 },
  "FLORESTA": { lat: -3.7142, lng: -38.5771 },
  "GENIBAÚ": { lat: -3.7661, lng: -38.6051 },
  "GRANJA LISBOA": { lat: -3.7842, lng: -38.6182 },
  "GRANJA PORTUGAL": { lat: -3.7791, lng: -38.6031 },
  "GUAJIRU": { lat: -3.8421, lng: -38.4871 },
  "GUARARAPES": { lat: -3.7812, lng: -38.4812 },
  "HENRIQUE JORGE": { lat: -3.7551, lng: -38.5861 },
  "ITAOCA": { lat: -3.7691, lng: -38.5421 },
  "ITAPERI": { lat: -3.7882, lng: -38.5521 },
  "JACARECANGA": { lat: -3.7181, lng: -38.5412 },
  "JANGURUSSU": { lat: -3.8421, lng: -38.5182 },
  "JARDIM AMÉRICA": { lat: -3.7551, lng: -38.5412 },
  "JARDIM CEARENSE": { lat: -3.7912, lng: -38.5721 },
  "JARDIM DAS OLIVEIRAS": { lat: -3.7881, lng: -38.4982 },
  "JARDIM GUANABARA": { lat: -3.7251, lng: -38.5882 },
  "JARDIM IRACEMA": { lat: -3.7152, lng: -38.5712 },
  "JOÃO XXIII": { lat: -3.7631, lng: -38.5831 },
  "JOAQUIM TÁVORA": { lat: -3.7482, lng: -38.5181 },
  "JÓQUEI CLUBE": { lat: -3.7651, lng: -38.5741 },
  "JOSÉ BONIFÁCIO": { lat: -3.7461, lng: -38.5281 },
  "JOSÉ DE ALENCAR": { lat: -3.8182, lng: -38.4791 },
  "LAGOA REDONDA": { lat: -3.8341, lng: -38.4651 },
  "MANOEL SÁTIRO": { lat: -3.7912, lng: -38.5912 },
  "MARAPONGA": { lat: -3.7881, lng: -38.5712 },
  "MEIRELES": { lat: -3.7251, lng: -38.4921 },
  "MESSEJANA": { lat: -3.8312, lng: -38.4982 },
  "MONDUBIM": { lat: -3.7991, lng: -38.5872 },
  "MONTE CASTELO": { lat: -3.7251, lng: -38.5492 },
  "MONTESE": { lat: -3.7661, lng: -38.5491 },
  "MOURA BRASIL": { lat: -3.7212, lng: -38.5341 },
  "MUCURIPE": { lat: -3.7221, lng: -38.4812 },
  "NOVO MONDUBIM": { lat: -3.8051, lng: -38.5921 },
  "PADRE ANDRADE": { lat: -3.7312, lng: -38.5741 },
  "PANAMERICANO": { lat: -3.7541, lng: -38.5631 },
  "PAPICU": { lat: -3.7431, lng: -38.4771 },
  "PARANGABA": { lat: -3.7741, lng: -38.5612 },
  "PARQUE ARAXÁ": { lat: -3.7361, lng: -38.5412 },
  "PARQUE DOIS IRMÃOS": { lat: -3.8081, lng: -38.5521 },
  "PARQUE MANIBURA": { lat: -3.7951, lng: -38.4871 },
  "PARQUE PRESIDENTE VARGAS": { lat: -3.8151, lng: -38.6012 },
  "PARQUE SANTA MARIA": { lat: -3.8512, lng: -38.5141 },
  "PARQUE SANTA ROSA": { lat: -3.8181, lng: -38.6141 },
  "PARQUE SÃO JOSÉ": { lat: -3.7841, lng: -38.5891 },
  "PARQUELÂNDIA": { lat: -3.7341, lng: -38.5562 },
  "PASSARÉ": { lat: -3.8082, lng: -38.5291 },
  "PAUPINA": { lat: -3.8441, lng: -38.4982 },
  "PEDRAS": { lat: -3.8641, lng: -38.5121 },
  "PICI": { lat: -3.7451, lng: -38.5741 },
  "PIRAMBU": { lat: -3.7081, lng: -38.5541 },
  "PLANALTO AYRTON SENNA": { lat: -3.8241, lng: -38.5781 },
  "PRAIA DE IRACEMA": { lat: -3.7191, lng: -38.5141 },
  "PRAIA DO FUTURO": { lat: -3.7451, lng: -38.4551 },
  "PREFEITO JOSÉ WALTER": { lat: -3.8241, lng: -38.5482 },
  "PRESIDENTE KENNEDY": { lat: -3.7321, lng: -38.5671 },
  "QUINTINO CUNHA": { lat: -3.7312, lng: -38.5982 },
  "RODOLFO TEÓFILO": { lat: -3.7451, lng: -38.5521 },
  "SABIAGUABA": { lat: -3.7851, lng: -38.4351 },
  "SÃO GERARDO": { lat: -3.7291, lng: -38.5521 },
  "SAPIRANGA-COITÉ": { lat: -3.7951, lng: -38.4721 },
  "SERRINHA": { lat: -3.7782, lng: -38.5391 },
  "SIQUEIRA": { lat: -3.7881, lng: -38.6012 },
  "TAUAPE": { lat: -3.7541, lng: -38.5121 },
  "VARJOTA": { lat: -3.7341, lng: -38.4881 },
  "VICENTE PINZON": { lat: -3.7241, lng: -38.4712 },
  "VILA ELLERY": { lat: -3.7231, lng: -38.5591 },
  "VILA PERI": { lat: -3.7841, lng: -38.5791 },
  "VILA UNIÃO": { lat: -3.7641, lng: -38.5341 },
  "VILA VELHA": { lat: -3.7151, lng: -38.5912 }
};

function normalizeBairro(b) {
  let s = b.trim().toUpperCase();
  if (s === "DIONÍSIO TORRES" || s === "DIONISIO TORRES") return "DIONÍSIO TORRES";
  if (s === "FATIMA" || s === "FÁTIMA") return "FÁTIMA";
  if (s === "GUAJIRU") return "GUAJIRU";
  if (s === "PRAIA DO FUTURO") return "PRAIA DO FUTURO";
  if (s === "VILA ELLERY") return "VILA ELLERY";
  if (s === "JOÃOXIII" || s === "JOÃO XXIII") return "JOÃO XXIII";
  return s;
}

const records = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  let cols = [];
  let inQuotes = false;
  let cur = '';
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      cols.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  cols.push(cur.trim());

  if (cols.length >= 9) {
    const rawBairro = cols[5];
    const normB = normalizeBairro(rawBairro);
    const votos = parseInt(cols[6], 10) || 0;
    const percStr = cols[7].replace(/"/g, '').replace(',', '.');
    const perc = parseFloat(percStr) || 0;
    records.push({
      ano: parseInt(cols[0], 10) || 2024,
      turno: parseInt(cols[1], 10) || 1,
      municipio: cols[2],
      numero: cols[3],
      candidato: cols[4],
      bairro: normB,
      votos,
      percentual: perc,
      status: cols[8]
    });
  }
}

console.log('Parsed records:', records.length);

const out = `// Arquivo gerado com base nos dados oficiais do TRE/CE
// Elaborado e modelado por Marcos Silveira

export interface ElectoralRecord {
  ano: number;
  turno: number;
  municipio: string;
  numero: string;
  candidato: string;
  bairro: string;
  votos: number;
  percentual: number;
  status: 'ELEITO' | 'SUPLENTE' | string;
}

export interface BairroCoord {
  lat: number;
  lng: number;
}

export const FORTALEZA_COORDINATES: Record<string, BairroCoord> = ${JSON.stringify(coords, null, 2)};

export const ELECTORAL_DATA: ElectoralRecord[] = ${JSON.stringify(records, null, 2)};
`;

fs.writeFileSync('src/data/electoralData.ts', out);
console.log('Generated src/data/electoralData.ts successfully!');
