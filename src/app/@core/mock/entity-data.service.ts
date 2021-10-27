import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class EntityDataService {
  abstract getList(): any[];
}
