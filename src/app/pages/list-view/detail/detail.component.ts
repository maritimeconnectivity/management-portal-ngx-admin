import { EntityType, MenuTypeNames } from './../../models/menuType';
import { ColumnForMenu } from '../../models/columnForMenu';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NbIconLibraries } from '@nebular/theme';
import { MenuTypeIconNames } from '../../models/menuType';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  title = '';
  menuType = 'device';
  columnForMenu = ColumnForMenu[this.menuType];
  contextForAttributes = 'detail';
  iconName = 'circle';
  menuTypeName = '';
  isEntity = false;

  ngOnInit(): void {
    // filtered with context
    this.columnForMenu = Object.assign({}, ...
      Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
    );
  }

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, iconsLibrary: NbIconLibraries) {
    this.title = this.route.snapshot.paramMap.get("id");
    let arrays = this.router.url.split("/");
    this.menuType = arrays[arrays.length-2];
    this.menuType = this.menuType.replace('-', '').substr(0, this.menuType.length-1);
    this.menuTypeName = MenuTypeNames[this.menuType];
    this.iconName = MenuTypeIconNames[this.menuType];
    this.isEntity = EntityType.includes(this.menuType);

    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}

