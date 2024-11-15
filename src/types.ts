export interface Room {
  id: number;
  name: string;
  capacity: number;
  color: string;
}

export interface Booking {
  roomId: number;
  roomName: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  name: string;
  email: string;
  description?: string;
  color: string;
}