import { LuceneLogicInputComponent } from './lucene-logic-input/lucene-logic-input.component';
import { LuceneComponentItem } from './lucene-component-item';
import { LuceneSingleQueryInputComponent } from './lucene-single-query-input/lucene-single-query-input.component';
import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
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
    });
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  onEditQuery(componentId: string, data: object): void {
    this.group = this.group.map(e => e.id === componentId ? {...e, data: data} : e);
    console.log(buildQuery(this.group.map(e => e.data)));
    /*
    const key = Object.keys(data).pop();
    this.data = this.group.map(e => Object.keys(e.data).includes(key) ? {key: data[key]} : e.data);
    console.log(data);
    */
  }

  onCreate(value: any): void {
    this.group.push(new LuceneComponentItem(LuceneLogicInputComponent, uuidv4(), {'operator': LogicalOperator.And}));
    this.group.push(new LuceneComponentItem(LuceneSingleQueryInputComponent, uuidv4(),
    {[fieldInfo.filter(e=> e.name === value).pop()?.value]: ''}));
    this.loadComponent();
  }

}
