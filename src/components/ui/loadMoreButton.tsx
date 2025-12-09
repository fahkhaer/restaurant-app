import { cn } from '@/lib/utils';
import { Button } from './button';

type LoadMoreButtonProps = {
  className?: string;
  onClick?: () => void;
};

function LoadMoreButton({ className, onClick }: LoadMoreButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={'outline'}
      className={cn(
        'mx-auto p-2 rounded-[100px] flex items-center justify-center text-md-bold ',
        'border border-neutral-300 hover:bg-neutral-50',
        'md:w-40 w-full h-12',
        className
      )}
    >
      Show More
    </Button>
  );
}

export default LoadMoreButton;
