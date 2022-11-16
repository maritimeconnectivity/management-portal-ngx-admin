export enum InstanceStatus { Provisional = 0, Released = 1, Deprecated = 2, Deleted = 3 };
export interface ServiceInstance {
    name: string;
    mrn: string;
    version: string;
    keywords: string;
    coverageArea: string;
    status: InstanceStatus;
    implementsDesignMRN: string;
    implementsDesignVersion: string;
    msrName: string;
    msrUrl: string;
}