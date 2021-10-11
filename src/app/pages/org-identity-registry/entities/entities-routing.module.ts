import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { EntitiesComponent } from './entities.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../miscellaneous/not-found/not-found.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: EntitiesComponent,
  children: [
    {
      path: '',
      component: ListComponent,
    },
    {
      path: ':id',
      component: DetailComponent,
    },
    {
      path: 'new',
      component: EditComponent,
    },
    {
      path: 'update',
      component: EditComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
