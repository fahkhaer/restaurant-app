import { Alert, AlertTitle } from '../alert';
import { X } from 'lucide-react';
import { useState } from 'react';

type DataAlertProps = {
  type?: 'success' | 'error';
  message?: string;
  onClose?: () => void;
};

export default function DataAlert({
  type = 'error',
  message,
  onClose,
}: DataAlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-700';

  return (
    <Alert
      className={`fixed ${bgColor} rounded-md top-20 w-[291px] text-white right-[120px] z-50`}
    >
      <AlertTitle className='flex justify-between items-center w-full'>
        <p className='text-sm-semibold'>{message}</p>
        <X
          className='cursor-pointer size-4'
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        />
      </AlertTitle>
    </Alert>
  );
}
