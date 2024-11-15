import React, { useState } from 'react';
import { Room } from '../types';
import { X } from 'lucide-react';

interface RoomManagementProps {
  rooms: Room[];
  onAddRoom: (room: Room) => void;
  onEditRoom: (room: Room) => void;
  onClose: () => void;
}

const RoomManagement: React.FC<RoomManagementProps> = ({ rooms, onAddRoom, onEditRoom, onClose }) => {
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [newRoom, setNewRoom] = useState<Partial<Room>>({ name: '', capacity: 0, color: '#3b82f6' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom) {
      onEditRoom({ ...editingRoom, ...newRoom } as Room);
      setEditingRoom(null);
    } else {
      onAddRoom(newRoom as Room);
    }
    setNewRoom({ name: '', capacity: 0, color: '#3b82f6' });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Rooms</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Name</label>
            <input
              type="text"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              value={newRoom.capacity}
              onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Color</label>
            <input
              type="color"
              value={newRoom.color}
              onChange={(e) => setNewRoom({ ...newRoom, color: e.target.value })}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            {editingRoom ? 'Update Room' : 'Add Room'}
          </button>
        </form>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Existing Rooms</h3>
          <ul className="space-y-2">
            {rooms.map((room) => (
              <li key={room.id} className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: room.color }}></span>
                  {room.name} (Capacity: {room.capacity})
                </span>
                <button
                  onClick={() => {
                    setEditingRoom(room);
                    setNewRoom({ name: room.name, capacity: room.capacity, color: room.color });
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;