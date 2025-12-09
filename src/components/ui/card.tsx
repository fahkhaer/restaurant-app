import { Star } from 'lucide-react';

type CardProps = {
  store?: string;
  location?: string;
  rating?: number;
  image?: string | null;
};

function Card({ store, location, rating, image }: CardProps) {
  return (
    <div className='shadow-card flex justify-end p-0 rounded-2xl w-[370px] items-center space-y-4'>
      {/* left side */}
      <div className='flex w-full gap-3'>
        <img
          className='h-[120px] w-auto rounded-md object-cover'
          src={image || '/src/assets/images/burger-king.png'}
          alt='image-cover'
        />

        <div className='flex justify-center flex-col gap-1'>
          {/* name */}
          <span className='text-lg-extrabold line-clamp-2'>
            {store || 'Burger King'}
          </span>
          {/* star */}
          <div className='flex gap-1 items-center'>
            <Star className='size-5 text-[#FFAB0D]' fill='#FFAB0D' />
            <span className='text-md-medium ml-1'>{rating ?? '4.9'}</span>
          </div>
          <span className='text-md-regular'>
            {location || 'Jakarta Selatan  2.4 km'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
