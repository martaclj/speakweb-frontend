import { Language } from "./language";

export interface Group {
    id: number;
    name: string;
    description?: string;
    imageUrl: string;
    language1: Language;
    language2: Language;
}