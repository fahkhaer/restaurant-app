import TabsMenu from '@/components/TabsMenu';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/CardStore';
import { Icon } from '@iconify/react';

function Detail() {
  return (
    <>
      {/* images */}
      <div className='flex gap-2.5'>
        <img
          className='h-[470px] w-1/2 rounded-2xl object-cover'
          src={'/src/assets/images/Detail1.png'}
          alt='food-detail'
        />
        <div className='w-1/2'>
          <img
            className='h-[302px] w-full rounded-2xl object-cover'
            src={'/src/assets/images/Detail2.png'}
            alt='food-detail'
          />
          <div className='flex gap-5 mt-5 h-[148px]'>
            <img
              className='w-1/2 rounded-2xl object-cover'
              src={'/src/assets/images/Detail3.png'}
              alt='food-detail'
            />
            <img
              className='w-1/2 rounded-2xl object-cover'
              src={'/src/assets/images/Detail4.png'}
              alt='food-detail'
            />
          </div>
        </div>
      </div>
      {/* store */}
      <Card
        rightContent={
          <div className='flex gap-3'>
            <Button className='text-md-bold w-[140px]' variant={'outline'}>
              <Icon
                icon='material-symbols:share-outline'
                width='18'
                height='20'
              />
              Share
            </Button>
          </div>
        }
      />
      {/* menu */}
      <span className='display-lg-extrabold'>Menu</span>
      <TabsMenu />
    </>
  );
}

export default Detail;
