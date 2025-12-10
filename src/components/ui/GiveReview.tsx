import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Button } from './button';
import { Star } from 'lucide-react';
import { Textarea } from './textarea';

function GiveReview() {
  return (
    <div className='w-full md:w-auto flex flex-col md:block gap-[13px]'>
      <Dialog>
        <DialogTrigger>
          <Button variant={'secondary'} className='w-full md:w-[182px]'>
            <h3>Give Review</h3>
          </Button>
        </DialogTrigger>

        <DialogContent
          className='bg-white rounded-2xl '
          style={{ width: 'clamp(21.56rem, 43.17vw, 32.38rem)' }}
        >
          <DialogHeader>
            <DialogTitle>
              <p className='text-display-xs font-extrabold font-quicksand'>
                Give Review
              </p>
            </DialogTitle>

            <DialogDescription className='text-center place-items-center'>
              <p className='text-md leading-8 font-extrabold font-quicksand'>
                Give Rating
              </p>

              <div className='flex gap-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    // onClick={() => setStar(i + 1)}
                    className='inline-block size-[49px] cursor-pointer'
                    // stroke={i < star ? '#FFAB0D' : '#A4A7AE'}
                    // fill={i < star ? '#FFAB0D' : '#A4A7AE'}
                  />
                ))}
              </div>

              <Textarea
                className='mt-6 md:h-[235px] resize-none border border-neutral-300 rounded-xl py-2 px-3 text-neutral-300'
                placeholder='Please share your thoughts about this book'
              />
            </DialogDescription>
          </DialogHeader>

          <Button type='submit' className='w-full'>
            Send
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GiveReview;
