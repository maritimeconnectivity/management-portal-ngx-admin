import { EventEmitter } from "@angular/core";

export interface LuceneComponent {
    id: string;
    data: object;
    onUpdate: EventEmitter<any>;
}