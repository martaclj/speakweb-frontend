// interface para los usuarios eliminados -> se guardan en sistema de logs
export interface DeletedUser {
    logId: number; // id en logs
    originalUserId: number; // id que ocupaba usuario antes de borrar
    name: string;
    surname: string;
    email: string; 
    role: string;
    avatarUrl?: string;
    bio?: string;
    deletedAt: string; // fecha borrado
}
