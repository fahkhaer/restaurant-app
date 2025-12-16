import { Badge } from '@/components/ui/badge';
import CardStore from '@/components/ui/CardStore';
import { Checkbox } from '@/components/ui/checkbox';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useDebounce } from '@/hooks/useDebounce';
import { GetRestaurants } from '@/services/api/restaurants';
import Container from '@/styles/Container';
import type { Restaurant } from '@/types/restaurant';
import { Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const dummyCategories = [
  { id: 1, name: 'Nearby' },
  { id: 2, name: 'Within 1 km', value: 1 },
  { id: 3, name: 'Within 3 km', value: 2 },
  { id: 4, name: 'Within 5 km', value: 3 },
];

function Category() {
  // klik filter
  const [range, setRange] = useState<number | undefined>();
  const [priceMin, setPriceMin] = useState<number | undefined>();
  const [priceMax, setPriceMax] = useState<number | undefined>();
  const [rating, setRating] = useState<number | undefined>();

const debouncedPriceMin = useDebounce(priceMin, 600);
const debouncedPriceMax = useDebounce(priceMax, 600);


  const {
    data: resto,
    isLoading: restoLoading,
    isError: restoError,
  } = GetRestaurants({
    location: 'Jakarta',
    range,
 priceMin: debouncedPriceMin,
  priceMax: debouncedPriceMax,
    rating: undefined,
    page: 1,
    limit: 20,
  }) as {
    data: { restaurants: Restaurant[] };
    isLoading: boolean;
    isError: boolean;
  };
  console.log('filterr', resto);

const filteredRestaurants = useMemo(() => {
  if (!resto?.restaurants) return [];

  if (rating == null) return resto.restaurants;

  return resto.restaurants.filter(
    (item) => Math.floor(item.star) === rating
  );
}, [resto?.restaurants, rating]);


  if (restoLoading) return <p>Loading...</p>;
  if (restoError) return <p>Error</p>;

  return (
    <Container>
      <h1 className='pb-5'>All Restaurant</h1>
      <section className='flex gap-5 md:pb-[97px]'>
        <div className='w-full shadow-card max-w-[266px] rounded-xl py-4 space-y-6'>
          {/* Category */}
          <div className=' space-y-2.5 px-4'>
            <div className='space-y-2.5'>
              <span className='text-md-extrabold'>FILTER</span>
              <div className='text-lg-extrabold'>Distance</div>

              {dummyCategories.map((category) => (
                <div key={category.id} className='flex items-center gap-2'>
                  <Checkbox
                    checked={range === category.value}
                    onCheckedChange={() =>
                      setRange(
                        range === category.value ? undefined : category.value
                      )
                    }
                  />
                  <label className='text-md-regular'>{category.name}</label>
                  
                </div>
              ))}
            </div>
          </div>

          <hr className='border-neutral-300' />

          {/* Price */}
          <div className='w-full max-w-[266px] rounded-xl'>
            <div className='space-y-2.5 px-4'>
              <div className='text-lg-extrabold'>Price</div>

              <InputGroup>
                <InputGroupInput
                  placeholder='Minimum Price'
                  onChange={(e) =>
                    setPriceMin(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
                <InputGroupAddon className='h-[54px]'>
                  <Badge
                    className='text-neutral-950 h-full'
                    variant={'secondary'}
                  >
                    <span className='text-md-regular'>Rp</span>
                  </Badge>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput
                  placeholder='Maximum Price'
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                />
                <InputGroupAddon className='h-[54px]'>
                  <Badge
                    className='text-neutral-950 h-full'
                    variant={'secondary'}
                  >
                    <span className='text-md-regular'>Rp</span>
                  </Badge>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <hr className='border-neutral-300' />

          {/* Rating */}
          <div className='space-y-2.5 px-4'>
            <div className='text-lg-extrabold'>Rating</div>
            <div className='space-y-4'>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className='flex items-center gap-2'>
                  <Checkbox
                    checked={rating === star}
                    onCheckedChange={() =>
                      setRating(rating === star ? undefined : star)
                    }
                  />
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-[#FFAB0D] stroke-transparent' />
                    <span className='text-md-regular'>{star}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className='grid grid-cols-2 gap-5 h-fit'>
          {resto?.restaurants?.length === 0 ? (
            <div className='col-span-1 text-neutral-500 '>
              <p className='text-lg font-semibold'>No restaurant found</p>
              <p className='text-sm'>Try adjusting your filter</p>
            </div>
          ) : (
            filteredRestaurants.map((item: Restaurant) => (
              <Link key={item.id} to={`/detail/${item.id}`}>
                <CardStore
                  name={item.name}
                  logo={item.logo}
                  rating={item.star}
                  location={item.place}
                />
              </Link>
            ))
          )}
        </div>
      </section>
    </Container>
  );
}

export default Category;
