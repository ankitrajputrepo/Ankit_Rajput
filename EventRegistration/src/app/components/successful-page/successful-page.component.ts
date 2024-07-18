import { Component } from '@angular/core';

@Component({
  selector: 'app-successful-page',
  standalone: true,
  imports: [],
  templateUrl: './successful-page.component.html',
  styleUrl: './successful-page.component.css'
})
export class SuccessfulPageComponent {
  registrationData: any;

  constructor() {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('registrationData');
    if (storedData) {
      this.registrationData = JSON.parse(storedData);
    }
  }
}
