interface Room {
    id?: string;
    name: string;
    capacity: number;
  }
  
  export interface RoomFormProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    initialValues?: Room;
    isUpdate: boolean;
  }