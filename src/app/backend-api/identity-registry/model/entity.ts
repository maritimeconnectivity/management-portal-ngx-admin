import { Certificate } from "./certificate";
import { Resource } from "./resource";

export interface Entity extends Resource{
     /**
     * The set of certificates of the entity. Cannot be created/updated by editing in the model. Use the dedicated create and revoke calls.
     */
    readonly certificates?: Array<Certificate>;
}