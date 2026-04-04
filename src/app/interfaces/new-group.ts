// interface de creación de group --> backend
export interface NewGroup {
    name: string;
    description?: string;
    language1Id: number;
    language2Id: number;
    imageUrl?: string;
}
