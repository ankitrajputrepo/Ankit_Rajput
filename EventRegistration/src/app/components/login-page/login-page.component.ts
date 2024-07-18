import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Check if email and password match hardcoded values
      if (email === 'admin@123' && password === 'admin') {
        // Redirect to admin page upon successful login
        this.router.navigate(['/adminpage']);
      } else {
        // Handle invalid login (show error message, etc.)
        alert('Invalid credentials. Please try again.');
      }
    } else {
      // Mark all form fields as touched to display validation messages
      this.loginForm.markAllAsTouched();
    }
  }
}
