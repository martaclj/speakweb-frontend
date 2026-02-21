import { Group } from "./group";

// interface de lectura de Evento
export interface GroupEvent {
    id: number;
    title: string;
    description: string;
    startTime: string;
    imageUrl?: string;
    group: Group;
    type: 'ONLINE' | 'PRESENTIAL'; // Obligatorio
    location?: string; // Opcional (solo si presencial)
    externalLink?: string; // Opcional (solo si online)
}
