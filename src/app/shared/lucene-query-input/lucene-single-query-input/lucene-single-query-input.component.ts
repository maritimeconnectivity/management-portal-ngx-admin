import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LuceneComponent } from '../model/lucene-component';
import { QueryFieldInfo } from '../model/queryFieldInfo';

@Component({
  selector: 'ngx-lucene-single-query-input',
  templateUrl: './lucene-single-query-input.component.html',
  styleUrls: ['./lucene-single-query-input.component.scss']
})

export class LuceneSingleQueryInputComponent implements OnInit, LuceneComponent {
  selectedItem: string;
  field: string;
  fieldValue: string = '';
  valueEditable: boolean = false;

  @Input() id: string;
  @Input() data: object;
  @Input() fieldInfo: QueryFieldInfo[];
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  value: string;

  constructor() {
  }

  ngOnInit(): void {
    this.applyData();
  }

  applyData() {
    if (this.fieldInfo) {
      this.selectedItem = this.getFilteredKey(this.data).pop();
      this.field = this.selectedItem;
      this.fieldValue = this.data[this.selectedItem] ? this.data[this.selectedItem] : '';
    }
  }

  getFilteredKey(data: object) {
    const array1 = Object.keys(data);
    const array2 = this.fieldInfo.map(e => e.value);
    return array1.filter(value => array2.includes(value));
  }

  onEdit(value: string): void {
    if (this.field) {
      this.data = {[this.field]: value};
      this.fieldValue = value;
      this.onUpdate.emit({id: this.id, data: this.data});
    }
  }

  onSelectedChange(value: any): void {
    this.field = value;
    this.valueEditable = true;
    this.data = {[this.field]: this.fieldValue};
    this.onUpdate.emit({id: this.id, data: this.data});
  }

  delete(): void {
    this.onDelete.emit(this.id);
  }
}
