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
