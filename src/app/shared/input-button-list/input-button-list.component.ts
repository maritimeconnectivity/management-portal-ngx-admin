import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private iconsLibrary: NbIconLibraries) { 
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
  }

  onAddItem = (event: any) => {
    if (this.items.indexOf(event) < 0) {
      this.items.push(event);
    }

    console.log("Clean the input!")
  }

  onRemoveItem = (event: any) => {
    const index = this.items.indexOf(event, 0);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}
