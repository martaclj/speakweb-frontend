/* función para las banderas:
devuelve el código de país (iso) de flag-icons
ej: inglés 'en' - país 'gb'
    código idioma - código país
*/
export function getFlagCode(code: string): string {
    if (!code) return '';

    const upperCode = code.toUpperCase();

    const flags: { [key: string]: string } = {
      'ES': 'es',
      'EN': 'gb',
      'FR': 'fr',
      'DE': 'de',
      'IT': 'it',
      'PT': 'pt',
      'NL': 'nl',
      'SV': 'se',
      'NO': 'no',
      'DA': 'dk',
      'FI': 'fi',
      'PL': 'pl',
      'CS': 'cz', // checo
      'SK': 'sk', // eslovaco
      'HU': 'hu',
      'RO': 'ro', // rumano
      'BG': 'bg',
      'EL': 'gr', // griego
      'UK': 'ua',
      'RU': 'ru', // ruso
      'HR': 'hr', // croata
      'SR': 'rs', // serbio
      'JA': 'jp',
      'ZH': 'cn', // chino
      'KO': 'kr',
      'HI': 'in', // hindi
      'TH': 'th', // tailandés
      'VI': 'vn', // vietnamita
      'ID': 'id', // indonesio
      'MS': 'my', // malayo
      'AR': 'sa', // árabe
      'HE': 'il', // hebreo
      'FA': 'ir', // persa
      'TR': 'tr', // turco
      'CA': 'es-ct', // catalán
      'EU': 'es-pv', // eskera
      'GL': 'es-ga', // gallego
    }; // ampliar según se vayan necesitando

    return flags[upperCode] || '';
  }
