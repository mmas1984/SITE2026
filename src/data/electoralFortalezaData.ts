export interface ElectoralRecord {
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
}

export interface CandidateSummary {
  nome: string;
  numero: string;
  status: 'ELEITO' | 'SUPLENTE';
  totalVotos: number;
  bairrosPresentes: number;
}

export interface BairroSummary {
  nome: string;
  lat: number;
  lon: number;
  totalVotos: number;
}

export const CANDIDATES_LIST: CandidateSummary[] = [
  {
    "nome": "PRISCILA COSTA",
    "numero": "22222",
    "status": "ELEITO",
    "totalVotos": 20719,
    "bairrosPresentes": 58
  },
  {
    "nome": "GABRIEL BIOLOGIA",
    "numero": "50555",
    "status": "ELEITO",
    "totalVotos": 18337,
    "bairrosPresentes": 58
  },
  {
    "nome": "BELLA CARMELO",
    "numero": "22022",
    "status": "ELEITO",
    "totalVotos": 16783,
    "bairrosPresentes": 58
  },
  {
    "nome": "EMANUEL ACRIZIO",
    "numero": "70111",
    "status": "ELEITO",
    "totalVotos": 11752,
    "bairrosPresentes": 57
  },
  {
    "nome": "RONALDO MARTINS",
    "numero": "10123",
    "status": "ELEITO",
    "totalVotos": 11750,
    "bairrosPresentes": 57
  },
  {
    "nome": "MARCEL COLARES",
    "numero": "12000",
    "status": "ELEITO",
    "totalVotos": 11081,
    "bairrosPresentes": 57
  },
  {
    "nome": "ADAIL JR.",
    "numero": "12777",
    "status": "ELEITO",
    "totalVotos": 9933,
    "bairrosPresentes": 56
  },
  {
    "nome": "GARDEL ROLIM",
    "numero": "12333",
    "status": "ELEITO",
    "totalVotos": 9195,
    "bairrosPresentes": 58
  },
  {
    "nome": "EUDES BRINGEL",
    "numero": "55000",
    "status": "ELEITO",
    "totalVotos": 8619,
    "bairrosPresentes": 58
  },
  {
    "nome": "TONY BRITO",
    "numero": "55777",
    "status": "SUPLENTE",
    "totalVotos": 8582,
    "bairrosPresentes": 58
  },
  {
    "nome": "PPCELL",
    "numero": "12800",
    "status": "ELEITO",
    "totalVotos": 8270,
    "bairrosPresentes": 58
  },
  {
    "nome": "BRUNO MESQUITA",
    "numero": "55789",
    "status": "ELEITO",
    "totalVotos": 7694,
    "bairrosPresentes": 57
  },
  {
    "nome": "KÁTIA RODRIGUES",
    "numero": "12123",
    "status": "ELEITO",
    "totalVotos": 7661,
    "bairrosPresentes": 58
  },
  {
    "nome": "MÁRCIO MARTINS",
    "numero": "44444",
    "status": "ELEITO",
    "totalVotos": 7554,
    "bairrosPresentes": 58
  },
  {
    "nome": "PAULO MARTINS",
    "numero": "12444",
    "status": "ELEITO",
    "totalVotos": 7279,
    "bairrosPresentes": 57
  },
  {
    "nome": "ERICH DOUGLAS",
    "numero": "55111",
    "status": "ELEITO",
    "totalVotos": 7158,
    "bairrosPresentes": 57
  },
  {
    "nome": "APOLLO VICZ",
    "numero": "55011",
    "status": "ELEITO",
    "totalVotos": 7106,
    "bairrosPresentes": 57
  },
  {
    "nome": "DR. LUCIANO GIRÃO",
    "numero": "12500",
    "status": "ELEITO",
    "totalVotos": 6870,
    "bairrosPresentes": 57
  },
  {
    "nome": "JORGE PINHEIRO",
    "numero": "45000",
    "status": "ELEITO",
    "totalVotos": 6605,
    "bairrosPresentes": 57
  },
  {
    "nome": "PROFESSOR ENILSON",
    "numero": "23456",
    "status": "ELEITO",
    "totalVotos": 6551,
    "bairrosPresentes": 58
  },
  {
    "nome": "JULIERME SENA",
    "numero": "22123",
    "status": "ELEITO",
    "totalVotos": 6044,
    "bairrosPresentes": 58
  },
  {
    "nome": "WELLINGTON SABÓIA",
    "numero": "20000",
    "status": "ELEITO",
    "totalVotos": 5961,
    "bairrosPresentes": 58
  },
  {
    "nome": "RAIMUNDO FILHO",
    "numero": "12999",
    "status": "SUPLENTE",
    "totalVotos": 5920,
    "bairrosPresentes": 58
  },
  {
    "nome": "JÂNIO HENRIQUE",
    "numero": "12111",
    "status": "ELEITO",
    "totalVotos": 5772,
    "bairrosPresentes": 56
  },
  {
    "nome": "LEO COUTO",
    "numero": "40123",
    "status": "ELEITO",
    "totalVotos": 5668,
    "bairrosPresentes": 57
  },
  {
    "nome": "CARLA DO ACILON",
    "numero": "27123",
    "status": "ELEITO",
    "totalVotos": 5605,
    "bairrosPresentes": 57
  },
  {
    "nome": "ADRIANA GERÔNIMO",
    "numero": "50777",
    "status": "ELEITO",
    "totalVotos": 5594,
    "bairrosPresentes": 57
  },
  {
    "nome": "AGLAYLSON",
    "numero": "13120",
    "status": "ELEITO",
    "totalVotos": 5474,
    "bairrosPresentes": 57
  },
  {
    "nome": "CLAUDIO LIMA",
    "numero": "70369",
    "status": "SUPLENTE",
    "totalVotos": 5172,
    "bairrosPresentes": 56
  },
  {
    "nome": "PEDRO MATOS",
    "numero": "70222",
    "status": "ELEITO",
    "totalVotos": 5048,
    "bairrosPresentes": 58
  },
  {
    "nome": "MARCELO MENDES",
    "numero": "22333",
    "status": "ELEITO",
    "totalVotos": 4753,
    "bairrosPresentes": 57
  },
  {
    "nome": "NILO DANTAS",
    "numero": "25777",
    "status": "SUPLENTE",
    "totalVotos": 4709,
    "bairrosPresentes": 56
  },
  {
    "nome": "JULIO BRIZZI",
    "numero": "13321",
    "status": "ELEITO",
    "totalVotos": 4596,
    "bairrosPresentes": 58
  },
  {
    "nome": "MARI LACERDA",
    "numero": "13131",
    "status": "ELEITO",
    "totalVotos": 4562,
    "bairrosPresentes": 57
  },
  {
    "nome": "DR VICENTE",
    "numero": "13123",
    "status": "SUPLENTE",
    "totalVotos": 4500,
    "bairrosPresentes": 58
  },
  {
    "nome": "PROFESSOR AGUIAR TOBA",
    "numero": "25123",
    "status": "ELEITO",
    "totalVotos": 4453,
    "bairrosPresentes": 57
  },
  {
    "nome": "INSPETOR ALBERTO",
    "numero": "22122",
    "status": "ELEITO",
    "totalVotos": 4440,
    "bairrosPresentes": 56
  },
  {
    "nome": "MARCOS PAULO",
    "numero": "11111",
    "status": "ELEITO",
    "totalVotos": 4439,
    "bairrosPresentes": 50
  },
  {
    "nome": "BENIGNO JUNIOR",
    "numero": "10456",
    "status": "ELEITO",
    "totalVotos": 4364,
    "bairrosPresentes": 57
  },
  {
    "nome": "MICHEL LINS",
    "numero": "25555",
    "status": "ELEITO",
    "totalVotos": 4239,
    "bairrosPresentes": 56
  },
  {
    "nome": "ANA ARACAPÉ",
    "numero": "70123",
    "status": "ELEITO",
    "totalVotos": 3978,
    "bairrosPresentes": 58
  },
  {
    "nome": "SOLDADO NOELIO",
    "numero": "44190",
    "status": "ELEITO",
    "totalVotos": 3740,
    "bairrosPresentes": 58
  },
  {
    "nome": "MARCELO TCHELA",
    "numero": "70200",
    "status": "SUPLENTE",
    "totalVotos": 3688,
    "bairrosPresentes": 57
  },
  {
    "nome": "LUIZ PAUPINA",
    "numero": "36789",
    "status": "ELEITO",
    "totalVotos": 3633,
    "bairrosPresentes": 56
  },
  {
    "nome": "RENE PESSOA",
    "numero": "44777",
    "status": "SUPLENTE",
    "totalVotos": 3559,
    "bairrosPresentes": 57
  },
  {
    "nome": "BÁ",
    "numero": "40000",
    "status": "ELEITO",
    "totalVotos": 2793,
    "bairrosPresentes": 55
  },
  {
    "nome": "GERMANO HE MAN",
    "numero": "33024",
    "status": "ELEITO",
    "totalVotos": 2775,
    "bairrosPresentes": 58
  },
  {
    "nome": "TIA FRANCISCA",
    "numero": "55555",
    "status": "SUPLENTE",
    "totalVotos": 2603,
    "bairrosPresentes": 55
  },
  {
    "nome": "CÔNSUL DO POVO",
    "numero": "55300",
    "status": "SUPLENTE",
    "totalVotos": 2376,
    "bairrosPresentes": 54
  },
  {
    "nome": "DAYANE COSTA",
    "numero": "20012",
    "status": "SUPLENTE",
    "totalVotos": 1891,
    "bairrosPresentes": 51
  },
  {
    "nome": "DUMMAR",
    "numero": "27999",
    "status": "SUPLENTE",
    "totalVotos": 1813,
    "bairrosPresentes": 56
  },
  {
    "nome": "IRMÃO LÉO",
    "numero": "11678",
    "status": "ELEITO",
    "totalVotos": 1621,
    "bairrosPresentes": 56
  },
  {
    "nome": "JOHN MONTEIRO",
    "numero": "40789",
    "status": "SUPLENTE",
    "totalVotos": 1286,
    "bairrosPresentes": 50
  },
  {
    "nome": "CHIQUINHO DOS CARNEIROS",
    "numero": "25456",
    "status": "ELEITO",
    "totalVotos": 1037,
    "bairrosPresentes": 55
  }
];

export const BAIRROS_LIST: BairroSummary[] = [
  {
    "nome": "MESSEJANA",
    "lat": -3.8292,
    "lon": -38.4967,
    "totalVotos": 20242
  },
  {
    "nome": "CONJUNTO CEARÁ I",
    "lat": -3.7719,
    "lon": -38.6033,
    "totalVotos": 17019
  },
  {
    "nome": "ALDEOTA",
    "lat": -3.7375,
    "lon": -38.4988,
    "totalVotos": 13775
  },
  {
    "nome": "JANGURUSSU",
    "lat": -3.8389,
    "lon": -38.5292,
    "totalVotos": 13344
  },
  {
    "nome": "BARRA DO CEARÁ",
    "lat": -3.7042,
    "lon": -38.5833,
    "totalVotos": 13025
  },
  {
    "nome": "ANTÔNIO BEZERRA",
    "lat": -3.7397,
    "lon": -38.5919,
    "totalVotos": 12481
  },
  {
    "nome": "CONJUNTO PALMEIRAS",
    "lat": -3.8344,
    "lon": -38.5147,
    "totalVotos": 11421
  },
  {
    "nome": "BOM JARDIM",
    "lat": -3.7917,
    "lon": -38.6019,
    "totalVotos": 11019
  },
  {
    "nome": "EDSON QUEIROZ",
    "lat": -3.7711,
    "lon": -38.4764,
    "totalVotos": 9890
  },
  {
    "nome": "HENRIQUE JORGE",
    "lat": -3.7606,
    "lon": -38.5833,
    "totalVotos": 9676
  },
  {
    "nome": "BONSUCESSO",
    "lat": -3.7739,
    "lon": -38.5889,
    "totalVotos": 9583
  },
  {
    "nome": "PARANGABA",
    "lat": -3.7761,
    "lon": -38.5617,
    "totalVotos": 9506
  },
  {
    "nome": "BELA VISTA",
    "lat": -3.7503,
    "lon": -38.5564,
    "totalVotos": 9001
  },
  {
    "nome": "GRANJA PORTUGAL",
    "lat": -3.7842,
    "lon": -38.6039,
    "totalVotos": 8946
  },
  {
    "nome": "CRISTO REDENTOR",
    "lat": -3.7125,
    "lon": -38.5611,
    "totalVotos": 8762
  },
  {
    "nome": "CONJUNTO ESPERANÇA",
    "lat": -3.8153,
    "lon": -38.5911,
    "totalVotos": 8637
  },
  {
    "nome": "CENTRO",
    "lat": -3.7275,
    "lon": -38.5275,
    "totalVotos": 8305
  },
  {
    "nome": "ENGENHEIRO LUCIANO CAVALCANTE",
    "lat": -3.7758,
    "lon": -38.4919,
    "totalVotos": 8090
  },
  {
    "nome": "GRANJA LISBOA",
    "lat": -3.7981,
    "lon": -38.6183,
    "totalVotos": 7853
  },
  {
    "nome": "MEIRELES",
    "lat": -3.7292,
    "lon": -38.4967,
    "totalVotos": 7067
  },
  {
    "nome": "ÁLVARO WEYNE",
    "lat": -3.7194,
    "lon": -38.5681,
    "totalVotos": 6988
  },
  {
    "nome": "BARROSO",
    "lat": -3.8189,
    "lon": -38.5222,
    "totalVotos": 6809
  },
  {
    "nome": "CAIS DO PORTO",
    "lat": -3.7183,
    "lon": -38.4683,
    "totalVotos": 5719
  },
  {
    "nome": "Fatima",
    "lat": -3.755,
    "lon": -38.5267,
    "totalVotos": 5713
  },
  {
    "nome": "CIDADE DOS FUNCIONÁRIOS",
    "lat": -3.7933,
    "lon": -38.4981,
    "totalVotos": 5485
  },
  {
    "nome": "Dionísio Torres",
    "lat": -3.7511,
    "lon": -38.5056,
    "totalVotos": 5379
  },
  {
    "nome": "ALTO DA BALANÇA",
    "lat": -3.7656,
    "lon": -38.5175,
    "totalVotos": 4816
  },
  {
    "nome": "CANINDEZINHO",
    "lat": -3.8156,
    "lon": -38.6067,
    "totalVotos": 4766
  },
  {
    "nome": "DEMOCRITO ROCHA",
    "lat": -3.7667,
    "lon": -38.56,
    "totalVotos": 4619
  },
  {
    "nome": "AUTRAN NUNES",
    "lat": -3.7547,
    "lon": -38.5936,
    "totalVotos": 4535
  },
  {
    "nome": "ITAPERI",
    "lat": -3.7869,
    "lon": -38.5528,
    "totalVotos": 4291
  },
  {
    "nome": "CARLITO PAMPLONA",
    "lat": -3.7175,
    "lon": -38.5542,
    "totalVotos": 4165
  },
  {
    "nome": "JARDIM AMÉRICA",
    "lat": -3.7578,
    "lon": -38.5489,
    "totalVotos": 4099
  },
  {
    "nome": "BOM FUTURO",
    "lat": -3.7558,
    "lon": -38.5447,
    "totalVotos": 4020
  },
  {
    "nome": "BENFICA",
    "lat": -3.7428,
    "lon": -38.5372,
    "totalVotos": 3994
  },
  {
    "nome": "JACARECANGA",
    "lat": -3.7214,
    "lon": -38.5417,
    "totalVotos": 3850
  },
  {
    "nome": "GENIBAÚ",
    "lat": -3.7722,
    "lon": -38.6181,
    "totalVotos": 3804
  },
  {
    "nome": "DOM LUSTOSA",
    "lat": -3.7533,
    "lon": -38.5806,
    "totalVotos": 3581
  },
  {
    "nome": "DIAS MACEDO",
    "lat": -3.7958,
    "lon": -38.5306,
    "totalVotos": 3150
  },
  {
    "nome": "DE LOURDES",
    "lat": -3.7317,
    "lon": -38.465,
    "totalVotos": 2749
  },
  {
    "nome": "COCÓ",
    "lat": -3.7542,
    "lon": -38.4853,
    "totalVotos": 2621
  },
  {
    "nome": "BOA VISTA-CASTELÃO",
    "lat": -3.8064,
    "lon": -38.5244,
    "totalVotos": 2562
  },
  {
    "nome": "CIDADE 2000",
    "lat": -3.7497,
    "lon": -38.4697,
    "totalVotos": 2447
  },
  {
    "nome": "CAJAZEIRAS",
    "lat": -3.8058,
    "lon": -38.5083,
    "totalVotos": 2418
  },
  {
    "nome": "CAMBEBA",
    "lat": -3.8011,
    "lon": -38.4897,
    "totalVotos": 1975
  },
  {
    "nome": "FARIAS BRITO",
    "lat": -3.7344,
    "lon": -38.5472,
    "totalVotos": 1971
  },
  {
    "nome": "AEROLÂNDIA",
    "lat": -3.7719,
    "lon": -38.5132,
    "totalVotos": 1921
  },
  {
    "nome": "DAMAS",
    "lat": -3.7508,
    "lon": -38.5467,
    "totalVotos": 1888
  },
  {
    "nome": "Guajiru",
    "lat": -3.8444,
    "lon": -38.4889,
    "totalVotos": 1782
  },
  {
    "nome": "FLORESTA",
    "lat": -3.7139,
    "lon": -38.575,
    "totalVotos": 1666
  },
  {
    "nome": "COAÇU",
    "lat": -3.8375,
    "lon": -38.4858,
    "totalVotos": 1624
  },
  {
    "nome": "AMADEU FURTADO",
    "lat": -3.7431,
    "lon": -38.5583,
    "totalVotos": 1148
  },
  {
    "nome": "GUARARAPES",
    "lat": -3.7681,
    "lon": -38.485,
    "totalVotos": 985
  },
  {
    "nome": "CONJUNTO CEARÁ II",
    "lat": -3.7797,
    "lon": -38.6094,
    "totalVotos": 972
  },
  {
    "nome": "AEROPORTO",
    "lat": -3.7761,
    "lon": -38.5325,
    "totalVotos": 543
  },
  {
    "nome": "Vila Ellery",
    "lat": -3.7219,
    "lon": -38.5639,
    "totalVotos": 511
  },
  {
    "nome": "ANCURI",
    "lat": -3.8544,
    "lon": -38.5217,
    "totalVotos": 342
  },
  {
    "nome": "ITAOCA",
    "lat": -3.7708,
    "lon": -38.5458,
    "totalVotos": 55
  }
];

export const FORTALEZA_COORDINATES: Record<string, [number, number]> = {
  "MESSEJANA": [-3.8292, -38.4967],
  "CONJUNTO CEARÁ I": [-3.7719, -38.6033],
  "ALDEOTA": [-3.7375, -38.4988],
  "JANGURUSSU": [-3.8389, -38.5292],
  "BARRA DO CEARÁ": [-3.7042, -38.5833],
  "ANTÔNIO BEZERRA": [-3.7397, -38.5919],
  "CONJUNTO PALMEIRAS": [-3.8344, -38.5147],
  "BOM JARDIM": [-3.7917, -38.6019],
  "EDSON QUEIROZ": [-3.7711, -38.4764],
  "HENRIQUE JORGE": [-3.7606, -38.5833],
  "BONSUCESSO": [-3.7739, -38.5889],
  "PARANGABA": [-3.7761, -38.5617],
  "BELA VISTA": [-3.7503, -38.5564],
  "GRANJA PORTUGAL": [-3.7842, -38.6039],
  "CRISTO REDENTOR": [-3.7125, -38.5611],
  "CONJUNTO ESPERANÇA": [-3.8153, -38.5911],
  "CENTRO": [-3.7275, -38.5275],
  "ENGENHEIRO LUCIANO CAVALCANTE": [-3.7758, -38.4919],
  "GRANJA LISBOA": [-3.7981, -38.6183],
  "MEIRELES": [-3.7292, -38.4967],
  "ÁLVARO WEYNE": [-3.7194, -38.5681],
  "BARROSO": [-3.8189, -38.5222],
  "CAIS DO PORTO": [-3.7183, -38.4683],
  "Fatima": [-3.755, -38.5267],
  "CIDADE DOS FUNCIONÁRIOS": [-3.7933, -38.4981],
  "Dionísio Torres": [-3.7511, -38.5056],
  "ALTO DA BALANÇA": [-3.7656, -38.5175],
  "CANINDEZINHO": [-3.8156, -38.6067],
  "DEMOCRITO ROCHA": [-3.7667, -38.56],
  "AUTRAN NUNES": [-3.7547, -38.5936],
  "ITAPERI": [-3.7869, -38.5528],
  "CARLITO PAMPLONA": [-3.7175, -38.5542],
  "JARDIM AMÉRICA": [-3.7578, -38.5489],
  "BOM FUTURO": [-3.7558, -38.5447],
  "BENFICA": [-3.7428, -38.5372],
  "JACARECANGA": [-3.7214, -38.5417],
  "GENIBAÚ": [-3.7722, -38.6181],
  "DOM LUSTOSA": [-3.7533, -38.5806],
  "DIAS MACEDO": [-3.7958, -38.5306],
  "DE LOURDES": [-3.7317, -38.465],
  "COCÓ": [-3.7542, -38.4853],
  "BOA VISTA-CASTELÃO": [-3.8064, -38.5244],
  "CIDADE 2000": [-3.7497, -38.4697],
  "CAJAZEIRAS": [-3.8058, -38.5083],
  "CAMBEBA": [-3.8011, -38.4897],
  "FARIAS BRITO": [-3.7344, -38.5472],
  "AEROLÂNDIA": [-3.7719, -38.5132],
  "DAMAS": [-3.7508, -38.5467],
  "Guajiru": [-3.8444, -38.4889],
  "FLORESTA": [-3.7139, -38.575],
  "COAÇU": [-3.8375, -38.4858],
  "AMADEU FURTADO": [-3.7431, -38.5583],
  "GUARARAPES": [-3.7681, -38.485],
  "CONJUNTO CEARÁ II": [-3.7797, -38.6094],
  "AEROPORTO": [-3.7761, -38.5325],
  "Vila Ellery": [-3.7219, -38.5639],
  "ANCURI": [-3.8544, -38.5217],
  "ITAOCA": [-3.7708, -38.5458],
};

export const ELECTORAL_METADATA = {
  titulo: 'Análise Geoespacial de Votação por Bairro — Fortaleza/CE',
  ano: 2024,
  turno: 1,
  municipio: 'Fortaleza',
  uf: 'CE',
  fonte: 'TRE/CE — Tribunal Regional Eleitoral do Ceará',
  elaboradoPor: 'Marcos Silveira',
  totalVotosApurados: 337605,
  totalCandidatos: 54,
  totalBairros: 58
};
