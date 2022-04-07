import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  @ViewChild('search', { static: true })
  searchElementRef: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
  }
}
