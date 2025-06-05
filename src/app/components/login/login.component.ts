import { Component } from '@angular/core';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SpinnerComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor() {
  }

  logIn() {
    console.log('Login button clicked');
  }

}
