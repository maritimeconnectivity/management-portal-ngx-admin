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
import { Certificate } from './certificate';
import { Entity } from './entity';
import { IdentityProviderAttribute } from './identityProviderAttribute';

/**
 * Model object representing an organization
 */
export interface Organization extends Entity{
    /**
     * The name of the organization
     */
    name: string;
    /**
     * Maritime Connectivity Platform Maritime Resource Name
     */
    mrn: string;
    /**
     * Subsidiary Maritime Resource Name
     */
    mrnSubsidiary?: string;
    /**
     * URL of the MMS that the organization is registered with
     */
    homeMMSUrl?: string;
    /**
     * The email of the organization
     */
    email: string;
    /**
     * The URL of the organization's website
     */
    url: string;
    /**
     * The address of the organization
     */
    address: string;
    /**
     * The country that the organization is located in
     */
    country: string;
    /**
     * Type of identity federation used by organization
     */
    federationType?: Organization.FederationTypeEnum;
    /**
     * The set of certificates of the organization. Cannot be created/updated by editing in the model. Use the dedicate create and revoke calls.
     */
    readonly certificates?: Array<Certificate>;
    /**
     * The identity provider attributes of the organization
     */
    identityProviderAttributes?: Array<IdentityProviderAttribute>;
}
export namespace Organization {
    export type FederationTypeEnum = 'test-idp' | 'own-idp' | 'external-idp';
    export const FederationTypeEnum = {
        TestIdp: 'test-idp' as FederationTypeEnum,
        OwnIdp: 'own-idp' as FederationTypeEnum,
        ExternalIdp: 'external-idp' as FederationTypeEnum
    };
}