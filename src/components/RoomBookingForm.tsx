import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Room, Booking } from '../types';
import { Calendar, Clock, User, Mail, FileText, X } from 'lucide-react';

interface RoomBookingFormProps {
  room: Room;
  onBookRoom: (booking: Booking) => void;
  onCancel: () => void;
}

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({ room, onBookRoom, onCancel }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Booking>();

  const onSubmit = (data: Booking) => {
    onBookRoom({
      ...data,
      roomId: room.id,
      roomName: room.name,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Book {room.name}</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
          aria-label="Cancel booking"
        >
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Calendar size={16} className="mr-1" />
            Date and Time
          </label>
          <Controller
            name="startTime"
            control={control}
            rules={{ required: 'Date and time are required' }}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            )}
          />
          {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Clock size={16} className="mr-1" />
            Duration (hours)
          </label>
          <select
            {...register('duration', { required: 'Duration is required' })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8].map(value => (
              <option key={value} value={value}>{value} hour{value !== 1 ? 's' : ''}</option>
            ))}
          </select>
          {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <User size={16} className="mr-1" />
            Your Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Mail size={16} className="mr-1" />
            Email
          </label>
          <input
            type="email"
            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FileText size={16} className="mr-1" />
            Description
          </label>
          <textarea
            {...register('description')}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Book Room
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomBookingForm;