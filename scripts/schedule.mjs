// Brasília time (UTC-3)
// Days: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat

export const lotterySchedule = [
  { slug: "mega-sena",      days: [2, 4, 6], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "lotofacil",       days: [1, 2, 3, 4, 5, 6], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "mais-milionaria", days: [3, 6], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "quina",           days: [1, 2, 3, 4, 5, 6], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "lotomania",       days: [3, 6], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "loteria-federal", days: [3, 6], time: "20:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "dupla-sena",      days: [2, 4, 6], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "dia-de-sorte",    days: [2, 4, 6], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "super-sete",      days: [1, 3, 5], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
  { slug: "timemania",       days: [2, 4, 6], time: "21:00", scrapeAfterMin: 3, maxRetries: 10 },
]

export const bichoSchedule = [
  {
    slug: "rio-de-janeiro", label: "Rio de Janeiro",
    // Official Banca PT Rio (resultadojogodobicho.net/horarios/): Dom 09:30,11:30,14:30,16:30 / Seg-Sab: +18:30,21:30 / Qua/Sab: +Fed
    days: [
      { dow: 0, times: ["09:30", "11:30", "14:30", "16:30"] },
      { dow: 1, times: ["09:30", "11:30", "14:30", "16:30", "18:30", "21:30"] },
      { dow: 2, times: ["09:30", "11:30", "14:30", "16:30", "18:30", "21:30"] },
      { dow: 3, times: ["09:30", "11:30", "14:30", "16:30", "21:30"] },
      { dow: 4, times: ["09:30", "11:30", "14:30", "16:30", "18:30", "21:30"] },
      { dow: 5, times: ["09:30", "11:30", "14:30", "16:30", "18:30", "21:30"] },
      { dow: 6, times: ["09:30", "11:30", "14:30", "16:30", "21:30"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "paratodos-bahia", label: "Bahia",
    // Official Banca Paratodos/Maluca: Dom 10,12,15 / Seg-Sab 10,12,15,19,21 (Qua/Sab 19=Federal)
    days: [
      { dow: 0, times: ["10:00", "12:00", "15:00"] },
      { dow: 1, times: ["10:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 2, times: ["10:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 3, times: ["10:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 4, times: ["10:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 5, times: ["10:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 6, times: ["10:00", "12:00", "15:00", "19:00", "21:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "brasilia", label: "Brasília",
    // Official Banca LBR: ALL days 08:40,10:00,12:40,15:00,17:00,19:00,20:40,22:00,23:30 (Qua/Sab +19:00 Fed)
    days: [
      { dow: 0, times: ["08:40", "10:00", "12:40", "15:00", "17:00", "19:00", "20:40", "22:00", "23:30"] },
      { dow: 1, times: ["08:40", "10:00", "12:40", "15:00", "17:00", "19:00", "20:40", "22:00", "23:30"] },
      { dow: 2, times: ["08:40", "10:00", "12:40", "15:00", "17:00", "19:00", "20:40", "22:00", "23:30"] },
      { dow: 3, times: ["08:40", "10:00", "12:40", "15:00", "17:00", "19:00", "20:40", "22:00", "23:30"] },
      { dow: 4, times: ["08:40", "10:00", "12:40", "15:00", "17:00", "19:00", "20:40", "22:00", "23:30"] },
      { dow: 5, times: ["08:40", "10:00", "12:40", "15:00", "17:00", "19:00", "20:40", "22:00", "23:30"] },
      { dow: 6, times: ["08:40", "10:00", "12:40", "15:00", "17:00", "19:00", "20:40", "22:00", "23:30"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "ceara", label: "Ceará",
    // Official Banca Lotece: Seg-Sab 11:00,14:00,19:00 / Dom sem extrações
    days: [
      { dow: 0, times: [] },
      { dow: 1, times: ["11:00", "14:00", "19:00"] },
      { dow: 2, times: ["11:00", "14:00", "19:00"] },
      { dow: 3, times: ["11:00", "14:00", "19:00"] },
      { dow: 4, times: ["11:00", "14:00", "19:00"] },
      { dow: 5, times: ["11:00", "14:00", "19:00"] },
      { dow: 6, times: ["11:00", "14:00", "19:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "goias", label: "Goiás",
    // Official Banca Boa Sorte: Dom 09:20,11:20,14:20,16:20,18:20 / Seg-Sab +21:20 / Qua/Sab +19:00 Fed
    days: [
      { dow: 0, times: ["09:20", "11:20", "14:20", "16:20", "18:20"] },
      { dow: 1, times: ["09:20", "11:20", "14:20", "16:20", "18:20", "21:20"] },
      { dow: 2, times: ["09:20", "11:20", "14:20", "16:20", "18:20", "21:20"] },
      { dow: 3, times: ["09:20", "11:20", "14:20", "16:20", "18:20", "19:00", "21:20"] },
      { dow: 4, times: ["09:20", "11:20", "14:20", "16:20", "18:20", "21:20"] },
      { dow: 5, times: ["09:20", "11:20", "14:20", "16:20", "18:20", "21:20"] },
      { dow: 6, times: ["09:20", "11:20", "14:20", "16:20", "18:20", "19:00", "21:20"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "minas-gerais", label: "Minas Gerais",
    // Official Banca Minas: Dom 11,13 / Seg-Sab 11,12,15,19,21 / Sáb sem 21 / Qua/Sab 19=Fed
    days: [
      { dow: 0, times: ["11:00", "13:00"] },
      { dow: 1, times: ["11:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 2, times: ["11:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 3, times: ["11:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 4, times: ["11:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 5, times: ["11:00", "12:00", "15:00", "19:00", "21:00"] },
      { dow: 6, times: ["11:00", "12:00", "15:00", "19:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "paraiba", label: "Paraíba",
    // Official: Paratodos PB (09:45 Dom-Sab, +20:40 Seg-Sab) + Lotep (10:45,12:45 Dom-Sab, +15:45,18:00 Seg-Sab, +19:00 Fed Qua/Sab)
    days: [
      { dow: 0, times: ["09:45", "10:45", "12:45"] },
      { dow: 1, times: ["09:45", "10:45", "12:45", "15:45", "18:00", "20:40"] },
      { dow: 2, times: ["09:45", "10:45", "12:45", "15:45", "18:00", "20:40"] },
      { dow: 3, times: ["09:45", "10:45", "12:45", "15:45", "18:00", "19:00", "20:40"] },
      { dow: 4, times: ["09:45", "10:45", "12:45", "15:45", "18:00", "20:40"] },
      { dow: 5, times: ["09:45", "10:45", "12:45", "15:45", "18:00", "20:40"] },
      { dow: 6, times: ["09:45", "10:45", "12:45", "15:45", "18:00", "19:00", "20:40"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "parana", label: "Paraná",
    // Official Banca Paraná: Dom 11,14,16 / Seg-Sab 11,14,16,18,21
    days: [
      { dow: 0, times: ["11:00", "14:00", "16:00"] },
      { dow: 1, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 2, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 3, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 4, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 5, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 6, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "pernambuco", label: "Pernambuco",
    // Official Banca Popular Recife: Dom 09:30,11,12:40 / Seg-Sab 09:30,11,12:40,14,15:40,17,18:30 / Qua/Sab +19:00 Fed
    days: [
      { dow: 0, times: ["09:30", "11:00", "12:40"] },
      { dow: 1, times: ["09:30", "11:00", "12:40", "14:00", "15:40", "17:00", "18:30"] },
      { dow: 2, times: ["09:30", "11:00", "12:40", "14:00", "15:40", "17:00", "18:30"] },
      { dow: 3, times: ["09:30", "11:00", "12:40", "14:00", "15:40", "17:00", "18:30", "19:00"] },
      { dow: 4, times: ["09:30", "11:00", "12:40", "14:00", "15:40", "17:00", "18:30"] },
      { dow: 5, times: ["09:30", "11:00", "12:40", "14:00", "15:40", "17:00", "18:30"] },
      { dow: 6, times: ["09:30", "11:00", "12:40", "14:00", "15:40", "17:00", "18:30", "19:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "rio-grande-do-sul", label: "Rio Grande do Sul",
    // Official Bicho RS: Seg-Sab 11,14,16,18,21 / Qua/Sab +19:00 Fed / Dom sem extrações
    days: [
      { dow: 0, times: [] },
      { dow: 1, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 2, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 3, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 4, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 5, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
      { dow: 6, times: ["11:00", "14:00", "16:00", "18:00", "21:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "sao-paulo", label: "São Paulo",
    // Official Banca PT SP: Dom 10,13 / Seg-Sab 10,13,20 / Qua/Sab +19:00 Fed
    days: [
      { dow: 0, times: ["10:00", "13:00"] },
      { dow: 1, times: ["10:00", "13:00", "20:00"] },
      { dow: 2, times: ["10:00", "13:00", "20:00"] },
      { dow: 3, times: ["10:00", "13:00", "19:00", "20:00"] },
      { dow: 4, times: ["10:00", "13:00", "20:00"] },
      { dow: 5, times: ["10:00", "13:00", "20:00"] },
      { dow: 6, times: ["10:00", "13:00", "19:00", "20:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "sergipe", label: "Sergipe",
    // Official Abaese Itabaiana Paratodos: Dom 14 / Seg-Sab 13,16,19 / Qua/Sab 19=Fed
    days: [
      { dow: 0, times: ["14:00"] },
      { dow: 1, times: ["13:00", "16:00", "19:00"] },
      { dow: 2, times: ["13:00", "16:00", "19:00"] },
      { dow: 3, times: ["13:00", "16:00", "19:00"] },
      { dow: 4, times: ["13:00", "16:00", "19:00"] },
      { dow: 5, times: ["13:00", "16:00", "19:00"] },
      { dow: 6, times: ["13:00", "16:00", "19:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
  {
    slug: "resultado-nacional", label: "Loteria Nacional",
    // Official: ALL days 02:00,08:00,10:00,12:00,15:00,17:00,20:00,23:00
    days: [
      { dow: 0, times: ["02:00", "08:00", "10:00", "12:00", "15:00", "17:00", "20:00", "23:00"] },
      { dow: 1, times: ["02:00", "08:00", "10:00", "12:00", "15:00", "17:00", "20:00", "23:00"] },
      { dow: 2, times: ["02:00", "08:00", "10:00", "12:00", "15:00", "17:00", "20:00", "23:00"] },
      { dow: 3, times: ["02:00", "08:00", "10:00", "12:00", "15:00", "17:00", "20:00", "23:00"] },
      { dow: 4, times: ["02:00", "08:00", "10:00", "12:00", "15:00", "17:00", "20:00", "23:00"] },
      { dow: 5, times: ["02:00", "08:00", "10:00", "12:00", "15:00", "17:00", "20:00", "23:00"] },
      { dow: 6, times: ["02:00", "08:00", "10:00", "12:00", "15:00", "17:00", "20:00", "23:00"] },
    ],
    scrapeAfterMin: 5, maxRetries: 10,
  },
]
