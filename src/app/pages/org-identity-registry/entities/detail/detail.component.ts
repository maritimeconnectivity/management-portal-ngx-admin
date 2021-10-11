import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmartTableData } from '../../../../@core/data/smart-table';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  title = "";

  ngOnInit(): void {
  }

  constructor(private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get("id");
    this.title = id;
  }

}

