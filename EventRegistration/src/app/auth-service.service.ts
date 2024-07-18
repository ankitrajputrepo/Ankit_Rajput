import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAdminLoggedIn = false;

  constructor() { }

  // Method to check if admin is logged in
  isAdminUserLoggedIn(): boolean {
    return this.isAdminLoggedIn;
  }

  // Method to simulate login (replace with actual authentication logic)
  login(email: string, password: string): boolean {
    if (email === 'admin@123' && password === 'admin') {
      this.isAdminLoggedIn = true;
      return true;
    }
    return false;
  }

  // Method to logout admin
  logout(): void {
    this.isAdminLoggedIn = false;
  }
}
