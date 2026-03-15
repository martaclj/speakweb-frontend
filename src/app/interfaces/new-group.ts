// interface de creación de group
export interface NewGroup {
    name: string;
    description?: string;
    language1Id: number;
    language2Id: number;
    imageUrl?: string;
}
