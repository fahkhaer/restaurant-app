import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  className?: string;
  imgClassName?: string;
  name?: string;
  price?: string;
  image?: string | null;
  style?: React.CSSProperties;
  rightContent?: ReactNode;
  variant?: 'default' | 'flex';
};

function CardMenu({
  className,
  imgClassName,
  name,
  price,
  image,
  style,
  rightContent,
  variant = 'default',
}: CardProps) {
  return (
    <>
      {variant === 'default' && (
        <div className={cn('rounded-2xl', className)} style={style}>
          <img
            className='size-[285px] rounded-t-2xl'
            src={image || './src/assets/images/price.png'}
            alt='food-menu'
          />
          <div className='flex-between p-3 md:p-4'>
            <div>
              <span className='text-md-medium'>{name}</span>
              <h1 className='text-lg-extrabold'>Rp.{price}</h1>
            </div>
            {rightContent}
          </div>
        </div>
      )}
      {variant === 'flex' && (
        <div
          className={cn(
            'rounded-2xl flex justify-between items-center',
            className
          )}
          style={style}
        >
          <div className='flex items-center'>
            <img
              className={cn(
                'size-[285px] rounded-l-2xl object-cover',
                imgClassName
              )}
              src={image || './src/assets/images/price.png'}
              alt='food-menu'
            />

            <div className='flex-between p-3 md:p-4'>
              <div>
                <span className='text-md-medium'>{name}</span>
                <h1 className='text-lg-extrabold'>Rp.{price}</h1>
              </div>
            </div>
          </div>
          {rightContent}
        </div>
      )}
    </>
  );
}

export default CardMenu;
