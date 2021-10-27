import { Vessel } from "./vessel";

export class Service{
    id: number;
    name: string;
    instanceVersion: string;
    mrn: string;
    createdAt: string;
    updatedAt: string;
    permissions: string;
    mrnSubsidiary: string;
    homeMMSUrl: string;
    oidcAccessType: string;
    oidcClientId: string;
    vessel: Vessel;
}