import { Language } from "./language";

export interface UserLanguage {
    id: number;
    language: Language;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    type: 'NATIVE' | 'LEARNER';
}
