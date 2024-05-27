// modulul principal de rutare al aplicației Angular.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/auth/login/login.component';
import { RegisterComponent } from 'src/auth/register/register.component';

// rutele aplicației
const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirecționează ruta goală către login
  { path: 'auth/login', component: LoginComponent }, // Ruta pentru login, asociată cu LoginComponent
  { path: 'auth/register', component: RegisterComponent }, // Ruta pentru înregistrare, asociată cu RegisterComponent
  { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) }, // Ruta pentru încărcarea dinamică a modulului HomeModule
  { path: 'birthday', loadChildren: () => import('./birthday-reminder/birthday-reminder.module').then(m => m.BirthdayReminderModule) } // Ruta pentru încărcarea dinamică a modulului BirthdayReminderModule
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configurarea rutării de nivel superior pentru aplicație
  exports: [RouterModule] // Exportarea modulului de rutare pentru utilizare în alte module
})
export class AppRoutingModule { }
