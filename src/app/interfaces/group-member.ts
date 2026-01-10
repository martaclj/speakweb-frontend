import { Group } from "./group";
import { User } from "./user";

export interface GroupMember {
    id: number;
    group: Group;
    expert: boolean;
    user: User;
}
