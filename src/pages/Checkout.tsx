import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import CardMenu from '@/components/ui/custom/CardMenu';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Container from '@/styles/Container';
import { Link, useLocation } from 'react-router-dom';
import type { CartRestaurant } from '@/types/cart';
import { Input } from '@/components/ui/input';
import { GetProfile } from '@/services/api/profile';

function Checkout() {
  const { data } = GetProfile();

  const location = useLocation();
  const order = location.state?.order as CartRestaurant;

  useEffect(() => {
    if (data) {
      setPhone(data.phone ?? '');
    }
  }, [data]);
  const totalItems =
    order?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  const subtotal =
    order?.items?.reduce((acc, item) => acc + item.itemTotal, 0) ?? 0;
  const deliveryFee = 10000;
  const serviceFee = 1000;
  const total = subtotal + deliveryFee + serviceFee;

  const [notes, setNotes] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <Container className='mb-25'>
      <h1 className='pb-6'>Checkout</h1>
      <div className='md:flex gap-10'>
        {/* ============== LEFT SIDE ============== */}
        <div className='flex-1 space-y-8'>
          {/* Delivery Address */}
          <div className='shadow-card rounded-2xl flex flex-col p-5 gap-5'>
            <div className='flex gap-2'>
              <img
                className='size-8 rounded-t-2xl'
                src='./src/assets/icons/map-logo.png'
                alt='map-logo'
              />
              <span className='text-lg-extrabold'>Delivery Address</span>
            </div>

            <div className=' space-y-2'>
              <Input
                className='text-md-medium '
                id='address'
                placeholder='Jl. Sudirman No. 25, Jakarta Pusat, 10220'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                className='text-md-medium text-neutral-500'
                id='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
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
            {order?.items?.map((item) => (
              <div key={item.id}>
                <CardMenu
                  name={item?.menu?.foodName || 'Unknown'}
                  price={item?.itemTotal?.toString() || '0'}
                  imgClassName='rounded-2xl items-center size-20'
                  variant='flex'
                  image={item?.menu?.image}
                  rightContent={
                    <span className='text-lg-extrabold'>
                      x {item?.quantity}
                    </span>
                  }
                />
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className='shadow-card rounded-2xl flex flex-col p-5 gap-3'>
            <span className='text-lg-extrabold'>Notes</span>
            <Input
              id='notes'
              placeholder='Add a note for your order...'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
                  <p className='text-md-medium'>Price ({totalItems} items)</p>
                  <p className='text-md-medium'>Delivery Fee</p>
                  <p className='text-md-medium'>Service Fee</p>
                  <p className='text-lg-regular'>Total</p>
                </div>

                <div className='space-y-4 text-right'>
                  <p className='text-md-bold'>Rp {subtotal.toLocaleString()}</p>
                  <p className='text-md-bold'>
                    Rp {deliveryFee.toLocaleString()}
                  </p>
                  <p className='text-md-bold'>
                    Rp {serviceFee.toLocaleString()}
                  </p>
                  <p className='text-lg-extrabold'>
                    Rp {total.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Pay Now Button */}
              <Link to='/success'>
                <Button className='w-full'>Buy</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}

export default Checkout;
