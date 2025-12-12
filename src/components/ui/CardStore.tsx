import { Star } from 'lucide-react';
import type { ReactNode } from 'react';

type CardProps = {
  name?: string;
  location?: string;
  rating?: number;
  logo?: string | null;
  rightContent?: ReactNode;
};

function CardStore({ name, location, rating, logo, rightContent }: CardProps) {
  return (
    <div className='shadow-card flex justify-between p-0 rounded-2xl w-full items-center space-y-4'>
      {/* left side */}
      <div className='flex w-[370px] gap-3'>
        <img
          className='h-[120px] w-auto rounded-md object-cover'
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
            {location || 'Jakarta Selatan •  2.4 km'}
          </span>
        </div>
      </div>
      <div className='w-full md:w-auto flex flex-col md:block gap-[13px]'>
        {rightContent}
        {/* <Dialog>
          <DialogTrigger>
            <Button variant={'secondary'} className='w-full md:w-[182px]'>
              <h3>Give Review</h3>
            </Button>
          </DialogTrigger>

          <DialogContent
            className='bg-white rounded-2xl'
            style={{ width: 'clamp(21.56rem, 43.17vw, 32.38rem)' }}
          >
            <DialogHeader>
              <DialogTitle>
                <p className='text-display-xs font-extrabold font-quicksand'>
                  Give Review
                </p>
              </DialogTitle>

              <DialogDescription className='text-center'>
                <p className='text-md leading-8 font-extrabold font-quicksand'>
                  Give Rating
                </p>
                <div className='flex gap-1 justify-center'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className='inline-block size-[49px]'
                      stroke={i < rating ? '#FFAB0D' : '#A4A7AE'}
                      fill={i < rating ? '#FFAB0D' : '#A4A7AE'}
                    />
                  ))}
                </div>
                ..
              </DialogDescription>
            </DialogHeader>

            <Button variant={'secondary'} className='w-full'>
              <h3>Send</h3>
            </Button>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  );
}

export default CardStore;
