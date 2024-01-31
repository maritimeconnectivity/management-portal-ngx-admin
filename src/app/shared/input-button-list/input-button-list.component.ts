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

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'ngx-input-button-list',
  templateUrl: './input-button-list.component.html',
  styleUrls: ['./input-button-list.component.scss']
})
export class InputButtonListComponent implements OnInit {
  @Input() items: string[];
  @Input() isEditing: boolean;
  @Input() fieldName: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() options: object[];

  @Output() onUpdate = new EventEmitter<any>();

  @ViewChild('stringInput') stringInput;
  @ViewChild('selectInput') selectInput;

  constructor(private iconsLibrary: NbIconLibraries) { 
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
  }

  onAddItem = (item: any) => {
    if (item && item.length > 0 && this.items.indexOf(item) < 0) {
      this.items.push(item);
      this.cleanInput();
    }
    this.update();
  }

  cleanInput = () => {
    if (this.selectInput) {
      this.selectInput.reset();
    }
    if (this.stringInput) {
      this.stringInput.nativeElement.value = '';
    }
  }

  forceFocusIn = () => {
    if (this.selectInput) {
      this.selectInput.nativeElement.focus();
    }
    if (this.stringInput) {
      this.stringInput.nativeElement.focus();
    }
  }

  onRemoveItem = (event: any) => {
    if (event.pointerType === 'mouse' && event.target.value) {
      const index = this.items.indexOf(event.target.value, 0);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      this.update();
    }
  }

  onFocusOut = (event: any) => {
    if (event.target.value.length > 0 && event.relatedTarget) {
      alert('Please press Enter key to register the value or erase it');
      this.forceFocusIn();
    }
  }

  update = () => {
    this.onUpdate.emit({ data: this.items, fieldName: this.fieldName });
  }
}
