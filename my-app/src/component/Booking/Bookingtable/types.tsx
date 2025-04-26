export interface Booking {
  id: string;
  title?: string;
  description?: string;
  date: string;
  start: string;
  end: string;
  roomId: string;
  room: string;
}

  
  
export interface BookingTableProps {
  data: Booking[];
  onEdit?: (booking: Booking) => void;
  onDelete?: (bookingId: string) => void;
  loading?: boolean;
}