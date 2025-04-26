
export interface Room {
    id: string;
    name: string;
    capacity: number;
  }
  
  export interface RoomTableProps {
    data: Room[];
    onEdit?: (room: Room) => void;
    onDelete?: (id: string) => void;
    loading?: boolean;
  }