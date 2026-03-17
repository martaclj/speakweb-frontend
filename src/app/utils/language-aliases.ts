// función para las banderas de los idiomas
export function getFlagEmoji(code: string): string {
    if (!code) return '🌏';

    const upperCode = code.toUpperCase();

    const flags: { [key: string]: string } = {
      'ES': '🇪🇸',
      'EN': '🇬🇧',
      'FR': '🇫🇷',
      'DE': '🇩🇪',
      'IT': '🇮🇹',
      'PT': '🇵🇹',
      'JA': '🇯🇵'
    }; // ampliar según se vayan necesitando

    return flags[upperCode] || '🌏';
  }

export const LANGUAGE_ALIASES: { [key: string]: string[] } = {
//alias de traducciones y variantes para la búsqueda por idiomas
    // Inglés
    'ingles': ['inglés', 'ingles', 'english', 'en'],
    'inglés': ['inglés', 'ingles', 'english', 'en'],
    'english': ['inglés', 'ingles', 'english', 'en'],
    'en': ['inglés', 'ingles', 'english', 'en'],

    // Español
    'español': ['español', 'espanol', 'spanish', 'es'],
    'espanol': ['español', 'espanol', 'spanish', 'es'],
    'spanish': ['español', 'espanol', 'spanish', 'es'],
    'es': ['español', 'espanol', 'spanish', 'es'],

    // Alemán
    'alemán': ['alemán', 'aleman', 'deutsch', 'german', 'de'],
    'aleman': ['alemán', 'aleman', 'deutsch', 'german', 'de'],
    'deutsch': ['alemán', 'aleman', 'deutsch', 'german', 'de'],
    'german': ['alemán', 'aleman', 'deutsch', 'german', 'de'],
    'de': ['alemán', 'aleman', 'deutsch', 'german', 'de'],

    // Francés
    'francés': ['francés', 'frances', 'français', 'francais', 'french', 'fr'],
    'frances': ['francés', 'frances', 'français', 'francais', 'french', 'fr'],
    'français': ['francés', 'frances', 'français', 'francais', 'french', 'fr'],
    'francais': ['francés', 'frances', 'français', 'francais', 'french', 'fr'],
    'french': ['francés', 'frances', 'français', 'francais', 'french', 'fr'],
    'fr': ['francés', 'frances', 'français', 'francais', 'french', 'fr'],

    // Italiano
    'italiano': ['italiano', 'italian', 'it'],
    'italian': ['italiano', 'italian', 'it'],
    'it': ['italiano', 'italian', 'it']
  };