/**
 * Maritime Connectivity Platform Identity Registry API
 * The MCP Identity Registry API can be used for managing entities in the Maritime Connectivity Platform.<br>Two versions of the API are available - one that requires authentication using OpenID Connect and one that requires authentication using a X.509 client certificate.<br>The OpenAPI descriptions for the two versions are available <a href=\"https://test-api.maritimeconnectivity.net/v3/api-docs/mcp-idreg-oidc\">here</a> and <a href=\"https://test-api-x509.maritimeconnectivity.net/v3/api-docs/mcp-idreg-x509\">here</a>.
 *
 * OpenAPI spec version: 1.2.1
 * Contact: info@maritimeconnectivity.net
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { OrgMrnLogoBody } from '../model/orgMrnLogoBody';
import { OrgMrnLogoBody1 } from '../model/orgMrnLogoBody1';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class LogoControllerService {

    protected basePath = 'https://test-api.maritimeconnectivity.net';
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
     *
     * Create a new organization logo using POST
     * @param orgMrn
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createLogoPost(orgMrn: string, body?: OrgMrnLogoBody, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createLogoPost(orgMrn: string, body?: OrgMrnLogoBody, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createLogoPost(orgMrn: string, body?: OrgMrnLogoBody, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createLogoPost(orgMrn: string, body?: OrgMrnLogoBody, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling createLogoPost.');
        }


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'image/png',
            'image/jpeg'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/logo`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Delete an organization logo
     * @param orgMrn
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteLogo(orgMrn: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteLogo(orgMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteLogo(orgMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteLogo(orgMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling deleteLogo.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/logo`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Get the logo of the given organization
     * @param orgMrn
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getLogo(orgMrn: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getLogo(orgMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getLogo(orgMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getLogo(orgMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling getLogo.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'image/png',
            'application/json'
        ];
        // const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        // if (httpHeaderAcceptSelected != undefined) {
        //     headers = headers.set('Accept', httpHeaderAcceptSelected);
        // }
        headers = headers.set('Accept', httpHeaderAccepts.join());

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request('get',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/logo`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress,
                responseType: 'blob'
            }
        );
    }

    /**
     *
     * Update an existing organization logo or create it if none already exists
     * @param body
     * @param orgMrn
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateLogoPut(body: Array<string>, orgMrn: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateLogoPut(body: Array<string>, orgMrn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateLogoPut(body: Array<string>, orgMrn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateLogoPut(body: Array<string>, orgMrn: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateLogoPut.');
        }

        if (orgMrn === null || orgMrn === undefined) {
            throw new Error('Required parameter orgMrn was null or undefined when calling updateLogoPut.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'image/png',
            'image/jpeg'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/oidc/api/org/${encodeURIComponent(String(orgMrn))}/logo`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
