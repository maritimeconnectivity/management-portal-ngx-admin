import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input() title: string;
  @Input() version: string;
  @Input() environmentName: string;
  @Input() provider: string;
  @Input() contact: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
}
