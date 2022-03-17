import { User } from "../../backend-api/identity-registry/model/user";

export interface AuthUser extends User {
    organization: string;
    preferredUsername: string;
    keycloakPermissions: string;
}