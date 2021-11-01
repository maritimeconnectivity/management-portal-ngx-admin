import { ColumnForMenu } from '../../models/columnForMenu';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Location } from '@angular/common';
import { NbIconLibraries } from '@nebular/theme';
import { MenuTypeIconNames } from '../../models/entityType';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  title = '';
  entityType = 'device';
  columnForEntity = ColumnForMenu[this.entityType];
  contextForAttributes = 'detail';
  iconName = 'circle';
  ngOnInit(): void {
    // filtered with context
    this.columnForEntity = Object.assign({}, ...
      Object.entries(ColumnForMenu[this.entityType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
    );
  }

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, iconsLibrary: NbIconLibraries) {
    this.title = this.route.snapshot.paramMap.get("id");
    let arrays = this.router.url.split("/");
    this.entityType = arrays[arrays.length-2];
    this.entityType = this.entityType.substr(0, this.entityType.length-1);
    this.iconName = MenuTypeIconNames[this.entityType];

    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}

