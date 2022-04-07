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

/**
 * Model object for representing a role that an agent is allowed to have
 */
export interface AllowedAgentRole { 
    /**
     * The time that the entity was created
     */
    readonly createdAt?: Date;
    /**
     * The time that the entity was last updated
     */
    readonly updatedAt?: Date;
    /**
     * The role that you want the agent to be allowed to have
     */
    roleName: AllowedAgentRole.RoleNameEnum;
}
export namespace AllowedAgentRole {
    export type RoleNameEnum = 'ROLE_ORG_ADMIN' | 'ROLE_ENTITY_ADMIN' | 'ROLE_USER_ADMIN' | 'ROLE_VESSEL_ADMIN' | 'ROLE_SERVICE_ADMIN' | 'ROLE_DEVICE_ADMIN' | 'ROLE_MMS_ADMIN' | 'ROLE_USER';
    export const RoleNameEnum = {
        ORGADMIN: 'ROLE_ORG_ADMIN' as RoleNameEnum,
        ENTITYADMIN: 'ROLE_ENTITY_ADMIN' as RoleNameEnum,
        USERADMIN: 'ROLE_USER_ADMIN' as RoleNameEnum,
        VESSELADMIN: 'ROLE_VESSEL_ADMIN' as RoleNameEnum,
        SERVICEADMIN: 'ROLE_SERVICE_ADMIN' as RoleNameEnum,
        DEVICEADMIN: 'ROLE_DEVICE_ADMIN' as RoleNameEnum,
        MMSADMIN: 'ROLE_MMS_ADMIN' as RoleNameEnum,
        USER: 'ROLE_USER' as RoleNameEnum
    };
}