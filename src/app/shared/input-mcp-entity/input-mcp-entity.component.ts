import { VesselControllerService } from './../../backend-api/identity-registry/api/vesselController.service';
import { Component, Input, OnInit } from '@angular/core';
import { MenuType } from '../models/menuType';
import { NbIconLibraries } from '@nebular/theme';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'ngx-input-mcp-entity',
  templateUrl: './input-mcp-entity.component.html',
  styleUrls: ['./input-mcp-entity.component.scss']
})
export class InputMcpEntityComponent implements OnInit {

  @Input() menuType: MenuType;
  @Input() isEditing: boolean;
  @Input() orgMrn: string;
  @Input() initialCandidate: any;
  @Input() required: boolean;

  entity: any = undefined;
  candidates: any[] = [];
  assignedEntityTitle = '';
  isLoading: boolean = false;
  
  constructor(
    private vesselControllerService: VesselControllerService,
    private iconsLibrary: NbIconLibraries,
    private notifierService: NotifierService,
    ) { 
      iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
    }

  ngOnInit(): void {
    if (this.menuType === MenuType.Vessel) {
      this.vesselControllerService.getOrganizationVessels(this.orgMrn).subscribe(
        data => data.content.forEach(e=> this.candidates.push({title: e.name + ' (' + e.mrn + ')', value: e.mrn})),
        err => this.notifierService.notify('error', 'There was error in fetching ' + this.menuType + ' - ' + err.error.message),
      );
    }
  }

  onMenuItemSelected = (event: any) => {
    this.entity = { mrn: event.value };
    this.assignedEntityTitle = this.candidates.filter(e => e.value === event.value).pop().title;
  }
}
