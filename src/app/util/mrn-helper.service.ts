import { AuthService } from './../auth/auth.service';
import { MenuType, MenuTypeNames } from "../shared/models/menuType";
import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";

@Injectable({
  providedIn: "root",
})
export class MrnHelperService {
  private idpNamespace = AppConfig.IDP_NAMESPACE;
  public mrnMCP: string = "urn:mrn:mcp:";

  constructor(private authService: AuthService) {
  }

  public shortIdFromMrn(mrn: string) {
    let split = mrn.split(":");
    return split[split.length - 1];
  }

  private mrnPreFix(): string {
    return this.mrnPreFixForOrg(this.authService.authState.orgMrn);
  }

  private mrnPreFixForOrg(orgMrn: string): string {
    let orgSplit = orgMrn.split(":org:");
    return orgSplit[0] + ":";
  }

  public orgShortId(): string {
    return this.shortIdFromMrn(this.authService.authState.orgMrn);
  }

  public mrnMcpIdpRegexForOrg(): string {
    return (
      "urn:mrn:mcp:(device|org|user|vessel|service|mms):" +
      this.idpNamespace +
      ":((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|)*)$"
    );
  }

  public mrnRegex(): string {
    return "urn:mrn:([a-z0-9]([a-z0-9]|-){0,20}[a-z0-9]):([a-z0-9][-a-z0-9]{0,20}[a-z0-9]):((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|)*)((?+((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)||?)*))?(?=((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)||?)*))?)?(#(((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)||?)*))?$";
  }

  public mrnMcpIdpRegex(): string {
    return (
      "urn:mrn:mcp:(device|org|user|vessel|service|mms):" +
      this.idpNamespace +
      ":" +
      this.orgShortId() +
      "((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|)*)$"
    );
  }

  public mrnMask(menuType: string) {
    switch (menuType) {
      case MenuTypeNames.device:
        return this.mrnMaskForDevice();
      case MenuTypeNames.user:
        return this.mrnMaskForUser();
      case MenuTypeNames.organization:
        return this.mrnMaskForOrganization();
      case MenuTypeNames.vessel:
        return this.mrnMaskForVessel();
      case MenuTypeNames.instance:
        return this.mrnMaskForInstance();
      case MenuTypeNames.service:
        return this.mrnMaskForInstance();
      case MenuTypeNames.mms:
        return this.mrnMaskForMms();
      default:
        return this.mrnMaskForOrganization();
    }
  }

  public mrnPattern(): string {
    return "^((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|/)*)$";
  }
  public mrnPatternError(): string {
    return "It should contain at least 3 characters and only a-z 0-9 + , / ~ - . : = @ ; $ _ ! * '";
  }

  public mrnMaskForVessel(): string {
    return (
      this.mrnMCP +
      "vessel:" +
      this.idpNamespace +
      ":" +
      this.orgShortId() +
      ":"
    );
  }

  public mrnMaskForMms(): string {
    return (
      this.mrnMCP + "mms:" + this.idpNamespace + ":" + this.orgShortId() + ":"
    );
  }

  public mrnMaskForDevice(): string {
    return (
      this.mrnMCP +
      "device:" +
      this.idpNamespace +
      ":" +
      this.orgShortId() +
      ":"
    );
  }

  public mrnMaskForOrganization(): string {
    return this.mrnMCP + "org:" + this.idpNamespace + ":";
  }

  public mrnMaskForUserOfOrg(orgMrn: string): string {
    return (
      this.mrnPreFixForOrg(orgMrn) +
      "user:" +
      this.idpNamespace +
      ":" +
      this.shortIdFromMrn(orgMrn) +
      ":"
    );
  }

  public mrnMaskForUser(): string {
    return (
      this.mrnMCP + "user:" + this.idpNamespace + ":" + this.orgShortId() + ":"
    );
  }

  public mrnMaskForSpecification(): string {
    // TODO Temp check until mrn-service is ready
    return (
      this.mrnMCP +
      "service:" +
      this.idpNamespace +
      ":" +
      this.orgShortId() +
      ":specification:"
    );
    //return "urn:mrn:[mcp|stm]:service:specification:" + this.orgShortId() + ':';
  }

  public mrnMaskForDesign(): string {
    // TODO Temp check until mrn-service is ready
    return (
      this.mrnMCP +
      "service:" +
      this.idpNamespace +
      ":" +
      this.orgShortId() +
      ":design:"
    );
    //return "urn:mrn:[mcp|stm]:service:design:" + this.orgShortId() + ':';
  }

  public mrnMaskForInstance(): string {
    return (
      this.mrnMCP +
      "service:" +
      this.idpNamespace +
      ":" +
      this.orgShortId() +
      ":instance:"
    );
    //return this.mrnPreFix() + 'service:instance:' + this.orgShortId() + ':';
  }

  public mrnMaskTextForInstance(): string {
    // TODO Temp check until mrn-service is ready
    return (
      this.mrnMCP +
      "service:" +
      this.idpNamespace +
      ":" +
      this.orgShortId() +
      ":instance:"
    );
    //return "urn:mrn:[mcp|stm]:service:instance:" + this.orgShortId() + ':';
  }

  public checkMrnForSpecification(specificationMrn: string): boolean {
    // TODO Temp check until mrn-service is ready
    let rawRegex = `^${this.mrnMaskForSpecification()}((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|\/)*)$`;
    console.log(rawRegex);
    let regex = new RegExp(rawRegex);
    return regex.test(specificationMrn);
    //return specificationMrn.indexOf(':service:specification:' + this.orgShortId() + ':') >= 0 && specificationMrn.startsWith('urn:mrn:');
    //return this.checkMrn(specificationMrn, this.mrnMaskForSpecification());
  }

  public checkMrnForDesign(designMrn: string): boolean {
    // TODO Temp check until mrn-service is ready
    let rawRegex = `^${this.mrnMaskForDesign()}((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|\/)*)$`;
    let regex = new RegExp(rawRegex);
    return regex.test(designMrn);
    //return designMrn.indexOf(':service:design:' + this.orgShortId() + ':') >= 0 && designMrn.startsWith('urn:mrn:');
    //	return this.checkMrn(designMrn, this.mrnMaskForDesign());
  }

  public checkMrnForInstance(instanceMrn: string): boolean {
    // TODO Temp check until mrn-service is ready
    let rawRegex = `^${this.mrnMaskForInstance()}((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|\/)*)$`;
    let regex = new RegExp(rawRegex, "g");
    return regex.test(instanceMrn);
    //return instanceMrn.indexOf(':service:instance:' + this.orgShortId() + ':') >= 0 && instanceMrn.startsWith('urn:mrn:');
    //return this.checkMrn(instanceMrn, this.mrnMaskForInstance());
  }

  public checkMrn(mrn: string, validMrnMask: string): boolean {
    try {
      let elementIdIndex = mrn.indexOf(validMrnMask);
      if (elementIdIndex < 0) {
        return false;
      }
      var valid = true;
      let idSplit = mrn.substring(elementIdIndex).split(":");
      idSplit.forEach((idElement) => {
        if (!idElement.toLowerCase().match(this.mrnPattern())) {
          valid = false;
        }
      });

      return valid;
    } catch (error) {
      return false;
    }
  }
}
