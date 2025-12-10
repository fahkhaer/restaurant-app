import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from './ui/button';
import AddQty from './ui/AddQty';
import CardMenu from './ui/cardMenu';

function TabsMenu() {
  return (
    <Tabs defaultValue='all-menu'>
      <TabsList>
        <TabsTrigger value='all-menu'>All Menu</TabsTrigger>
        <TabsTrigger value='food'>Food</TabsTrigger>
        <TabsTrigger value='drink'>Drink</TabsTrigger>
      </TabsList>
      <TabsContent className='flex gap-5' value='all-menu'>
        <CardMenu
          name='Burger'
          className='shadow-card w-1/5'
          price='50rb'
          image='./src/assets/images/price.png'
          rightContent={<Button className='w-[79px]'>Add</Button>}
        />
      </TabsContent>
      <TabsContent value='food'>
        <CardMenu
          name='Burger'
          className='shadow-card w-1/5'
          price='50.000'
          image='./src/assets/images/price.png'
          rightContent={<AddQty />}
        />
      </TabsContent>
      <TabsContent value='drink'>
        <CardMenu
          name='Burger'
          className='shadow-card w-1/5'
          price='50rb'
          image='./src/assets/images/price.png'
          rightContent={<AddQty />}
        />
      </TabsContent>
    </Tabs>
  );
}

export default TabsMenu;
