export interface FlightInfo {
  code: string;
  route: string;
  time: string;
}

export interface HotelInfo {
  name: string;
  address: string;
  japaneseAddress: string;
}

export interface LockerInfo {
  location: string;
  pin: string;
  note: string;
}

export interface Attraction {
  id: string;
  name: string;
  time: string;
  ticket?: string;
  guide: string;
  photoSpot: string;
  details?: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  attractions: Attraction[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}
