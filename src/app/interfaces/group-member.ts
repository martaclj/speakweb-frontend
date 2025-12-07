import { Group } from "./group";

export interface GroupMember {
    id: number;
    group: Group;
    isExpert: boolean;
}
