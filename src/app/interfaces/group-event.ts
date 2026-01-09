import { Group } from "./group";

// interface de lectura de Evento
export interface GroupEvent {
    id: number;
    title: string;
    description: string;
    startTime: string;
    location: string;
    externalLink?: string;
    imageUrl?: string;
    group: Group;
}
