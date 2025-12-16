import CartCard from '@/components/CartCard';
import { Button } from '@/components/ui/button';
import { GetCart } from '@/services/api/cart';
import Container from '@/styles/Container';
import type { CartRestaurant } from '@/types/cart';
import { Link } from 'react-router-dom';

function Cart() {
  const { data, isLoading, isError } = GetCart();

  if (isError) return <p>Error loading cart</p>;

  return (
    <Container className='mb-25'>
      <h1 className='pb-8'>My Cart</h1>

      <div className='space-y-5'>
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <CartCard key={i} isLoading />
          ))
        ) : data?.cart?.length > 0 ? (
          data?.cart?.map((item: CartRestaurant) => (
            <CartCard
              key={item?.restaurant?.id}
              order={item}
              rightContent={
                <Link to='/checkout' state={{ order: item }}>
                  <Button className='w-60 h-12 text-[#FDFDFD]'>Checkout</Button>
                </Link>
              }
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </Container>
  );
}

export default Cart;
