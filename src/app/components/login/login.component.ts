import { Component } from '@angular/core';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SpinnerComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log('Formulario enviado', this.loginForm.valid);
    
    if (this.loginForm.valid) {
      console.log('Formulario válido, redirigiendo a /home');
      this.isLoading = true;
      // Redirigir a la página de inicio
      this.router.navigate(['/home']).then(nav => {
        console.log('Navegación exitosa:', nav);
      }).catch(err => {
        console.error('Error en la navegación:', err);
        this.isLoading = false;
      });
    } else {
      console.log('Formulario inválido');
      // Marcar todos los controles como tocados para mostrar mensajes de error
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
