import CardMenu from '@/components/ui/cardMenu';
import { ChevronRight } from 'lucide-react';
import AddQty from '@/components/ui/AddQty';
import type { ReactNode } from 'react';

type MyOrderCardProps = {
  rightContent?: string | ReactNode;
};

export default function MyOrderCard({ rightContent }: MyOrderCardProps) {
  return (
    <div className='shadow-card space-y-5 p-5 rounded-2xl'>
      <div className='flex items-center gap-2'>
        <img
          className='size-7 object-cover'
          src={'/src/assets/icons/small-logo.png'}
          alt='food-detail'
        />
        <span className='text-lg-bold'>Burger King</span>
        <ChevronRight />
      </div>
      <CardMenu
        variant='flex'
        imgClassName='size-22 rounded-2xl'
        name='Food Name'
        price='50000'
        image={'/src/assets/images/price.png'}
        rightContent={<AddQty />}
      />
      <hr className='w-full border-t border-dashed border-neutral-300' />
      <div className='flex-between'>
        <div>
          <span className='text-md-medium'>Total</span>
          <p className='text-xl-extrabold'>Rp100.000</p>
        </div>
        {rightContent}
      </div>
    </div>
  );
}
