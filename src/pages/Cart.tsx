import MyOrderCard from '@/components/MyOrderCard';
import { Button } from '@/components/ui/button';

function Cart() {
  return (
    <div>
      <h1 className='pb-8'>My Cart</h1>
      <MyOrderCard
        rightContent={
          <Button className='w-60 h-12 text-[#FDFDFD]'>Checkout</Button>
        }
      />
    </div>
  );
}

export default Cart;
