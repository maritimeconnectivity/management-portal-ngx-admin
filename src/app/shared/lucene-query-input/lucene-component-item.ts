import { QueryFieldInfo } from './model/queryFieldInfo';
import { LuceneComponent } from './model/lucene-component';
import { Type } from "@angular/core";

export class LuceneComponentItem {
    constructor(
        public component: Type<LuceneComponent>,
        public id: string,
        public data: object,
        public fieldInfo?: QueryFieldInfo[],
        ) {}
}