import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveListComponent } from './views/archive-list/archive-list.component';
import { ArchiveComponent } from './views/archive/archive.component';

const routes: Routes = [
  {
    path: 'archive-list',
    component: ArchiveListComponent
  },
  {
    path: 'archive/:productId/:productName',
    component: ArchiveComponent
  },
  {
    path: '',
    redirectTo: 'archive-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
