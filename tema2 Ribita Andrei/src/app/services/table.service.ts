import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})

export class TableService {
  employees:Employee[]=[
    {
      id: 1,
      name: "Andrei Popescu",
      email: "popescuandrei@gmail.com",
      department: "Vanzari",
      jobTitle: "Manager Vanzari",
      age: 20
  },
  {
      id: 2,
      name: "Maria Ionescu",
      email: "maria.ionescu@gmail.com",
      department: "Marketing",
      jobTitle: "Specialist Marketing",
      age: 28
  },
  {
      id: 3,
      name: "Ion Georgescu",
      email: "ion.georgescu@gmail.com",
      department: "IT",
      jobTitle: "Programator",
      age: 32
  },
  {
      id: 4,
      name: "Elena Stan",
      email: "elena.stan@gmail.com",
      department: "Resurse Umane",
      jobTitle: "Manager Resurse Umane",
      age: 35
  },
  {
      id: 5,
      name: "Alexandru Dumitrescu",
      email: "alexandru.dumitrescu@gmail.com",
      department: "Financiar",
      jobTitle: "Contabil",
      age: 42
  },
  {
      id: 6,
      name: "Cristina Marin",
      email: "cristina.marin@gmail.com",
      department: "IT",
      jobTitle: "Inginer Sisteme",
      age: 26
  },
  {
      id: 7,
      name: "George Popa",
      email: "george.popa@gmail.com",
      department: "Vanzari",
      jobTitle: "Reprezentant Vanzari",
      age: 30
  },
  {
      id: 8,
      name: "Laura Radu",
      email: "laura.radu@gmail.com",
      department: "Marketing",
      jobTitle: "Analist Marketing",
      age: 29
  },
  {
      id: 9,
      name: "Mihai Serban",
      email: "mihai.serban@gmail.com",
      department: "Financiar",
      jobTitle: "Auditor",
      age: 45
  },
  {
      id: 10,
      name: "Ana Vasilescu",
      email: "ana.vasilescu@gmail.com",
      department: "Resurse Umane",
      jobTitle: "Specialist Resurse Umane",
      age: 33
  },
  {
      id: 11,
      name: "Victor Enache",
      email: "victor.enache@gmail.com",
      department: "IT",
      jobTitle: "Administrator Retea",
      age: 38
  },
  {
      id: 12,
      name: "Daniela Ciobanu",
      email: "daniela.ciobanu@gmail.com",
      department: "Vanzari",
      jobTitle: "Asistent Vanzari",
      age: 25
  },
  {
      id: 13,
      name: "Radu Florescu",
      email: "radu.florescu@gmail.com",
      department: "Financiar",
      jobTitle: "Director Financiar",
      age: 50
  },
  {
      id: 14,
      name: "Claudia Mitrea",
      email: "claudia.mitrea@gmail.com",
      department: "Marketing",
      jobTitle: "Coordonator Campanii",
      age: 31
  },
  {
      id: 15,
      name: "Robert Iliescu",
      email: "robert.iliescu@gmail.com",
      department: "Resurse Umane",
      jobTitle: "Consultant Resurse Umane",
      age: 27
  }
  
  
];
  
  constructor() { }

  getAllEmployees():Employee[]{
    return this.employees;
  }

  updateEmployee(employee:Employee){
    let employeeToUpdate=this.employees.find(x=>x.id==employee.id);
    employeeToUpdate=employee;
  }

}
