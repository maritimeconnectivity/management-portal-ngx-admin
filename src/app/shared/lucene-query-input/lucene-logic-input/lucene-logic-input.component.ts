import { LogicalOperator } from '../model/localOperator';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LuceneComponent } from '../model/lucene-component';

@Component({
  selector: 'ngx-lucene-logic-input',
  templateUrl: './lucene-logic-input.component.html',
  styleUrls: ['./lucene-logic-input.component.scss']
})
export class LuceneLogicInputComponent implements LuceneComponent {
  @Input() id: string;
  @Input() data: object = {operator: LogicalOperator.And};
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  onSelectionChange(event): void {
    this.data = {operator: event};
    this.onUpdate.emit({id: this.id, data: this.data});
  }
}
