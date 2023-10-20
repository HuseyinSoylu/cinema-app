interface Cinema {
  id: number;
  name: string;
  location: string;
  description?: string | null;
  salons: Salon[];
}

interface Salon {
  id: number;
  name: string;
  capacity: number;
  cinema: Cinema;
}

interface Film {
  id: number;
  title: string;
  description?: string | null;
  tickets: Ticket[];
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  tickets: Ticket[];
}

interface Ticket {
  id: number;
  filmId: number;
  userId: number;
  seat: string;
  price: number;
  paymentId: string;
  purchasedAt: Date;
  showtime: Date;
  film: Film;
  user: User;
}

export { Cinema, Salon, Film, User, Ticket };
