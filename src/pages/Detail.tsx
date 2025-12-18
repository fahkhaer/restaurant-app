import TabsMenu from '@/components/TabsMenu';
import { Button } from '@/components/ui/button';
import CardStore from '@/components/ui/CardStore';
import ReviewersCard from '@/components/ui/ReviewersCard';
import { GetDetail } from '@/services/api/restaurants';
import Container from '@/styles/Container';
import { Icon } from '@iconify/react';
import { Star } from 'lucide-react';
import errorImg from '/images/image-off.png';
import { getDistanceKm } from '@/lib/utils/distance';
import type { Review } from '@/types/reviews';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DataAlert from '@/components/ui/custom/dataAlert';
import { Skeleton } from '@/components/ui/skeleton';
import LoadMoreButton from '@/components/ui/custom/LoadMoreButton';

function Detail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = GetDetail(id);

  // alert add to cart
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message?: string;
  } | null>(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

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

  if (isError) return <p>Error</p>;

  return (
    <Container className='space-y-8 pb-12'>
      {/* images */}
      <div className='flex gap-2.5'>
        {isLoading ? (
          <>
            <Skeleton className='h-[470px] w-1/2 rounded-2xl' />
            <div className='w-1/2 space-y-5'>
              <Skeleton className='h-[302px] w-full rounded-2xl' />
              <div className='flex gap-5 h-[148px]'>
                <Skeleton className='w-1/2 rounded-2xl' />
                <Skeleton className='w-1/2 rounded-2xl' />
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      {/* store */}
      {isLoading ? (
        <Skeleton className='h-[88px] w-full rounded-2xl' />
      ) : (
        <CardStore
          name={data?.name}
          rating={data?.star}
          location={data?.place}
          coordinate={distance}
          className='shadow-none!'
          rightContent={
            <Button className='text-md-bold w-[140px]' variant='outline'>
              <Icon
                icon='material-symbols:share-outline'
                width='18'
                height='20'
              />
              Share
            </Button>
          }
        />
      )}

      <hr className='w-full bg-neutral-300' />

      {/* MENU */}
      {alert && <DataAlert type={alert.type} message={alert.message} />}
      <div>
        <h1 className='mb-6'>Menu</h1>
        {/* content Menus */}
        {isLoading ? (
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className='h-24 w-full rounded-2xl' />
            ))}
          </div>
        ) : data?.menus?.length ? (
          <TabsMenu
            restaurantId={data?.id}
            menu={data?.menus}
            setAlert={setAlert}
          />
        ) : (
          <p className='text-md-regular text-neutral-500'>Sold menu</p>
        )}
      </div>

      <LoadMoreButton />

      <hr className='w-full bg-neutral-300' />
      {/* REVIEW */}
      <div className='space-y-6'>
        <h1>Review</h1>

        {isLoading ? (
          <>
            <Skeleton className='h-6 w-40' />
            <div className='flex gap-5'>
              {[1, 2].map((i) => (
                <Skeleton key={i} className='h-[140px] w-[300px] rounded-2xl' />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className='flex gap-1 items-center text-xl-extrabold'>
              <Star className='size-5 text-[#FFAB0D]' fill='#FFAB0D' />
              <span>{data.averageRating}</span>
              <span>({data.totalReviews} Ulasan)</span>
            </div>
            <div className='flex flex-wrap gap-5'>
              {data?.reviews?.length ? (
                data.reviews.map((rev: Review) => (
                  <ReviewersCard key={rev.id} review={rev} />
                ))
              ) : (
                <p className='text-md-regular text-neutral-500'>
                  Belum ada review
                </p>
              )}
            </div>
          </>
        )}
        <LoadMoreButton />
      </div>
    </Container>
  );
}

export default Detail;
