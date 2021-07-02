import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchiveListComponent } from './views/archive-list/archive-list.component';
import { ArchiveComponent } from './views/archive/archive.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ArchiveListComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class ArchiveModule { }
