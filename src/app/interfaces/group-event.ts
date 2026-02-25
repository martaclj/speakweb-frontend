import { Group } from "./group";
import { User } from "./user";

// interface de lectura de Evento
export interface GroupEvent {
    id: number;
    title: string;
    description: string;
    startTime: string;
    imageUrl?: string;
    group: Group;
    creator: User;
    type: 'ONLINE' | 'PRESENTIAL'; // Obligatorio
    location?: string; // Opcional (solo si presencial)
    externalLink?: string; // Opcional (solo si online)
}
