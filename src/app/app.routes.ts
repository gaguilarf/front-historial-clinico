import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { HomeComponent } from './layout/home/home.component';
import { PatientsComponent } from './components/dashboard/patients/patients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/dashboard/help/help.component';
import { DepartmentsComponent } from './components/dashboard/departments/departments.component';

export const routes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent, // layout con el menú
    children: [
      { path: 'patients', component: PatientsComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'help', component: HelpComponent },
      { path: '', component: DashboardComponent }, // Esto será "/"
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error-page' }
];

