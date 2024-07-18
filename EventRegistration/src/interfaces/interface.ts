export interface Organizer {
    name: string;
    contact: string;
    email: string;
    organization: string;
  }
  
  export interface Event {
    name: string;
    time: string;
    organizer: Organizer;
    price: number;
    description: string;
  }
 