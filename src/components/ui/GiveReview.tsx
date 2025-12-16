import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { Button } from './button';
import { Star } from 'lucide-react';
import { Textarea } from './textarea';
import { useCreateReview } from '@/services/api/review';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type GiveReviewProps = {
  transactionId: string;
  restaurantId: number;
  menus: {
    menuId: number;
  }[];
  hasReviewed: boolean;
  onSuccess?: () => void;
};

function GiveReview({
  transactionId,
  restaurantId,
  menus,
  hasReviewed,
  onSuccess,
}: GiveReviewProps) {
  const { mutate, isPending } = useCreateReview();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');

  const menuIds = menus.map((menu) => menu.menuId);

  const handleSubmit = () => {
    if (!star || !menuIds.length) return;

    mutate(
      {
        transactionId,
        restaurantId,
        star,
        comment,
        menuIds,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setStar(0);
          setComment('');
          onSuccess?.();
        },
      }
    );
  };

  return (
    <div className='w-full md:w-auto'>
      {/* BUTTON — SELALU ADA */}
      <Button
        variant={hasReviewed ? 'outline' : 'secondary'}
        className='w-full md:w-[182px]'
        onClick={() => {
          if (hasReviewed) {
            navigate(`/review/${transactionId}`);
          } else {
            setOpen(true);
          }
        }}
      >
        {hasReviewed ? 'See Review' : 'Give Review'}
      </Button>

      {/* DIALOG — HANYA UNTUK GIVE REVIEW */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className='bg-white rounded-2xl'
          style={{ width: 'clamp(21.56rem, 43.17vw, 32.38rem)' }}
        >
          <DialogHeader>
            <DialogTitle className='text-display-xs font-extrabold'>
              Give Review
            </DialogTitle>

            <DialogDescription className='text-center'>
              <p className='text-md font-extrabold'>Give Rating</p>

              <div className='flex justify-center gap-1 mt-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    onClick={() => !isPending && setStar(i + 1)}
                    className='size-[40px] cursor-pointer'
                    stroke={i < star ? '#FFAB0D' : '#A4A7AE'}
                    fill={i < star ? '#FFAB0D' : '#A4A7AE'}
                  />
                ))}
              </div>

              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='mt-4 h-[160px] resize-none'
                placeholder='Please share your thoughts'
              />
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={handleSubmit}
            disabled={isPending || !star}
            className='w-full'
          >
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GiveReview;
