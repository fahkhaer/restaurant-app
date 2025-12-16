import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import CardMenu from './ui/custom/CardMenu';
import type { Order } from '@/types/order';
import dayjs from 'dayjs';

type MyOrderCardProps = {
  order?: Order;
  rightContent?: string | ReactNode;
  isLoading?: boolean;
};

export default function MyOrderCard({
  order,
  rightContent,
  isLoading,
}: MyOrderCardProps) {
  // sekeleton
  if (isLoading) {
    return (
      <div className='shadow-card space-y-5 p-5 rounded-2xl animate-pulse'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <div className='size-7 bg-neutral-200 rounded-full' />
            <div className='h-4 w-40 bg-neutral-200 rounded' />
          </div>
          <div className='h-3 w-32 bg-neutral-200 rounded' />
        </div>

        {[1, 2].map((i) => (
          <div key={i} className='flex gap-4'>
            <div className='size-22 bg-neutral-200 rounded-2xl' />
            <div className='flex flex-col gap-2 flex-1'>
              <div className='h-4 bg-neutral-200 rounded w-3/4' />
              <div className='h-3 bg-neutral-200 rounded w-1/2' />
            </div>
          </div>
        ))}

        <hr className='border-dashed border-neutral-300' />

        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-neutral-200 rounded' />
          <div className='h-4 w-20 bg-neutral-200 rounded' />
        </div>

        <div className='flex-between'>
          <div>
            <div className='h-4 w-20 bg-neutral-200 rounded mb-2' />
            <div className='h-6 w-32 bg-neutral-200 rounded' />
          </div>
          <div className='h-10 w-32 bg-neutral-200 rounded-xl' />
        </div>
      </div>
    );
  }

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
          key={`${order?.id}-${item.menuId}`}
          variant='flex'
          imgClassName='size-22 rounded-2xl'
          name={item.menuName}
          price={` ${item.quantity} x Rp${
            item?.price?.toLocaleString() ?? '0'
          }`}
          image={item.image ?? '/src/assets/images/price.png'}
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
