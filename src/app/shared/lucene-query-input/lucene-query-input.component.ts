import { LuceneLogicInputComponent } from './lucene-logic-input/lucene-logic-input.component';
import { LuceneComponentItem } from './lucene-component-item';
import { LuceneSingleQueryInputComponent } from './lucene-single-query-input/lucene-single-query-input.component';
import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LuceneComponent } from './model/lucene-component';
import { LuceneComponentDirective } from './lucene-component-directive';
import { createOptions, CreateOptions } from './model/createOptions';
import {v4 as uuidv4} from 'uuid';
import _ from "lucene-query-string-builder";

@Component({
  selector: 'ngx-lucene-query-input',
  templateUrl: './lucene-query-input.component.html',
  styleUrls: ['./lucene-query-input.component.scss']
})
export class LuceneQueryInputComponent implements OnInit {
  group: LuceneComponentItem[] = [new LuceneComponentItem(LuceneSingleQueryInputComponent, uuidv4(), {})];
  data: object[] = [{}];
  fields: string[];

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
    console.log(this.buildQuery());
    /*
    const key = Object.keys(data).pop();
    this.data = this.group.map(e => Object.keys(e.data).includes(key) ? {key: data[key]} : e.data);
    console.log(data);
    */
  }

  andString = _.builder(function(term1, term2){
    return _.group(_.and(term1, term2));
  });
  singleString = _.builder(function(term) {
    return term;
  });

  buildQuery(): string {
    const op = this.group.filter(e => e.data['operator']).pop();
    const buildTerm = (data: object) => {
      if (data) {
        const key = Object.keys(data).pop();
        return _.field(key, _.term(data[key]));
      }
    }
    const terms = this.group.filter(e => !e.data['operator']).map(e => buildTerm(e.data));
    if (op) {
      if (op.data['operator'] === CreateOptions.And) {
        return this.andString(terms[0], terms[1]);
      } else if (op.data['operator'] === CreateOptions.Or) {
        return _.builder(_.group(_.or(terms[0], terms[1])));
      }
    } else {
      return this.singleString(terms[0]);
    }
    return '';
  }

  onCreate(value: any): void {
    switch(value) {
      /*
      case CreateOptions.Bracket:
        //this.createAddAndQuery();
        break;
        */
      case CreateOptions.And:
        this.createLogicalOperator(value);
        break;
      case CreateOptions.Or:
        this.createLogicalOperator(value);
        break;
    }
  }

  createLogicalOperator(value): void {
    this.group.push(new LuceneComponentItem(LuceneLogicInputComponent, uuidv4(), {operator: value}));
    this.group.push(new LuceneComponentItem(LuceneSingleQueryInputComponent, uuidv4(), {}));
    this.loadComponent();
  }

}
