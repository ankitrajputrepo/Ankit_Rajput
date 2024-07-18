import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';


export const routes: Routes = [

    {
        path:'',component:HomeComponent
    }
    ,
    {
        path:'admin',component:LoginPageComponent
    },
    { path: 'eventdetails', component: EventDetailsComponent },
    { path: 'registrationpage', component: RegistrationPageComponent }

];
