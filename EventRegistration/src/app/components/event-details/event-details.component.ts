import { Component } from '@angular/core';
import { Event, Organizer } from '../../../interfaces/interface';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone:true,
  imports:[DatePipe,CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  events: Event[] = [
    {
      name: 'Music Concert',
      time: '2024-08-01T19:00:00',
      organizer: {
        name: 'ABC Events',
        contact: '1234567890',
        email: 'abc@example.com',
        organization: 'ABC Organization'
      },
      price: 50,
      description: 'Join us for an evening of spectacular music and entertainment.'
    },
    {
      name: 'Jazz Festival',
      time: '2024-08-15T18:00:00',
      organizer: {
        name: 'XYZ Productions',
        contact: '9876543210',
        email: 'xyz@example.com',
        organization: 'XYZ Productions'
      },
      price: 75,
      description: 'Enjoy the smooth sounds of jazz at our annual festival.'
    }
    // Add more events as needed
  ];

  constructor(private router: Router) { }

  onCardClick(event: Event): void {
    this.router.navigate(['/registrationpage'], { state: { event } });
  }

}
