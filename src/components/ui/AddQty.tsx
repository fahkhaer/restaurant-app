import { Button } from './button';
import { Minus, Plus } from 'lucide-react';

type AddQtyProps = {
  quantity?: number;
  onChange?: (newQty: number) => void;
};

function AddQty({ quantity = 1, onChange }: AddQtyProps) {
  const handleIncrement = () => onChange?.(quantity + 1);
  const handleDecrement = () => {
    onChange?.(quantity - 1);
  };

  return (
    <div className='flex-between gap-2 w-[123px]'>
      <Button className='size-10' variant='outline' onClick={handleDecrement}>
        <Minus />
      </Button>
      <span>{quantity}</span>
      <Button className='size-10' onClick={handleIncrement}>
        <Plus />
      </Button>
    </div>
  );
}

export default AddQty;
