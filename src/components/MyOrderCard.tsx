import { ChevronRight } from 'lucide-react';
import AddQty from '@/components/ui/AddQty';
import type { ReactNode } from 'react';
import CardMenu from './ui/custom/CardMenu';
import type { Order } from '@/types/order';

type MyOrderCardProps = {
  order?: Order;
  rightContent?: string | ReactNode;
};

export default function MyOrderCard({ order, rightContent }: MyOrderCardProps) {
  const name = order?.restaurants[0]?.restaurant?.name ?? 'unknown';
  const menu = order?.restaurants[0]?.items[0].menuName ?? 'unknown';
  const qty = order?.restaurants[0]?.items[0].quantity;
  const price = order?.restaurants[0]?.items[0].price;
  const total = order?.restaurants[0]?.items[0].itemTotal;
  const img =
    order?.restaurants[0]?.items[0].image ?? '/src/assets/images/price.png';
  return (
    <div className='shadow-card space-y-5 p-5 rounded-2xl'>
      <div className='flex items-center gap-2'>
        <img
          className='size-7 object-cover'
          src={'/src/assets/icons/small-logo.png'}
          alt='food-detail'
        />
        <span className='text-lg-bold'>{name}</span>
        <ChevronRight />
      </div>
      <CardMenu
        variant='flex'
        imgClassName='size-22 rounded-2xl'
        name={menu}
        price={price?.toString()}
        image={img}
        rightContent={<AddQty />}
      />
      <div>
        <span className='text-md-medium'>
          {qty} x {price}
        </span>
      </div>
      <hr className='w-full border-t border-dashed border-neutral-300' />
      <div className='flex-between'>
        <div>
          <span className='text-md-medium'>Total</span>
          <p className='text-xl-extrabold'>Rp{total}</p>
        </div>
        {rightContent}
      </div>
    </div>
  );
}
