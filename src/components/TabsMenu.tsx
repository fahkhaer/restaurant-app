import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/custom/tabs';

import { Button } from './ui/button';
import CardMenu from './ui/custom/CardMenu';
import type { Menu } from '@/types/restaurant';
import errorImg from '@/images/image-off.png';
import { useAddToCart } from '@/services/api/cart';
import { useEffect } from 'react';

interface TabsMenuCardProps {
  menu?: Menu[];
  restaurantId: number;
  setAlert: React.Dispatch<
    React.SetStateAction<{
      type: 'success' | 'error';
      message?: string;
    } | null>
  >;
}

function TabsMenu({ menu, restaurantId, setAlert }: TabsMenuCardProps) {
  const addToCart = useAddToCart();

  // alert handler
  useEffect(() => {
    if (addToCart.isSuccess && addToCart.data?.message) {
      setAlert({
        type: 'success',
        message: addToCart.data.message,
      });
    }

    if (addToCart.isError && addToCart.error) {
      setAlert({
        type: 'error',
        message: addToCart.error.message,
      });
    }
  }, [
    addToCart.isSuccess,
    addToCart.isError,
    addToCart.data?.message,
    addToCart.error,
    setAlert,
  ]);

  return (
    <Tabs defaultValue='all-menu'>
      <TabsList className=''>
        <TabsTrigger value='all-menu'>All Menu</TabsTrigger>
        <TabsTrigger value='food'>Food</TabsTrigger>
        <TabsTrigger value='drink'>Drink</TabsTrigger>
      </TabsList>
      {/* all menus */}
      <TabsContent className='flex mt-6 flex-wrap gap-5' value='all-menu'>
        {menu?.map((item) => {

          return (
            <CardMenu
              key={item.id}
              name={item.foodName ?? 'No food name'}
              price={item.price ? `Rp ${item.price.toLocaleString()}` : 'Rp 0'}
              image={item.image ?? errorImg}
              className='shadow-card basis-[calc(25%-16px)]'
              rightContent={
                <Button
                  className='w-[79px] hover:cursor-pointer'
                  disabled={addToCart.isPending}
                  onClick={() => {

                    addToCart.mutate({
                      restaurantId,
                      menuId: item.id,
                      quantity: 1,
                    });
                  }}
                >
                  {addToCart.isPending ? 'Adding...' : 'Add'}
                </Button>
              }
            />
          );
        })}
      </TabsContent>

      <TabsContent className='flex mt-6 flex-wrap gap-5' value='food'>
        {menu
          ?.filter((item) => item.type === 'food')
          .map((item) => (
            <CardMenu
              key={item.id}
              name={item.foodName ?? 'No food name'}
              price={item.price ? `Rp ${item.price.toLocaleString()}` : 'Rp 0'}
              image={item.image ?? errorImg}
              className='shadow-card basis-[calc(25%-16px)]'
              rightContent={
                <Button
                  className='w-[79px] hover:cursor-pointer'
                  disabled={addToCart.isPending}
                  onClick={() =>
                    addToCart.mutate({
                      restaurantId,
                      menuId: item.id,
                      quantity: 1,
                    })
                  }
                >
                  {addToCart.isPending ? 'Adding...' : 'Add'}
                </Button>
              }
            />
          ))}
      </TabsContent>

      <TabsContent className='flex mt-6 flex-wrap gap-5' value='drink'>
        {menu
          ?.filter((item) => item.type === 'drink')
          .map((item) => (
            <CardMenu
              key={item.id}
              name={item.foodName ?? 'No food name'}
              price={item.price ? `Rp ${item.price.toLocaleString()}` : 'Rp 0'}
              image={item.image ?? errorImg}
              className='shadow-card basis-[calc(25%-16px)]'
              rightContent={
                <Button
                  className='w-[79px] hover:cursor-pointer'
                  disabled={addToCart.isPending}
                  onClick={() =>
                    addToCart.mutate({
                      restaurantId,
                      menuId: item.id,
                      quantity: 1,
                    })
                  }
                >
                  {addToCart.isPending ? 'Adding...' : 'Add'}
                </Button>
              }
            />
          ))}
      </TabsContent>
    </Tabs>
  );
}

export default TabsMenu;
