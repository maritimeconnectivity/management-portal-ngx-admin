import { VesselControllerService } from './../../backend-api/identity-registry/api/vesselController.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() entity: any;
  @Input() required: boolean;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();

  options: any[] = [];
  isLoading: boolean = false;
  selectedEntityMrn: string = '';
  
  constructor(
    private vesselControllerService: VesselControllerService,
    private iconsLibrary: NbIconLibraries,
    private notifierService: NotifierService,
    ) { 
      iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
    }

  ngOnInit(): void {
    if (this.menuType === MenuType.Vessel) {
      this.isLoading = true;
      this.vesselControllerService.getOrganizationVessels(this.orgMrn).subscribe(
        data => {
          this.isLoading = false;
          data.content.forEach(e => this.options.push(this.getOption(e.mrn, e.name)));
          // if there is a given entity, that will become the selected option
          if (this.entity) {
            this.options.forEach(e => {
              if (e.value === this.entity.mrn) {
                this.selectedEntityMrn = this.entity.mrn;
              }
            });
          }
        },
        err => this.notifierService.notify('error', 'There was error in fetching ' + this.menuType + ' - ' + err.error.message),
      );
    }
  }

  getTitle = (mrn: string, name: string) => {
    if (name.includes(mrn)) {
      return name;
    } else {
      return name + ' (' + mrn + ')';
    }
  }

  getOption = (mrn: string, name: string) => {
    return {title: this.getTitle(mrn, name), value: mrn};
  }

  onUpdateEntity = (mrn: string, name: string) => {
    this.entity = { mrn: mrn, name: name };
  }

  onMenuItemSelected = (event: any) => {
    this.onUpdateEntity(event.value, this.options.filter(e => e.value === event.value).pop().title);
    this.onUpdate.emit({fieldName: this.menuType, value: this.entity});
  }
}
