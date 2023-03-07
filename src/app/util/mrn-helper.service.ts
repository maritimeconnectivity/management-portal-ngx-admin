/*
 * Copyright (c) 2023 Maritime Connectivity Platform Consortium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AuthService } from './../auth/auth.service';
import { ResourceType } from "../shared/models/menuType";
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
    const split = mrn.split(":");
    return split[split.length - 1];
  }

  private mrnPreFix(): string {
    return this.mrnPreFixForOrg(this.authService.authState.orgMrn);
  }

  private mrnPreFixForOrg(orgMrn: string): string {
    const orgSplit = orgMrn.split(":org:");
    return orgSplit[0] + ":";
  }

  public orgShortId(): string {
    return this.authService.authState.orgMrn ?
    this.shortIdFromMrn(this.authService.authState.orgMrn) :
    undefined;
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

  public mrnMcpIdpRegex(orgShortId?: string): string {
    return (
      "urn:mrn:mcp:(device|org|user|vessel|service|mms):" +
      this.idpNamespace +
      ":" +
      (orgShortId ? orgShortId : this.orgShortId()) +
      "((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|)*)$"
    );
  }

  public mrnMask(menuType: string, orgShortId? : string) {
    switch (menuType) {
      case ResourceType.Device:
        return this.mrnMaskForDevice(orgShortId);
      case ResourceType.User:
        return this.mrnMaskForUser(orgShortId);
      case ResourceType.Organization:
        return this.mrnMaskForOrganization();
      case ResourceType.Vessel:
        return this.mrnMaskForVessel(orgShortId);
      case ResourceType.Instance:
        return this.mrnMaskForInstance(orgShortId);
      case ResourceType.Design:
        return this.mrnMaskForDesign(orgShortId);
      case ResourceType.Service:
        return this.mrnMaskForInstance(orgShortId);
      case ResourceType.MMS:
        return this.mrnMaskForMms(orgShortId);
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

  public mrnMaskForVessel(orgShortId?: string): string {
    return (
      this.mrnMCP +
      "vessel:" +
      this.idpNamespace +
      ":" +
      (orgShortId ? orgShortId : this.orgShortId()) +
      ":"
    );
  }

  public mrnMaskForMms(orgShortId?: string): string {
    return (
      this.mrnMCP + "mms:" + this.idpNamespace + ":" + (orgShortId ? orgShortId : this.orgShortId()) + ":"
    );
  }

  public mrnMaskForDevice(orgShortId?: string): string {
    return (
      this.mrnMCP +
      "device:" +
      this.idpNamespace +
      ":" +
      (orgShortId ? orgShortId : this.orgShortId()) +
      ":"
    );
  }

  public mrnMaskForOrganization(): string {
    return this.mrnMCP + "org:" + this.idpNamespace + ":";
  }

  public mrnMaskForUserOfOrg(orgMrn: string): string {
    return (
      this.mrnMCP +
      "user:" +
      this.idpNamespace +
      ":" +
      this.shortIdFromMrn(orgMrn) +
      ":"
    );
  }

  public mrnMaskForUser(orgShortId?: string): string {
    return (
      this.mrnMCP + "user:" + this.idpNamespace + ":" + (orgShortId ? orgShortId : this.orgShortId()) + ":"
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

  public mrnMaskForInstance(orgShortId?: string): string {
    return (
      this.mrnMCP +
      "service:" +
      this.idpNamespace +
      ":" +
      (orgShortId ? orgShortId : this.orgShortId()) +
      ":instance:"
    );
  }

  public mrnMaskForDesign(orgShortId?: string): string {
    return (
      this.mrnMCP +
      "service:" +
      this.idpNamespace +
      ":" +
      (orgShortId ? orgShortId : this.orgShortId()) +
      ":design:"
    );
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
    const rawRegex = `^${this.mrnMaskForSpecification()}((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|\/)*)$`;
    const regex = new RegExp(rawRegex);
    return regex.test(specificationMrn);
    //return specificationMrn.indexOf(':service:specification:' + this.orgShortId() + ':') >= 0 && specificationMrn.startsWith('urn:mrn:');
    //return this.checkMrn(specificationMrn, this.mrnMaskForSpecification());
  }

  public checkMrnForDesign(designMrn: string): boolean {
    // TODO Temp check until mrn-service is ready
    const rawRegex = `^${this.mrnMaskForDesign()}((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|\/)*)$`;
    const regex = new RegExp(rawRegex);
    return regex.test(designMrn);
    //return designMrn.indexOf(':service:design:' + this.orgShortId() + ':') >= 0 && designMrn.startsWith('urn:mrn:');
    //	return this.checkMrn(designMrn, this.mrnMaskForDesign());
  }

  public checkMrnForInstance(instanceMrn: string): boolean {
    // TODO Temp check until mrn-service is ready
    const rawRegex = `^${this.mrnMaskForInstance()}((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)((([-._a-z0-9]|~)|%[0-9a-f][0-9a-f]|([!$&'()*+,;=])|:|@)|\/)*)$`;
    const regex = new RegExp(rawRegex, "g");
    return regex.test(instanceMrn);
    //return instanceMrn.indexOf(':service:instance:' + this.orgShortId() + ':') >= 0 && instanceMrn.startsWith('urn:mrn:');
    //return this.checkMrn(instanceMrn, this.mrnMaskForInstance());
  }

  public checkMrn(mrn: string, validMrnMask: string): boolean {
    try {
      const elementIdIndex = mrn.indexOf(validMrnMask);
      if (elementIdIndex < 0) {
        return false;
      }
      var valid = true;
      const idSplit = mrn.substring(elementIdIndex).split(":");
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
