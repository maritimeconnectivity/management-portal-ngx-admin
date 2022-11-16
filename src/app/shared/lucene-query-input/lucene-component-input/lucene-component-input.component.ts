import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryFieldInfo } from '../model/queryFieldInfo';

@Component({
  selector: 'ngx-lucene-component-input',
  templateUrl: './lucene-component-input.component.html',
  styleUrls: ['./lucene-component-input.component.scss']
})
export class LuceneComponentInputComponent implements OnInit {
  options: string[];
  filteredOptions$: Observable<string[]>;

  @ViewChild('autoInput') input;

  @Input() fieldInfo: QueryFieldInfo[];
  @Output() onCreate = new EventEmitter<any>();

  ngOnInit() {
    this.options = this.fieldInfo?.map(e => e.name);
    this.filteredOptions$ = of(this.options);
  }

  private filter(value: string): string {
    if (value.length === 0) {
      return undefined;
    }
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase() === filterValue).pop();
  }

  onChange(event) {
    const value = this.filter(event);
    if (value) {
      this.onCreate.emit(value);
    }
  }

  onSelectionChange(event) {
    const value = this.filter(event);
    if (value) {
      this.onCreate.emit(value);
    }
    this.input.nativeElement.value = '';
  }
}
