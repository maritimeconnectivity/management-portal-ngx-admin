import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ColumnForMenu } from '../../models/columnForMenu';
import { MenuTypeIconNames, MenuTypeNames } from '../../models/menuType';
import { NbIconLibraries } from '@nebular/theme';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  title = '';
  menuType = 'device';
  columnForMenu = ColumnForMenu[this.menuType];
  contextForAttributes = 'edit';
  iconName = 'circle';
  menuTypeName = '';

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, iconsLibrary: NbIconLibraries) {
    if (this.router.url.split('/').pop() === 'register' ){
      this.menuType = this.router.url.replace('s/register', '').split('/').pop();
      this.title = 'New ';
    }
    else if(this.router.url.split('/').includes('update')){
      this.menuType = this.router.url.replace('s/update', '').split('/').pop();
      this.title = 'Update ';
    }

    this.menuType = this.menuType.replace('-', '');
    this.menuTypeName = MenuTypeNames[this.menuType];
    this.iconName = MenuTypeIconNames[this.menuType];
    this.title += this.menuTypeName;

    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    // filtered with context
    this.columnForMenu = Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes));
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
