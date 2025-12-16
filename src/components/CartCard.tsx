import { ChevronRight } from 'lucide-react';
import AddQty from '@/components/ui/AddQty';
import type { ReactNode } from 'react';
import CardMenu from './ui/custom/CardMenu';
import type { CartRestaurant } from '@/types/cart';
import { useDeleteCartItem, useUpdateCartItem } from '@/services/api/cart';

type MyOrderCardProps = {
  order?: CartRestaurant;
  rightContent?: string | ReactNode;
  showQtyControl?: boolean;
};

export default function CartCard({
  order,
  rightContent,
  showQtyControl,
}: MyOrderCardProps) {
  const name = order?.restaurant.name ?? 'unknown';
  const total = order?.subtotal.toLocaleString() ?? '0';
  const updateCart = useUpdateCartItem();
  const deleteCart = useDeleteCartItem();

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
                price={`Rp${price?.toLocaleString()}`}
                image={img}
                rightContent={
                  <AddQty
                    quantity={qty}
                    onChange={(newQty) => {
                      if (newQty === 0) {
                        deleteCart.mutate(item.id);
                      } else {
                        updateCart.mutate({
                          cartItemId: item.id,
                          quantity: newQty,
                        });
                      }
                    }}
                  />
                }
              />
              <div>
                {showQtyControl ? (
                  <span className='text-md-medium'>
                    {qty} x {price}
                  </span>
                ) : null}
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
