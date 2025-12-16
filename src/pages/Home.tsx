import { Button } from '@/components/ui/button';
import CardStore from '@/components/ui/CardStore';
import LoadMoreButton from '@/components/ui/LoadMoreButton';
import { getDistanceKm } from '@/lib/utils/distance';
import { GetBestSeller, GetRecomendation } from '@/services/api/restaurants';
import type { RecommendationItem } from '@/types/restaurant';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const { data, isLoading, isError } = GetRecomendation();

  const [activeFilter, setActiveFilter] = useState<string>('All Restaurant');

  const { data: bestseller, isLoading: loadingBestseller } = GetBestSeller({
    page: 1,
    limit: 20,
    category:
      activeFilter === 'Best Seller'
        ? 'best-seller'
        : activeFilter === 'Nearby'
        ? 'nearby'
        : undefined,
  });

  console.log('debesr', bestseller);

  //coordinate
  const userLocation = { lat: -6.2, long: 106.8 }; // Contoh: lokasi user // belum

  if (isLoading) return <p>Loading...</p>;
  if (loadingBestseller) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  const restaurants = activeFilter === 'Best Seller' ? bestseller ?? [] : [];

  const filter = [
    { desc: 'All Restaurant' },
    { desc: 'Nearby' },
    { desc: 'Best Seller' },
    { desc: 'Category' },
    { desc: 'Delivery' },
    { desc: 'Lunch' },
  ];

  return (
    <section className='custom-container mb-25'>
      <div className='flex justify-between flex-wrap gap-3 my-10'>
        {filter.map((item, i) => {
          console.log('itemnihh', item);
          return (
            <button
              key={i}
              onClick={() => setActiveFilter(item.desc)}
              className={`shadow-card rounded-2xl flex flex-col p-2 gap-2 flex-1 min-w-26.5 max-w-40.5 ${
                activeFilter === item.desc
                  ? 'bg-blue-200 ring-2 ring-blue-300'
                  : 'bg-white'
              }`}
            >
              <div className='w-full bg-[#E0ECFF] rounded-xl p-3 grid place-items-center'>
                <img
                  className='size-12'
                  src={`/src/assets/images/${item.desc}.png`}
                  alt='icon'
                />
              </div>
              <p className='text-lg-bold text-center'>{item.desc}</p>
            </button>
          );
        })}
      </div>
      <div className='flex justify-between mb-8 items-center'>
        <span className='display-md-extrabold'>Recommended </span>
        <span>
          <Button variant={'link'}>See All</Button>
        </span>
      </div>

      <div className='flex flex-wrap justify-between gap-10'>
        {restaurants.map((item: RecommendationItem, i: number) => {
          const distanceKm =
            item.lat != null && item.long != null
              ? getDistanceKm(
                  userLocation.lat,
                  userLocation.long,
                  item.lat,
                  item.long
                )
              : undefined;

          return (
            <Link key={i} to={`/detail/${item?.id}`}>
              <CardStore
                name={item.name}
                location={item.place}
                rating={item.star}
                logo={item.logo}
                coordinate={distanceKm}
              />
            </Link>
          );
        })}
      </div>
      <LoadMoreButton className='mt-[41px]' />
    </section>
  );
}

export default Home;
