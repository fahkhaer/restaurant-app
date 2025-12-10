import TabsMenu from '@/components/TabsMenu';
import { Button } from '@/components/ui/button';
import CardStore from '@/components/ui/CardStore';
import LoadMoreButton from '@/components/ui/LoadMoreButton';
import ReviewersCard from '@/components/ui/ReviewersCard';

import { Icon } from '@iconify/react';
import { Star } from 'lucide-react';

function Detail() {
  return (
    <section className='space-y-8'>
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
      <CardStore
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
      <hr className='w-full bg-neutral-300' />
      {/* menu */}
      <h1>Menu</h1>
      <TabsMenu />
      <LoadMoreButton />

      <hr className='w-full bg-neutral-300' />
      {/* REVIEW */}
      <div className='space-y-6'>
        <h1>Review</h1>
        <div className='flex gap-1 items-center text-xl-extrabold'>
          <Star className='size-5 text-[#FFAB0D]' fill='#FFAB0D' />
          <span>4.9</span> <span>(24 Ulasan)</span>
        </div>
        <div className='flex flex-wrap gap-5'>
          <ReviewersCard />
          <ReviewersCard />
          <ReviewersCard />
        </div>
        <LoadMoreButton />
      </div>
    </section>
  );
}

export default Detail;
