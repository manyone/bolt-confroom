import React from 'react';
import { Room } from '../types';
import { Users, Settings } from 'lucide-react';

interface RoomListProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
  onManageRooms: () => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onSelectRoom, onManageRooms }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Available Rooms</h2>
        <button
          onClick={onManageRooms}
          className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
        >
          <Settings size={20} />
        </button>
      </div>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="mb-2">
            <button
              onClick={() => onSelectRoom(room)}
              className="w-full text-left p-2 hover:bg-gray-100 rounded transition duration-150 ease-in-out flex items-center justify-between"
            >
              <span className="flex items-center">
                <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: room.color }}></span>
                {room.name}
              </span>
              <span className="text-gray-600 flex items-center">
                <Users size={16} className="mr-1" />
                {room.capacity}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;