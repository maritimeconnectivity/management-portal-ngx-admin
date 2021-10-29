import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstancesRoutingModule } from './instances-routing.module';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    SearchComponent,
    EditComponent,
    DetailComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    InstancesRoutingModule
  ]
})
export class InstancesModule { }
