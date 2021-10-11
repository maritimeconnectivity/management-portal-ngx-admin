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
      path: 'register',
      component: EditComponent,
    },
    {
      path: 'update/:id',
      component: EditComponent,
    },
    {
      path: '',
      component: ListComponent,
    },
    {
      path: ':id',
      component: DetailComponent,
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
