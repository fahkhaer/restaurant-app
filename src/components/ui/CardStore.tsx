import { Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type CardProps = {
  name?: string;
  location?: string;
  rating?: number;
  logo?: string | null;
  coordinate?: number;
  rightContent?: ReactNode;
  className?: string;
  isLoading?: boolean;
};

function CardStore({
  name,
  location,
  rating,
  coordinate,
  logo,
  rightContent,
  className,
  isLoading = false,
}: CardProps) {
  if (isLoading) {
    return (
      <div
        className={`shadow-card flex justify-between p-4 rounded-2xl w-full items-center ${
          className || ''
        }`}
      >
        {/* left */}
        <div className='flex w-[370px] gap-3'>
          <Skeleton className='size-[120px] rounded-md' />

          <div className='flex flex-col gap-2 w-full'>
            <Skeleton className='h-5 w-40' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-52' />
          </div>
        </div>

        {/* right */}
        <Skeleton className='h-10 w-[140px] rounded-md' />
      </div>
    );
  }

  return (
    <div
      className={`shadow-card flex justify-between p-0 rounded-2xl w-full items-center space-y-4 ${
        className || ''
      }`}
    >
      {/* left side */}
      <div className='flex w-[370px] gap-3'>
        <img
          className='size-[120px] rounded-md object-cover'
          src={logo || '/src/assets/images/burger-king.png'}
          alt='company-logo'
        />

        <div className='flex justify-center flex-col gap-1'>
          {/* name */}
          <span className='text-lg-extrabold line-clamp-2'>
            {name || 'Burger King'}
          </span>
          {/* star */}
          <div className='flex gap-1 items-center'>
            <Star className='size-5 text-[#FFAB0D]' fill='#FFAB0D' />
            <span className='text-md-medium ml-1'>{rating ?? '4.9'}</span>
          </div>

          <span className='text-md-regular'>
            {location || 'unknown location'} •{' '}
            {coordinate == null || isNaN(coordinate)
              ? 'unknown km'
              : coordinate < 1
              ? `${Math.round(coordinate * 1000)} m`
              : `${coordinate.toFixed(1)} km`}
          </span>
        </div>
      </div>

      <div className='w-full md:w-auto flex flex-col md:block gap-[13px]'>
        {rightContent}
      </div>
    </div>
  );
}

export default CardStore;
