import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { HomeComponent } from './layout/home/home.component';
import { PatientsComponent } from './components/dashboard/patients/patients.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'patients', pathMatch: 'full' },
      { path: 'patients', component: PatientsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error-page' }
];

