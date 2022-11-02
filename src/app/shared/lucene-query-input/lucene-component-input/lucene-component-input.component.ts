import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { createOptions } from '../model/createOptions';

@Component({
  selector: 'ngx-lucene-component-input',
  templateUrl: './lucene-component-input.component.html',
  styleUrls: ['./lucene-component-input.component.scss']
})
export class LuceneComponentInputComponent implements OnInit {

  options: string[];
  filteredOptions$: Observable<string[]>;

  @ViewChild('autoInput') input;

  @Output() onCreate = new EventEmitter<any>();

  ngOnInit() {
    this.options = createOptions;
    this.filteredOptions$ = of(this.options);
  }

  private filter(value: string): string {
    if (value.length === 0) {
      return undefined;
    }
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue)).pop();
  }

  onChange(event) {
    this.onCreate.emit(this.filter(event));
  }

  onSelectionChange(event) {
    this.onCreate.emit(this.filter(event));
    this.input.nativeElement.value = '';
  }
}
