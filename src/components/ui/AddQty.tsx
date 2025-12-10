import { Button } from './button';
import { Minus, Plus } from 'lucide-react';

function AddQty() {
  return (
    <div className='flex-between gap-2 w-[123px]'>
      <Button className='size-10' variant={'outline'}>
        <Minus />
      </Button>
      <span>1</span>
      <Button className='size-10'>
        <Plus />
      </Button>
    </div>
  );
}

export default AddQty;
