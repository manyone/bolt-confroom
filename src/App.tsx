import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import RoomBookingForm from './components/RoomBookingForm';
import RoomList from './components/RoomList';
import RoomManagement from './components/RoomManagement';
import ReservationModal from './components/ReservationModal';
import { Room, Booking } from './types';
import { Calendar as CalendarIcon } from 'lucide-react';

const localizer = momentLocalizer(moment);

function App() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: 'Conference Room A', capacity: 10, color: '#3b82f6' },
    { id: 2, name: 'Meeting Room B', capacity: 6, color: '#10b981' },
    { id: 3, name: 'Board Room', capacity: 15, color: '#f59e0b' },
  ]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showManageRooms, setShowManageRooms] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleBookRoom = (booking: Booking) => {
    const startTime = new Date(booking.startTime);
    const endTime = new Date(startTime.getTime() + booking.duration * 60 * 60 * 1000);
    const room = rooms.find(r => r.id === booking.roomId);
    const newBooking = {
      ...booking,
      endTime: endTime,
      color: room ? room.color : '#3b82f6',
    };
    setBookings([...bookings, newBooking]);
    setSelectedRoom(null);
  };

  const handleCancelBooking = () => {
    setSelectedRoom(null);
  };

  const handleAddRoom = (room: Room) => {
    const newRoom = { ...room, id: rooms.length + 1 };
    setRooms([...rooms, newRoom]);
  };

  const handleEditRoom = (updatedRoom: Room) => {
    setRooms(rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room));
    // Update bookings with the new room color
    setBookings(bookings.map(booking => 
      booking.roomId === updatedRoom.id ? { ...booking, color: updatedRoom.color } : booking
    ));
  };

  const handleSelectEvent = (event: any) => {
    const booking = bookings.find(b => 
      b.startTime.getTime() === event.start.getTime() && 
      b.endTime.getTime() === event.end.getTime() &&
      b.roomName === event.title.split(' - ')[0]
    );
    if (booking) {
      setSelectedBooking(booking);
    }
  };

  const handleSaveBooking = (updatedBooking: Booking) => {
    setBookings(bookings.map(booking => 
      booking.startTime === selectedBooking?.startTime &&
      booking.roomId === selectedBooking?.roomId
        ? updatedBooking
        : booking
    ));
    setSelectedBooking(null);
  };

  const handleDeleteBooking = () => {
    setBookings(bookings.filter(booking => 
      booking.startTime !== selectedBooking?.startTime ||
      booking.roomId !== selectedBooking?.roomId
    ));
    setSelectedBooking(null);
  };

  const calendarEvents = bookings.map(booking => ({
    title: `${booking.roomName} - ${booking.name}`,
    start: new Date(booking.startTime),
    end: new Date(booking.endTime),
    resource: booking.color,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <CalendarIcon className="mr-2" />
        Conference Room Booking App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <RoomList
            rooms={rooms}
            onSelectRoom={handleSelectRoom}
            onManageRooms={() => setShowManageRooms(true)}
          />
        </div>
        <div className="md:col-span-2">
          {selectedRoom ? (
            <RoomBookingForm
              room={selectedRoom}
              onBookRoom={handleBookRoom}
              onCancel={handleCancelBooking}
            />
          ) : (
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.resource,
                },
              })}
              onSelectEvent={handleSelectEvent}
            />
          )}
        </div>
      </div>
      {showManageRooms && (
        <RoomManagement
          rooms={rooms}
          onAddRoom={handleAddRoom}
          onEditRoom={handleEditRoom}
          onClose={() => setShowManageRooms(false)}
        />
      )}
      {selectedBooking && (
        <ReservationModal
          booking={selectedBooking}
          onSave={handleSaveBooking}
          onDelete={handleDeleteBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}

export default App;