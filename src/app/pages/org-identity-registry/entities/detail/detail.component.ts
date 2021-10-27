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
  contextForAttributes = 'detail';

  ngOnInit(): void {
  }

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
    this.title = this.route.snapshot.paramMap.get("id");
    let arrays = this.router.url.split("/");
    this.entityType = arrays[arrays.length-2];
    this.entityType = this.entityType.substr(0, this.entityType.length-1);
    // filtered with context
    this.columnForEntity = Object.assign({}, ...
      Object.entries(ColumnForEntity[this.entityType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
    );
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}

