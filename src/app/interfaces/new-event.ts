// interface de creación de evento
export interface NewEvent {
    title: string;
    description: string;
    startTime: string;
    groupId: number;
    imageUrl?: string;
    type: 'ONLINE' | 'PRESENTIAL'; // Obligatorio
    location?: string; // Opcional (solo si presencial)
    externalLink?: string; // Opcional (solo si online)
}
