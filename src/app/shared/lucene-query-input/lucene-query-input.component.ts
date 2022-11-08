import { LuceneLogicInputComponent } from './lucene-logic-input/lucene-logic-input.component';
import { LuceneComponentItem } from './lucene-component-item';
import { LuceneSingleQueryInputComponent } from './lucene-single-query-input/lucene-single-query-input.component';
import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { LuceneComponent } from './model/lucene-component';
import { LuceneComponentDirective } from './lucene-component-directive';
import { fieldInfo, LogicalOperator } from './model/localOperator';
import {v4 as uuidv4} from 'uuid';
import { buildQuery } from './query-builder/query-builder';

@Component({
  selector: 'ngx-lucene-query-input',
  templateUrl: './lucene-query-input.component.html',
  styleUrls: ['./lucene-query-input.component.scss']
})
export class LuceneQueryInputComponent implements OnInit {
  group: LuceneComponentItem[] = [new LuceneComponentItem(LuceneSingleQueryInputComponent, uuidv4(), {})];
  data: object[] = [{}];

  @Output() onUpdateQuery = new EventEmitter<any>();
  @ViewChild(LuceneComponentDirective, {static: true}) luceneComponentHost!: LuceneComponentDirective;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  loadComponent() {
    const viewContainerRef = this.luceneComponentHost.viewContainerRef;
    viewContainerRef.clear();

    this.group.forEach((component, index) => {
      const factory: ComponentFactory<LuceneComponent> = this.resolver.resolveComponentFactory(component.component);
      const componentRef = viewContainerRef.createComponent<LuceneComponent>(factory);
      componentRef.instance.id = component.id;
      componentRef.instance.data = component.data;
      componentRef.instance.onUpdate.subscribe(value => this.onEditQuery(value.id, value.data));
      componentRef.instance.onDelete.subscribe(id => this.onDeleteById(id));
    });
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  onDeleteById(id: string) {
    const element = this.group.filter(e => e.id === id).pop();
    if (element) {
      const index = this.group.indexOf(element);
      if (index === 0) {
        if (this.group.length === 1) {
          this.group.splice(0, 1);
        } else {
          this.group.splice(0, 2);
        }
      } else {
        this.group.splice(index - 1, 2);
      }
    }
    this.loadComponent();
    this.exportQuery();
  }

  exportQuery() {
    const dataArray = this.group.map(e => e.data);
    const queryString = buildQuery(dataArray);

    // flattening data array for SearchParameters
    let data = {};
    dataArray.forEach(e => {
      if (Object.keys(e).length &&
        Object.keys(e).pop() !== 'operator' &&
        e[Object.keys(e).pop()].length) {
          data[Object.keys(e).pop()] = e[Object.keys(e).pop()];
        }
      });
    this.onUpdateQuery.emit({queryString, data});
  }

  onEditQuery(componentId: string, data: object): void {
    this.group = this.group.map(e => e.id === componentId ? {...e, data: data} : e);
    this.exportQuery();
  }

  onCreate(value: any): void {
    if (this.group.length > 0) {
      this.group.push(new LuceneComponentItem(LuceneLogicInputComponent, uuidv4(), {'operator': LogicalOperator.And}));
    }
    this.group.push(new LuceneComponentItem(LuceneSingleQueryInputComponent, uuidv4(),
    {[fieldInfo.filter(e=> e.name === value).pop()?.value]: ''}));
    this.loadComponent();
  }

}
