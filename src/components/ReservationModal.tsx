import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Booking } from '../types';
import { Calendar, Clock, User, Mail, FileText, X, Trash2 } from 'lucide-react';

interface ReservationModalProps {
  booking: Booking;
  onSave: (updatedBooking: Booking) => void;
  onDelete: () => void;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ booking, onSave, onDelete, onClose }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Booking>({
    defaultValues: booking
  });

  const onSubmit = (data: Booking) => {
    onSave({
      ...booking,
      ...data,
      endTime: new Date(data.startTime.getTime() + data.duration * 60 * 60 * 1000)
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Reservation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
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
            <DatePicker
              selected={booking.startTime}
              onChange={(date: Date) => register('startTime').onChange(date)}
              showTimeSelect
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
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
              Save Changes
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;