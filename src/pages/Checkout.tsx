import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Container from '@/styles/Container';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { X } from 'lucide-react';
import AddQty from '@/components/ui/AddQty';
import CardMenu from '@/components/ui/cardMenu';
import React from 'react';
import { Icon } from '@iconify/react';

function Checkout() {
  return (
    <Container>
      <h1 className='pb-6'>Checkout</h1>
      <div className='md:flex gap-10'>
        {/* ============== LEFT SIDE ============== */}
        <div className='flex-1 space-y-8'>
          {/* Delivery Address */}
          <div className='shadow-card rounded-2xl flex flex-col p-5 gap-5'>
            <div>
              <div className='flex gap-2'>
                <img
                  className='size-8 rounded-t-2xl'
                  src='./src/assets/icons/map-logo.png'
                  alt='map-logo'
                />
                <span className='text-lg-extrabold'>Delivery Address</span>
              </div>
              <div className='text-md-medium'>
                Jl. Sudirman No. 25, Jakarta Pusat, 10220
                <p>0812-3456-7890</p>
              </div>
            </div>
            <Button className='w-30' variant={'outline'}>
              Change
            </Button>
          </div>

          {/* Orders */}
          <div className='shadow-card rounded-2xl flex flex-col p-5 gap-5'>
            <div className='flex-between'>
              <div className='flex gap-2'>
                <img
                  className='size-8 rounded-t-2xl'
                  src='./src/assets/icons/small-logo.png'
                  alt='map-logo'
                />
                <span className='text-lg-extrabold'>Burger Bang</span>
              </div>
              <Button className='w-30 text-md-bold' variant={'outline'}>
                Add Item
              </Button>
            </div>
            <CardMenu
              name='food name'
              price='50.000'
              imgClassName='rounded-2xl items-center size-20'
              variant='flex'
              rightContent={<AddQty />}
            />
          </div>
        </div>

        {/* ============== RIGHT SIDE ============== */}
        <div className='relative flex-1 md:w-[390px] p-5 shadow-card  rounded-2xl'>
          <section>
            {/* Payment Method */}
            <div>
              <span className='text-lg-extrabold'>Payment Method</span>

              <RadioGroup defaultValue='BNI'>
                {[
                  {
                    id: 'BNI',
                    label: 'BNI Virtual Account',
                    img: './src/assets/icons/BNI.png',
                  },
                  {
                    id: 'BRI',
                    label: 'BRI Virtual Account',
                    img: './src/assets/icons/BRI.png',
                  },
                  {
                    id: 'BCA',
                    label: 'BCA Virtual Account',
                    img: './src/assets/icons/BCA.png',
                  },
                  {
                    id: 'Mandiri',
                    label: 'Mandiri Virtual Account',
                    img: './src/assets/icons/mandiri.png',
                  },
                ].map((method, index, arr) => (
                  <React.Fragment key={method.id}>
                    <div className='flex-between py-2'>
                      <label className='flex items-center justify-between gap-2'>
                        <img
                          className='h-10 w-10'
                          src={method.img}
                          alt={method.id}
                        />
                        <span className='text-left leading-7 md:leading-8 font-regular text-sm md:text-base py-3'>
                          {method.label}
                        </span>
                      </label>
                      <RadioGroupItem value={method.id} />
                    </div>

                    {/* Garis pemisah kecuali item terakhir */}
                    {index < arr.length - 1 ? (
                      <hr className='bg-[#DFDFDF] dark:bg-[#252B37] h-px border-0 w-full' />
                    ) : (
                      <>
                        <Icon
                          icon='bxs:circle-half'
                          className='absolute size-10  text-[#fbfbfb] -translate-x-5 translate-y-17 left-0 bottom-1/2'
                        />
                        <hr className='border-t border-dashed border-[#DFDFDF] w-full' />
                        <Icon
                          icon='mdi:circle-half'
                          className='absolute size-10  text-[#fbfbfb] translate-x-5 translate-y-17 right-0 bottom-1/2'
                        />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </RadioGroup>
            </div>

            {/* Payment Summary */}
            <div className='space-y-4 pt-4'>
              <p className='text-lg-extrabold'>Payment Summary</p>

              <div className='flex justify-between'>
                <div className='space-y-4'>
                  <p className='text-md-medium'>Price ( 2 items)</p>
                  <p className='text-md-medium'>Delivery Fee</p>
                  <p className='text-md-medium'>Service Fee</p>
                  <p className='text-lg-regular'>Total</p>
                </div>

                <div className='space-y-4'>
                  <p className='text-md-bold'>Rp 1.100.000</p>
                  <p className='text-md-bold'>Rp 1.100.000</p>
                  <p className='text-md-bold'>Rp 1.100.000</p>
                  <p className='text-lg-extrabold'>Rp 1.100.000</p>
                </div>
              </div>
              {/* Pay Now Button */}
              <Button className='w-full'>Buy</Button>
            </div>
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
    </Container>
  );
}

export default Checkout;
