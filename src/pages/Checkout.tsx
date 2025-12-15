import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import CardMenu from '@/components/ui/custom/CardMenu';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Container from '@/styles/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import type { CartRestaurant } from '@/types/cart';
import { Input } from '@/components/ui/input';
import { GetProfile } from '@/services/api/profile';
import { checkoutSchema, type CheckoutFormData } from '@/schemas/checkout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckout } from '@/services/api/checkout';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react';

function Checkout() {
  const { data } = GetProfile();
  const buy = useCheckout();

  //ambil data dari restoran
  const location = useLocation();
  const order = location.state?.order as CartRestaurant;

  //oper data ke success
  const navigate = useNavigate();

  //validasi zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      address: '',
      phone: '',
      notes: '',
    },
  });

  //data phone dari getProfile
  useEffect(() => {
    if (data.phone) setValue('phone', data.phone);
  }, [data, setValue]);

  //formula
  const totalItems =
    order?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  const subtotal =
    order?.items?.reduce((acc, item) => acc + item.itemTotal, 0) ?? 0;
  const deliveryFee = 10000;
  const serviceFee = 1000;
  const total = subtotal + deliveryFee + serviceFee;

  //payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('BRI');

  //validasi zod
  const onSubmit = (formData: CheckoutFormData) => {
    if (!order) return;

    const payload = {
      restaurants: [
        {
          restaurantId: order.restaurant.id,
          items:
            order.items?.map((item) => ({
              menuId: item.menu.id,
              quantity: item.quantity,
            })) ?? [],
        },
      ],
      deliveryAddress: formData.address,
      phone: formData.phone,
      paymentMethod: selectedPaymentMethod,
      notes: formData.notes ?? '',
    };

    buy.mutate(payload, {
      onSuccess: (res) => {
        console.log('Checkout success:', res);
        navigate('/success', { state: { transaction: res.data.transaction } });
      },
      onError: (err) => {
        <Alert className='fixed bg-red-700 rounded-md top-20 w-[291px] text-white right-[120px] z-50'>
          <AlertTitle className='flex justify-between items-center w-full'>
            <p className='text-sm-semibold'>Something went wrong</p>
            <X className='cursor-pointer size-4' />
          </AlertTitle>
        </Alert>;
        console.error('Checkout failed:', err);
      },
    });
  };

  return (
    <Container className='mb-25'>
      <h1 className='pb-6'>Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='md:flex gap-10'>
        {/* ============== LEFT SIDE ============== */}
        <div className='flex-1 space-y-8'>
          <div className='space-y-5'>
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
              <div className='space-y-2'>
                <Input
                  className='text-md-medium '
                  id='address'
                  placeholder='Jl. Sudirman No. 25, Jakarta Pusat, 10220'
                  {...register('address')}
                />
                {errors.address && (
                  <p className='text-red-500 text-sm'>
                    {errors.address.message}
                  </p>
                )}
                <Input
                  className='text-md-medium text-neutral-500'
                  id='phone'
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className='text-red-500 text-sm'>{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Orders */}
            <div className='shadow-card rounded-2xl flex flex-col p-5 gap-5'>
              <div className='flex-between'>
                <div className='flex gap-2'>
                  <img
                    className='size-8 rounded-t-2xl'
                    src='./src/assets/icons/small-logo.png'
                    alt='restaurant-logo'
                  />
                  <span className='text-lg-extrabold'>
                    {order?.restaurant.name ?? 'unknown'}
                  </span>
                </div>
                <Button className='w-30 text-md-bold' variant={'outline'}>
                  Add Item
                </Button>
              </div>
              {order?.items?.map((item) => (
                <CardMenu
                  key={item.id}
                  name={item?.menu?.foodName || 'Unknown'}
                  price={`Rp${item?.itemTotal?.toString()} || '0'`}
                  imgClassName='rounded-2xl items-center size-20'
                  variant='flex'
                  image={item?.menu?.image}
                  rightContent={
                    <span className='text-lg-extrabold'>
                      x {item?.quantity}
                    </span>
                  }
                />
              ))}
            </div>

            {/* Notes */}
            <div className='shadow-card rounded-2xl flex flex-col p-5 gap-3'>
              <span className='text-lg-extrabold'>Notes</span>
              <Input
                id='notes'
                placeholder='Add a note for your order...'
                {...register('notes')}
              />
              {errors.notes && (
                <p className='text-red-500 text-sm'>{errors.notes.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* ============== RIGHT SIDE ============== */}
        <div className='relative flex-1 md:w-[390px] p-5 shadow-card rounded-2xl'>
          <section>
            {/* Payment Method */}
            <div>
              <span className='text-lg-extrabold'>Payment Method</span>
              <RadioGroup
                defaultValue={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
              >
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

              {/* Buy Button */}
              <Button
                type='submit'
                disabled={!isValid || buy.isPending}
                className='w-full'
              >
                {buy.isPending ? 'Processing...' : 'Buy'}
              </Button>
            </div>
          </section>
        </div>
      </form>
    </Container>
  );
}

export default Checkout;
