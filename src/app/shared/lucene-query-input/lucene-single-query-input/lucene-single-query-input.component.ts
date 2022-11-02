import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LuceneComponent } from '../model/lucene-component';

interface FieldInfo {
  name: string;
  value: string;
}

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
  @Output() onUpdate = new EventEmitter<any>();

  value: string;

  fieldInfo: FieldInfo[] = [
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Status',
      value: 'status',
    },
    {
      name: 'Version',
      value: 'version',
    },
    {
      name: 'Keywords',
      value: 'keywords',
    },
    {
      name: 'Description',
      value: 'description',
    },
    {
      name: 'Data product type',
      value: 'dataProductType',
    },
    {
      name: 'Specification ID',
      value: 'specificationId',
    },
    {
      name: 'Design ID',
      value: 'designId',
    },
    {
      name: 'Instance ID',
      value: 'instanceId',
    },
    {
      name: 'MMSI',
      value: 'mmsi',
    },
    {
      name: 'IMO number',
      value: 'imo',
    },
    {
      name: 'Service type',
      value: 'serviceType',
    },
    {
      name: 'UN/LOCODE',
      value: 'unlocode',
    },
    {
      name: 'Endpoint URI',
      value: 'endpointUri',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.selectedItem = this.getFilteredKey(this.data).pop();
    this.fieldValue = this.data[this.selectedItem] ? this.data[this.selectedItem] : '';
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
}
