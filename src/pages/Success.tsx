import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { CheckIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <section className='flex-center h-screen'>
      <div>
        {/* logo */}
        <Link to={'/'}>
          <div className='size-12 w-fit gap-4 pb-7 flex-center'>
            <img
              className='h-auto'
              src='src/assets/icons/logored.png'
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
                <p className='text-md-medium'>Date ( 2 items)</p>
                <p className='text-md-medium'>Payment Method</p>
                <p className='text-md-medium'>Price ( 2 items)</p>
                <p className='text-md-medium'>Delivery Fee </p>
                <p className='text-md-medium'>Service Fee</p>
              </div>

              <div className='space-y-4 text-right'>
                <p className='text-md-bold'>25 August 2025, 15:51</p>
                <p className='text-md-bold'>Bank Rakyat Indonesia</p>
                <p className='text-md-bold'>Rp 100.000</p>
                <p className='text-md-bold'>Rp 10.000</p>
                <p className='text-md-bold'>Rp 1.000</p>
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
              <p className='text-lg-extrabold'>Rp 1.100.000</p>
            </div>

            <Button className='w-full h-12 mt-4'>See My Orders</Button>
          </section>
        </div>
        {/* Alert */}
        <Alert className='fixed bg-red-700 rounded-md top-20 w-[291px] text-white right-[120px] z-50'>
          <AlertTitle className='flex justify-between items-center w-full'>
            <p className='text-sm-semibold'>Something went wrong</p>
            <X className='cursor-pointer size-4' />
          </AlertTitle>
        </Alert>
      </div>
    </section>
  );
}

export default Success;
