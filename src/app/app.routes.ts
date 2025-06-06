import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'error-page', component: ErrorPageComponent},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

