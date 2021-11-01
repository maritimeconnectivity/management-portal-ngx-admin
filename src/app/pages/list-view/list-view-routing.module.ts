import { ListViewComponent } from './list-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: ListViewComponent,
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
export class ListViewRoutingModule { }
