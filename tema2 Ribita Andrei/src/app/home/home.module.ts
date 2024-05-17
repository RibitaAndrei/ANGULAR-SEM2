import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TableComponent } from '../table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateComponent } from '../table/update/update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent,TableComponent,UpdateComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzTableModule,
    MatDialogModule,
    FormsModule
  ]
})
export class HomeModule { }
