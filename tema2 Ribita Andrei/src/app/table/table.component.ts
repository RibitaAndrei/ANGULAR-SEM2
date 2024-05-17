import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { Employee } from '../models/Employee';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { UpdateComponent } from './update/update.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  employees:Employee[]=[];
  constructor(private employeeservice:TableService,private dialog:MatDialog){}

  ngOnInit(): void {
    this.employees=this.employeeservice.getAllEmployees();
  }
  
  updateEmployee(employee:Employee){
    const dialogRef=this.dialog.open(UpdateComponent,{data:employee});
    this.employees=[...this.employees];
  }

}
