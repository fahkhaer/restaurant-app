import { ChevronRight } from 'lucide-react';
import AddQty from '@/components/ui/AddQty';
import type { ReactNode } from 'react';
import CardMenu from './ui/custom/CardMenu';
import type { CartRestaurant } from '@/types/cart';

type MyOrderCardProps = {
  order?: CartRestaurant;
  rightContent?: string | ReactNode;
};

export default function CartCard({ order, rightContent }: MyOrderCardProps) {
  const name = order?.restaurant.name ?? 'unknown';
  const total = order?.subtotal;

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
      <div>
        {order?.items?.map((item) => {
          const menu = item.menu.foodName ?? 'unknown';
          const qty = item.quantity;
          const price = item.itemTotal;
          const img = item.menu.image ?? '/src/assets/images/image-off.png';
          return (
            <>
              <CardMenu
                key={item.id}
                variant='flex'
                imgClassName='size-22 rounded-2xl'
                name={menu}
                price={price?.toString()}
                image={img}
                rightContent={
                  <AddQty
                    quantity={qty}
                    onChange={(newQty) => {
                      console.log('New quantity:', newQty);
                      //naro API
                    }}
                  />
                }
              />
              <div>
                <span className='text-md-medium'>
                  {qty} x {price}
                </span>
              </div>
            </>
          );
        })}
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
