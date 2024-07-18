import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  userList: any[] = []; // Initialize an empty array to hold user data

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      // Safely access localStorage
      const storedUsers = localStorage.getItem('registrations');
      if (storedUsers) {
        this.userList = JSON.parse(storedUsers);
      }
    } 
  }
}
