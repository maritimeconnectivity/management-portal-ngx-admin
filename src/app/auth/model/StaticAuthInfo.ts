import { AuthUser } from "./AuthUser";

export interface StaticAuthInfo {
    loggedIn?: boolean,
	logoutUrl?:string,
	permission?: any,
	orgMrn?: string,
	user?: AuthUser
	authz?: any
}