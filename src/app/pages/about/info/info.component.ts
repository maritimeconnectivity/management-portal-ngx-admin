import { addLangs, loadLang } from './../../../util/translateHelper';
/*
 * Copyright (c) 2024 Maritime Connectivity Platform Consortium
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

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * a component for showing information of an MCP components or Management Portal
 */
@Component({
  selector: 'ngx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input() title: string;
  @Input() version: string;
  @Input() environmentName: string;
  @Input() provider: string;
  @Input() contact: string;

  constructor(private http: HttpClient,
    public translate: TranslateService,
    ) {
      addLangs(translate);
      loadLang(translate);
    }

  ngOnInit(): void {
  }
}
