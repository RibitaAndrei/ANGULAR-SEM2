

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inițializează formularul de înregistrare folosind FormBuilder
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.createPasswordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator }); // Adaugă validatorul pentru confirmarea parolei
  }

  // Funcția care se apelează la submiterea formularului de înregistrare
  onSubmit(): void {
    if (this.registerForm.valid) {
      // Trimite cererea de înregistrare către serviciul AuthService
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Navighează către pagina de login sau dashboard după înregistrare reușită
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }

  // Funcție pentru crearea unui validator pentruparola
  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]+/.test(value);
      //Expresia [A-Z]+ este o expresie regulată care caută orice secvență de caractere în șirul de intrare (value)
      // care conține cel puțin un caracter în intervalul de la 'A' la 'Z' (litere mari).
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[\W_]+/.test(value); // tot ce nu e litera sau cifra
      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
      if (!valid) {
        return { strong: 'Your password is weak. Use [A-Z], [a-z], [1-9], [.*&!] characters' };
      }
      return null;
    };
  }

  // Funcție pentru afișarea mesajelor de eroare asociate cu câmpurile din formular
  getErrorMsg(field: string): string {
    const control = this.registerForm.get(field);
    if (control && control.hasError('required')) {
      return 'Please enter a ' + field;
    } else if (control && control.hasError('email')) {
      return 'Please enter a valid email';
    } else if (control && control.hasError('strong')) {
      return control.getError('strong');
    }
    return '';
  }

  // Validator pentru confirmarea parolei
  passwordMatchValidator(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
