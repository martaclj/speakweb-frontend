// interface de creación de evento
export interface NewEvent {
    title: string;
    description: string;
    startTime: string;
    location: string;
    imageUrl?: string;
    externalLink?: string;
    groupId: number;
}
