import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../../../interfaces/interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule],
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  personalInfoForm!: FormGroup;
  eventInfoForm!: FormGroup;
  paymentForm!: FormGroup;
  currentStep: number = 1;
  event!: Event;
  pricePerTicket!: number;
  totalPrice!: number;
  registrationData!: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.event = history.state.event;
      if (!this.event) {
        // Handle case where no event is provided (e.g., direct navigation to registration page)
        this.router.navigate(['/eventdetails']);
        return;
      }
      this.initializeForms();
    });
  }

  initializeForms(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.eventInfoForm = this.fb.group({
      eventName: [{ value: this.event.name, disabled: true }],
      eventTime: [{ value: this.event.time, disabled: true }],
      tickets: ['', [Validators.required, Validators.min(1)]],
      price: [{ value: this.event.price, disabled: true }],
      totalPrice: [{ value: 0, disabled: true }]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required]
    });

    this.pricePerTicket = this.event.price;
    this.totalPrice = 0;
  }

  nextStep(): void {
    this.currentStep++;
  }

  prevStep(): void {
    this.currentStep--;
  }

  calculatePrice(): void {
    const tickets = this.eventInfoForm.get('tickets')?.value;
    this.totalPrice = tickets * this.pricePerTicket;
    this.eventInfoForm.get('totalPrice')?.setValue(this.totalPrice);
  }

  submit(): void {
    if (
      this.personalInfoForm.valid &&
      this.eventInfoForm.valid &&
      this.paymentForm.valid
    ) {
      // Save registration data to local storage
      const registrationData = {
        name: this.personalInfoForm.value.firstName + ' ' + this.personalInfoForm.value.lastName,
        phone: this.personalInfoForm.value.mobileNo,
        eventTime: this.event.time,
        eventName: this.event.name,
        tickets: this.eventInfoForm.value.tickets,
        id: this.generateUniqueId() // Generate unique ID
      };

      // Store current registration in registrationData
      this.registrationData = registrationData;

      // Retrieve existing registrations from local storage or initialize an empty array
      let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      registrations.push(registrationData);
localStorage.setItem('registrationData', JSON.stringify(registrationData));
      // Store updated registrations back into local storage
      localStorage.setItem('registrations', JSON.stringify(registrations));

      // Navigate to success page
      this.router.navigate(['/success']);
    } else {
      // Mark all forms as touched to display validation messages
      this.personalInfoForm.markAllAsTouched();
      this.eventInfoForm.markAllAsTouched();
      this.paymentForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/eventdetails']);
  }

  private generateUniqueId(): string {
    // Example of generating a simple unique ID (you can use any method you prefer)
    return 'REG' + Math.random().toString(36).substring(2, 9);
  }
}
