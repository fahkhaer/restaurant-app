import MyOrderCard from '@/components/MyOrderCard';
import { Button } from '@/components/ui/button';
import Container from '@/styles/Container';

function Cart() {
  return (
    <Container>
      <h1 className='pb-8'>My Cart</h1>
      <MyOrderCard
        rightContent={
          <Button className='w-60 h-12 text-[#FDFDFD]'>Checkout</Button>
        }
      />
    </Container>
  );
}

export default Cart;
