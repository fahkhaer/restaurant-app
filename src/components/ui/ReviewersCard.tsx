import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import type { Review } from '@/types/reviews';

dayjs.locale('id');
interface ReviewersCardProps {
  review?: Review;
}

export default function ReviewersCard({ review }: ReviewersCardProps) {
  const userName = review?.user?.name ?? 'Unknown User';
  const comment = review?.comment ?? 'No comment provided.';
  const star = review?.star ?? 0;
  const date = review?.createdAt
    ? dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')
    : 'Tanggal tidak tersedia';
  const avatarUrl = review?.user?.avatar || 'https://github.com/shadcn.png';

  return (
    <div className='shadow-card bg-white flex flex-col rounded-2xl basis-full md:basis-[calc(50%-0.625rem)] gap-4 p-4'>
      {/* Profile */}
      <div className='flex gap-3 h-16 items-center'>
        <Avatar className='size-16'>
          <AvatarImage
            className='rounded-full object-cover'
            src={avatarUrl}
            alt={userName}
          />
          <AvatarFallback>
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <span className='text-lg-extrabold'>{userName}</span>
          <p className='text-[#0A0D12] text-md-regular'>{date}</p>
        </div>
      </div>
      {/* comment */}
      <div className='flex-col gap-.5 '>
        {/* Star rating */}
        <div className='flex gap-0.5 mb-2'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className='size-6'
              stroke={i < star ? '#FFAB0D' : '#A4A7AE'}
              fill={i < star ? '#FFAB0D' : '#A4A7AE'}
            />
          ))}
        </div>
        {/* Comment */}
        <span className='text-md-regular'>{comment}</span>
      </div>
    </div>
  );
}
