import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import CardMenu from './ui/custom/CardMenu';
import type { Order } from '@/types/order';
import dayjs from 'dayjs';

type MyOrderCardProps = {
  order?: Order;
  rightContent?: string | ReactNode;
  showQtyControl?: boolean;
};

export default function MyOrderCard({
  order,
  rightContent,
  showQtyControl,
}: MyOrderCardProps) {
  console.log('order', order);
  return (
    <div className='shadow-card space-y-5 p-5 rounded-2xl'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <img
            className='size-7 object-cover'
            src='/src/assets/icons/small-logo.png'
            alt='food-detail'
          />

          <span className='text-lg-bold'>
            {order?.restaurants[0]?.restaurant?.name ?? 'unknown'}
          </span>
          <ChevronRight />
        </div>

        <p className='text-sm text-neutral-400'>
          {dayjs(order?.updatedAt).format('DD MMMM YYYY')}
        </p>
      </div>

      {/* start items */}
      {order?.restaurants?.[0]?.items?.map((item) => (
        <CardMenu
          key={`${order.id}-${item.menuId}`}
          variant='flex'
          imgClassName='size-22 rounded-2xl'
          name={item.menuName}
          price={` ${item.quantity} x Rp${
            item?.price?.toLocaleString() ?? '0'
          }`}
          image={item.image ?? '/src/assets/images/price.png'}
          rightContent={
            showQtyControl ? (
              <div>
                <span className='text-md-medium'></span>
              </div>
            ) : null
          }
        />
      ))}

      <hr className='w-full border-t border-dashed border-neutral-300' />
      <div className='flex gap-12 items-center text-sm'>
        <span className='text-neutral-500'>Other fee</span>
        <span className='text-neutral-500 font-medium'>
          Rp
          {(
            (order?.pricing.deliveryFee ?? 0) + (order?.pricing.serviceFee ?? 0)
          ).toLocaleString()}
        </span>
      </div>

      <div className='flex-between'>
        <div>
          <span className='text-md-medium'>Total</span>
          <p className='text-xl-extrabold'>
            Rp{order?.pricing.totalPrice.toLocaleString() ?? 0}
          </p>
        </div>
        {rightContent}
      </div>
    </div>
  );
}
