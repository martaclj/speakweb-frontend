// interface relación usuario-grupo (estado de experto)
import { Group } from "./group";
import { User } from "./user";

export interface GroupMember {
    id: number;
    group: Group;
    expert: boolean; // true si es nativo 
    // o nivel C1/C2 de los 2 idiomas grupo
    user: User;
}
