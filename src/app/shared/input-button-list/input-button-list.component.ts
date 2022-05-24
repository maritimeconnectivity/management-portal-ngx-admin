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

  onAddItem = (event: any) => {
    if (event && event.length > 0 && this.items.indexOf(event) < 0) {
      this.items.push(event);
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
    if (event.length > 0) {
      alert('Please press Enter key to register the value');
    }
  }

  update = () => {
    this.onUpdate.emit({ data: this.items, fieldName: this.fieldName });
  }
}
