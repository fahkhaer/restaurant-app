import TabsMenu from '@/components/TabsMenu';
import { Button } from '@/components/ui/button';
import CardStore from '@/components/ui/CardStore';
import LoadMoreButton from '@/components/ui/LoadMoreButton';
import ReviewersCard from '@/components/ui/ReviewersCard';
import { GetDetail } from '@/services/api/restaurants';
import Container from '@/styles/Container';
import { Icon } from '@iconify/react';
import { Star } from 'lucide-react';
import errorImg from '@/assets/images/image-off.png';
import { getDistanceKm } from '@/lib/utils/distance';
import type { Review } from '@/types/reviews';

function Detail() {
  const { data, isLoading, isError } = GetDetail();
  console.log(data);

  //coordinate
  const userLocation = { lat: -6.2, long: 106.8 }; // Contoh: lokasi user // belum

  const distance =
    data?.coordinates?.lat != null && data?.coordinates?.long != null
      ? getDistanceKm(
          userLocation.lat,
          userLocation.long,
          data.coordinates.lat,
          data.coordinates.long
        )
      : undefined;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <Container className='space-y-8 pb-12'>
      {/* images */}
      <div className='flex gap-2.5'>
        <img
          className='h-[470px] w-1/2 rounded-2xl object-cover'
          src={data?.images?.[0] || errorImg}
          alt='food-detail'
        />
        <div className='w-1/2'>
          <img
            className='h-[302px] w-full rounded-2xl object-cover'
            src={data?.images?.[1] || errorImg}
            alt='food-detail'
          />
          <div className='flex gap-5 mt-5 h-[148px]'>
            <img
              className='w-1/2 rounded-2xl object-cover'
              src={data?.images?.[2] || errorImg}
              alt='food-detail'
            />
            <img
              className='w-1/2 rounded-2xl object-cover'
              src={data?.images?.[3] || errorImg}
              alt='food-detail'
            />
          </div>
        </div>
      </div>
      {/* store */}
      <CardStore
        name={data?.name}
        rating={data?.star}
        location={data?.place}
        coordinate={distance}
        className='shadow-none!'
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
      <div>
        <h1 className='mb-6'>Menu</h1>
        {/* content Menus */}
        {data?.menus?.length ? (
          <TabsMenu menu={data?.menus} />
        ) : (
          <p className='text-md-regular text-neutral-500'>Sold menu</p>
        )}
      </div>

      <LoadMoreButton />

      <hr className='w-full bg-neutral-300' />
      {/* REVIEW */}
      <div className='space-y-6'>
        <h1>Review</h1>
        <div className='flex gap-1 items-center text-xl-extrabold'>
          <Star className='size-5 text-[#FFAB0D]' fill='#FFAB0D' />
          <span>{data.averageRating}</span>{' '}
          <span>({data.totalReviews} Ulasan)</span>
        </div>
        <div className='flex flex-wrap gap-5'>
          {data?.reviews?.length ? (
            data.reviews.map((rev: Review) => (
              <ReviewersCard key={rev.id} review={rev} />
            ))
          ) : (
            <p className='text-md-regular text-neutral-500'>Belum ada review</p>
          )}
        </div>
        <LoadMoreButton />
      </div>
    </Container>
  );
}

export default Detail;
