import { addLangs, loadLang } from './../../util/translateHelper';
import { TranslateService } from '@ngx-translate/core';
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

import { NotifierService } from 'angular-notifier';
import { AppConfig } from './../../app.config';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Info{
  title: string;
  version: string;
  provider: string;
  environmentName: string;
  contact: string;
}

/**
 * a component for showing overall information of relavant MCP components and Management Portal
 */
@Component({
  selector: 'ngx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  hasServiceRegistry = AppConfig.HAS_SERVICE_REGISTRY;
  ir = new Info();
  sr = new Info();
  mp = new Info();
  environmentName = AppConfig.ENVIRONMENT_NAME;

  constructor(private http: HttpClient,
    private notifierService: NotifierService,
    public translate: TranslateService,
    ) {
      addLangs(translate);
      loadLang(translate);
    }

  ngOnInit(): void {
    this.ir.title = 'Maritime Identity Registry';
    this.ir.contact = AppConfig.IR_CONTACT;
    this.ir.provider = AppConfig.IR_PROVIDER;
    this.fetchVersionFromSwaggerFile(AppConfig.IR_BASE_PATH + '/v3/api-docs', 'ir');

    this.mp.title = 'MCP Management Portal';
    this.mp.contact = AppConfig.MP_CONTACT;
    this.mp.provider = AppConfig.MP_PROVIDER;
    this.mp.version = AppConfig.MP_VERSION;

    if (this.hasServiceRegistry) {
      this.sr.title = 'Maritime Service Registry';
      this.sr.contact = AppConfig.SR_CONTACT;
      this.sr.provider = AppConfig.SR_PROVIDER;
      this.fetchVersionFromSwaggerFile(AppConfig.SR_BASE_PATH + '/v3/api-docs', 'sr');
    }
  }

  fetchVersionFromSwaggerFile(url: string, type: string){
    this.http.get(url).subscribe( 
      res => type === 'ir' ? this.ir.version = res['info']['version'] :
        type = 'sr' ? this.sr.version = res['info']['version'] :
        console.log(res),
      err => this.notifierService.notify('error', 'There was error in fetching information - ' + err.error.message),
    )
  }

}
