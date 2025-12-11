import { Badge } from '@/components/ui/badge';
import CardStore from '@/components/ui/CardStore';
import { Checkbox } from '@/components/ui/checkbox';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import Container from '@/styles/Container';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const dummyCategories = [
  { id: 1, name: 'Nearby' },
  { id: 2, name: 'Within 1 km' },
  { id: 3, name: 'Within 3 km' },
  { id: 3, name: 'Within 5 km' },
];

const dummyBooks = [
  {
    id: 1,
    title: 'Book Title',
    author: 'Author Name',
    image: '/cover-off.png',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Another Book',
    author: 'Writer',
    image: '/cover-off.png',
    rating: 5,
  },
];
function Category() {
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

              {dummyCategories.map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <Checkbox />
                  <label className='text-md-regular'>{item.name}</label>
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
                <InputGroupInput placeholder='Minimum Price' />
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
                <InputGroupInput placeholder='Maximum Price' />
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
                  <Checkbox />
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
        <div className='flex gap-4 w-full'>
          {dummyBooks.map((item) => (
            <Link key={item.id} to={`/detail/${item.id}`} className='block'>
              <CardStore
              //   name={item.title}
              //   author={item.author}
              //   image={item.image}
              //   rating={item.rating}
              />
              <CardStore
              //   name={item.title}
              //   author={item.author}
              //   image={item.image}
              //   rating={item.rating}
              />
              <CardStore
              //   name={item.title}
              //   author={item.author}
              //   image={item.image}
              //   rating={item.rating}
              />
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}

export default Category;
