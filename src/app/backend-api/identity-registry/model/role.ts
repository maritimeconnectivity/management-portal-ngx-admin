/**
 * Maritime Connectivity Platform Identity Registry API
 * The MCP Identity Registry API can be used for managing entities in the Maritime Connectivity Platform.<br>Two versions of the API are available - one that requires authentication using OpenID Connect and one that requires authentication using a X.509 client certificate.<br>The OpenAPI descriptions for the two versions are available <a href=\"https://test-api.maritimeconnectivity.net/v3/api-docs/mcp-idreg-oidc\">here</a> and <a href=\"https://test-api-x509.maritimeconnectivity.net/v3/api-docs/mcp-idreg-x509\">here</a>.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: info@maritimeconnectivity.net
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { Entity } from "./entity";

/**
 * Model object representing a role
 */
export interface Role extends Entity{
    /**
     * The role that should be mapped to the permission
     */
    roleName: Role.RoleNameEnum;
    /**
     * The permission that should be mapped to the role
     */
    permission: string;
    idOrganization?: number;
}
export namespace Role {
    export enum RoleNameEnum{
        SITEADMIN = 'ROLE_SITE_ADMIN',
        ORGADMIN = 'ROLE_ORG_ADMIN',
        USER = 'ROLE_USER',
        ENTITYADMIN = 'ROLE_ENTITY_ADMIN',
        USERADMIN = 'ROLE_USER_ADMIN',
        VESSELADMIN = 'ROLE_VESSEL_ADMIN',
        SERVICEADMIN = 'ROLE_SERVICE_ADMIN',
        APPROVEORG = 'ROLE_APPROVE_ORG',
        DEVICEADMIN = 'ROLE_DEVICE_ADMIN',
        MMSADMIN = 'ROLE_MMS_ADMIN',
    };
}