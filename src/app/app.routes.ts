import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'singIn', component: SingInComponent},
    {path: 'error-page', component: ErrorPageComponent},
    {path: '**', redirectTo: 'error-page', pathMatch: 'full'}
];

