import { ColumnForEntity } from './../../../models/columnForEntities';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  title = "";
  entityType = "device";
  columnForEntity = ColumnForEntity[this.entityType];

  ngOnInit(): void {
  }

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
    this.title = this.route.snapshot.paramMap.get("id");
    let arrays = this.router.url.split("/");
    this.entityType = arrays[arrays.length-2];
    this.entityType = this.entityType.substr(0, this.entityType.length-1);
    this.columnForEntity = ColumnForEntity[this.entityType];
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}

