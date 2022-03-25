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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { InstanceDto } from '../model/instanceDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SearchControllerService {

    protected basePath = 'https://msr-test.maritimeconnectivity.net';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * searchInstances
     * 
     * @param geometry geometry
     * @param geometryWKT geometryWKT
     * @param globalSearch globalSearch
     * @param queryString queryString
     * @param offset 
     * @param paged 
     * @param pageNumber 
     * @param pageSize 
     * @param sortSorted 
     * @param sortUnsorted 
     * @param unpaged 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public searchInstancesUsingGET(geometry: string, geometryWKT: string, globalSearch: boolean, queryString: string, offset?: number, paged?: boolean, pageNumber?: number, pageSize?: number, sortSorted?: boolean, sortUnsorted?: boolean, unpaged?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<InstanceDto>>;
    public searchInstancesUsingGET(geometry: string, geometryWKT: string, globalSearch: boolean, queryString: string, offset?: number, paged?: boolean, pageNumber?: number, pageSize?: number, sortSorted?: boolean, sortUnsorted?: boolean, unpaged?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<InstanceDto>>>;
    public searchInstancesUsingGET(geometry: string, geometryWKT: string, globalSearch: boolean, queryString: string, offset?: number, paged?: boolean, pageNumber?: number, pageSize?: number, sortSorted?: boolean, sortUnsorted?: boolean, unpaged?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<InstanceDto>>>;
    public searchInstancesUsingGET(geometry: string, geometryWKT: string, globalSearch: boolean, queryString: string, offset?: number, paged?: boolean, pageNumber?: number, pageSize?: number, sortSorted?: boolean, sortUnsorted?: boolean, unpaged?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (geometry === null || geometry === undefined) {
            throw new Error('Required parameter geometry was null or undefined when calling searchInstancesUsingGET.');
        }

        if (geometryWKT === null || geometryWKT === undefined) {
            throw new Error('Required parameter geometryWKT was null or undefined when calling searchInstancesUsingGET.');
        }

        if (globalSearch === null || globalSearch === undefined) {
            throw new Error('Required parameter globalSearch was null or undefined when calling searchInstancesUsingGET.');
        }

        if (queryString === null || queryString === undefined) {
            throw new Error('Required parameter queryString was null or undefined when calling searchInstancesUsingGET.');
        }








        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (geometry !== undefined && geometry !== null) {
            queryParameters = queryParameters.set('geometry', <any>geometry);
        }
        if (geometryWKT !== undefined && geometryWKT !== null) {
            queryParameters = queryParameters.set('geometryWKT', <any>geometryWKT);
        }
        if (globalSearch !== undefined && globalSearch !== null) {
            queryParameters = queryParameters.set('globalSearch', <any>globalSearch);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (paged !== undefined && paged !== null) {
            queryParameters = queryParameters.set('paged', <any>paged);
        }
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (queryString !== undefined && queryString !== null) {
            queryParameters = queryParameters.set('queryString', <any>queryString);
        }
        if (sortSorted !== undefined && sortSorted !== null) {
            queryParameters = queryParameters.set('sort.sorted', <any>sortSorted);
        }
        if (sortUnsorted !== undefined && sortUnsorted !== null) {
            queryParameters = queryParameters.set('sort.unsorted', <any>sortUnsorted);
        }
        if (unpaged !== undefined && unpaged !== null) {
            queryParameters = queryParameters.set('unpaged', <any>unpaged);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<InstanceDto>>(`${this.basePath}/api/_search/instances`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
