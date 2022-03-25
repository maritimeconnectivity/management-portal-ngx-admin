/**
 * Maritime Connectivity Platform Service Registry API
 * Maritime Connectivity Platform Service Registry, developed by the MCC MSR WG
 *
 * OpenAPI spec version: 0.1
 * Contact: info@maritimeconnectivity.net
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { DtColumn } from './dtColumn';
import { DtOrder } from './dtOrder';
import { DtSearch } from './dtSearch';


export interface DtPagingRequest { 
    columns?: Array<DtColumn>;
    draw?: number;
    length?: number;
    order?: Array<DtOrder>;
    search?: DtSearch;
    start?: number;
}
