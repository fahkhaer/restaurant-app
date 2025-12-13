import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/custom/tabs';

import { Button } from './ui/button';
import AddQty from './ui/AddQty';
import CardMenu from './ui/custom/CardMenu';
import type { Menu } from '@/types/restaurant';
import errorImg from '@/assets/images/image-off.png';

interface TabsMenuCardProps {
  menu?: Menu[];
}

function TabsMenu({ menu }: TabsMenuCardProps) {
  return (
    <Tabs defaultValue='all-menu'>
      <TabsList className=''>
        <TabsTrigger value='all-menu'>All Menu</TabsTrigger>
        <TabsTrigger value='food'>Food</TabsTrigger>
        <TabsTrigger value='drink'>Drink</TabsTrigger>
      </TabsList>
      {/* all menus */}
      <TabsContent className='flex mt-6 flex-wrap gap-5' value='all-menu'>
        {menu?.map((item) => (
          <CardMenu
            key={item.id}
            name={item.foodName ?? 'No food name'}
            price={item.price ? `Rp ${item.price.toLocaleString()}` : 'Rp 0'}
            image={item.image ?? errorImg}
            className='shadow-card basis-[calc(25%-16px)]'
            rightContent={<Button className='w-[79px]'>Add</Button>}
          />
        ))}
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
              rightContent={<Button className='w-[79px]'>Add</Button>}
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
              rightContent={<AddQty />}
            />
          ))}
      </TabsContent>
    </Tabs>
  );
}

export default TabsMenu;
