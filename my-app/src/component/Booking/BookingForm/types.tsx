export interface Room {
    id: string;
    name: string;
    capacity: number;
  }
  
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
  
  export interface BookingFormProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    initialValues?: Booking;
    isUpdate: boolean;
  }