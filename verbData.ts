export interface TransportInfo {
  es: string;
  hy: string;
  icon?: string;
}

export interface WordChallenge {
  word: string; // The Spanish word to guess
  hint: string; // The Armenian translation
}

export const TRANSPORT_DATA: TransportInfo[] = [
  { es: "el coche", hy: "մեքենա" },
  { es: "el autobús", hy: "ավտոբուս" },
  { es: "el microbús", hy: "միկրոավտոբուս" },
  { es: "el metro", hy: "մետրո" },
  { es: "el tren", hy: "գնացք" },
  { es: "el tranvía", hy: "տրամվայ" },
  { es: "el taxi", hy: "տաքսի" },
  { es: "la furgoneta", hy: "ֆուրգոն" },
  { es: "el camión", hy: "բեռնատար" },
  { es: "la bicicleta", hy: "հեծանիվ" },
  { es: "la moto", hy: "մոտոցիկլետ" },
  { es: "el patinete", hy: "ինքնագլոր" },
  { es: "el avión", hy: "ինքնաթիռ" },
  { es: "el barco", hy: "նավ" },
  { es: "el helicóptero", hy: "ուղղաթիռ" },
  { es: "el cohete", hy: "հրթիռ" },
  { es: "el tractor", hy: "տրակտոր" },
  { es: "el submarino", hy: "սուզանավ" },
  { es: "el crucero", hy: "զբոսանավ" },
  { es: "el globo", hy: "օդապարիկ" },
  { es: "el ala delta", hy: "դելտապլան" },
  { es: "el teleférico", hy: "ճոպանուղի" },
  { es: "el yate", hy: "զբոսանավ" },
  { es: "la canoa", hy: "կանոե" },
  { es: "la balsa", hy: "լաստ" },
  { es: "el patín", hy: "չմուշկ" },
  { es: "la patineta", hy: "սքեյթբորդ" },
  { es: "el furgón", hy: "ֆուրգոն" },
  { es: "la ambulancia", hy: "շտապօգնություն" },
  { es: "el coche de bomberos", hy: "հրշեջ մեքենա" },
  { es: "la patrulla", hy: "պարեկային մեքենա" }
];

export const WORD_CHALLENGES: WordChallenge[] = [
  { word: "COCHE", hint: "Մեքենա" },
  { word: "TREN", hint: "Գնացք" },
  { word: "METRO", hint: "Մետրո" },
  { word: "TAXI", hint: "Տաքսի" },
  { word: "AVION", hint: "Ինքնաթիռ" },
  { word: "BARCO", hint: "Նավ" },
  { word: "MOTO", hint: "Մոտոցիկլետ" },
  { word: "BICI", hint: "Հեծանիվ" },
  { word: "AUTO", hint: "Ավտո" },
  { word: "CAMION", hint: "Բեռնատար" }
];
