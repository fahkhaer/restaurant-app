import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { CheckIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const transaction = location.state?.transaction;

  return (
    <section className='flex-center h-screen'>
      <div>
        {/* logo */}
        <Link to={'/'}>
          <div className='size-12 w-fit gap-4 pb-7 flex-center'>
            <img
              className='h-auto'
              src='/icons/Logored.png'
              alt='Logo-text'
              style={{ width: 'clamp(2.5rem, 3.5vw, 2.63rem)' }}
            />
            <p className='hidden md:block items-center  display-md-extrabold'>
              Foody
            </p>
          </div>
        </Link>

        <div className='relative md:w-[428px] p-5 shadow-card  rounded-2xl'>
          <section>
            <div className='flex-col place-items-center space-y-0.5'>
              {/* rounded check */}
              <div className='size-16 rounded-full bg-[#44AB09] flex items-center justify-center'>
                <CheckIcon className='text-white size-10' />
              </div>
              <p className='text-xl-extrabold'>Payment Success</p>
              <p className='text-md-regular'>
                Your payment has been successfully processed.
              </p>
              <Icon
                icon='bxs:circle-half'
                className='absolute size-10  text-[#fbfbfb] -translate-x-5 -translate-y-2 left-0'
              />
              <hr className='border-t my-3 border-dashed border-[#DFDFDF] w-full' />
              <Icon
                icon='mdi:circle-half'
                className='absolute size-10 text-[#fbfbfb] translate-x-5 -translate-y-8 right-0'
              />
            </div>

            {/* Payment Summary */}

            <div className='flex justify-between'>
              <div className='space-y-4'>
                <p className='text-md-medium'>Date</p>
                <p className='text-md-medium'>Payment Method</p>
                <p className='text-md-medium'>
                  Price ( {transaction?.restaurants[0]?.items?.length} items)
                </p>
                <p className='text-md-medium'>Delivery Fee </p>
                <p className='text-md-medium'>Service Fee</p>
              </div>

              <div className='space-y-4 text-right'>
                <p className='text-md-bold'>
                  {dayjs(transaction?.createdAt).format('DD MMMM YYYY, HH:mm')}
                </p>
                <p className='text-md-bold'>{transaction?.paymentMethod}</p>
                <p className='text-md-bold'>{transaction?.pricing?.subtotal}</p>
                <p className='text-md-bold'>
                  Rp {transaction?.pricing?.deliveryFee}
                </p>
                <p className='text-md-bold'>
                  Rp {transaction?.pricing?.serviceFee}
                </p>
              </div>
            </div>
            {/* Pay Now Button */}
            <Icon
              icon='bxs:circle-half'
              className='absolute size-10  text-[#fbfbfb] -translate-x-5 -translate-y-2 left-0'
            />
            <hr className='border-t my-3 border-dashed border-[#DFDFDF] w-full' />
            <Icon
              icon='mdi:circle-half'
              className='absolute size-10 text-[#fbfbfb] translate-x-5 -translate-y-8 right-0'
            />

            <div className='flex justify-between'>
              <p className='text-lg-regular'>Total</p>
              <p className='text-lg-extrabold'>
                Rp {transaction?.pricing?.totalPrice}
              </p>
            </div>
            <Link to={'/my-order'}>
              <Button className='w-full h-12 mt-4'>See My Orders</Button>
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Success;
