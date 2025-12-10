import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  className?: string;
  name?: string;
  price?: string;
  image?: string | null;
  style?: React.CSSProperties;
  rightContent?: ReactNode;
};

function CardMenu({
  className,
  name,
  price,
  image,
  style,
  rightContent,
}: CardProps) {
  return (
    <div className={cn('rounded-2xl', className)} style={style}>
      <img
        className='size-[285px] rounded-tr-2xl rounded-tl-2xl'
        src={image || './src/assets/images/price.png'}
        alt='food-menu'
      />
      <div className='flex-between p-3 md:p-4 '>
        <div>
          <span className='text-md-medium'>{name}</span>
          <h1 className='text-lg-extrabold'>Rp.{price}</h1>
        </div>
        {rightContent}
      </div>
    </div>
  );
}

export default CardMenu;
