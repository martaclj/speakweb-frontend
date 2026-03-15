export interface DeletedUser {
    logId: number;
    originalUserId: number;
    name: string;
    surname: string;
    email: string; 
    role: string;
    avatarUrl?: string;
    bio?: string;
    deletedAt: string;
}
