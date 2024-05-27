
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inițializează formularul de login folosind FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  // Funcția care se apelează la submiterea formularului de login
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Trimite cererea de login către serviciul AuthService
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/birthday/friends']); // Navighează către pagina de home după autentificare
        },
        error: (err) => {
          console.error('Login failed', err.message);
          alert('Invalid credentials, please try again.'); // Afișează un mesaj de eroare în caz de autentificare eșuată
        }
      });
    }
  }

  // Funcția care gestionează opțiunea "Remember Me"
  handleRememberMe(remember: boolean, user: any): void {
    // Implementarea logicii de gestionare a "Remember Me" (dacă este necesar)
  } 
}
