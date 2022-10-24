import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-lucene-query-input',
  templateUrl: './lucene-query-input.component.html',
  styleUrls: ['./lucene-query-input.component.scss']
})
export class LuceneQueryInputComponent implements OnInit {
  formGroup: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

}
