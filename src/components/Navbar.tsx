import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/features/store';
import { GetProfile } from '@/services/api/profile';
import { GetCart } from '@/services/api/cart';
import { useLogout } from '@/services/api/auth';

type NavbarProps = {
  variant?: 'main' | 'default';
};

export default function Navbar({ variant = 'default' }: NavbarProps) {
  const { data } = GetCart();
  const logout = useLogout();

  const cartCount = data?.summary?.totalItems ?? 0;

  const user = useAppSelector((s) => s.auth.user);
  const isGuest = !user;

  const [scrolled, setScrolled] = useState(false);
  const isMain = variant === 'main';

  useEffect(() => {
    if (!isMain) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMain]);

  const { data: profile } = GetProfile();

  //fixed
  const bgFixed = isMain ? (scrolled ? 'fixed' : 'fixed') : '';

  // background
  const bgClass = isMain
    ? scrolled
      ? 'bg-white shadow-card'
      : 'bg-transparent'
    : 'bg-white';

  // text color
  const textColor = isMain
    ? scrolled
      ? 'text-neutral-950'
      : 'text-white'
    : 'text-neutral-950';

  // logo
  const logoSrc = isMain
    ? scrolled
      ? '/src/assets/icons/logored.png'
      : '/src/assets/icons/logo.png'
    : 'src/assets/icons/logored.png';

  return (
    <div
      className={` w-full flex h-20 px-4 md:px-[120px] justify-between items-center transition-all duration-300 ${bgClass} ${bgFixed} `}
    >
      {/* LOGO */}
      <Link to='/'>
        <div className='size-10 w-fit gap-4 flex'>
          <img className='h-auto' src={logoSrc} alt='Logo' />
          <p
            className={`hidden md:block items-center display-md-extrabold ${textColor}`}
          >
            Foody
          </p>
        </div>
      </Link>

      {/* RIGHT SECTION */}
      <div className='flex gap-4 items-center'>
        {/* GUEST */}
        {isGuest && (
          <>
            {/* Cart Mobile */}
            <Link className='lg:hidden block' to='/cart'>
              <div className='relative flex'>
                <Icon
                  className={`relative ${textColor}`}
                  icon='lets-icons:bag-fill'
                  width='32'
                  height='32'
                />
                <Badge className='p-1.5 text-center absolute font-bold left-5 bg-[#C12116] text-white size-5 min-w-5 rounded-full'>
                  {cartCount}
                </Badge>
              </div>
            </Link>
            {/* Desktop Guest Buttons */}
            <div className='hidden lg:flex gap-4 items-center'>
              <Link to='/login'>
                <Button
                  variant='outline'
                  className={`w-[163px] h-12 bg-transparent ${textColor}`}
                >
                  <span className='text-md-bold'>Sign In</span>
                </Button>
              </Link>

              <Link to='/login'>
                <Button variant='outline' className='w-[163px] h-12 bg-white'>
                  <span className='text-md-bold text-neutral-950'>Sign Up</span>
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* MAIN USER */}
        {!isGuest && (
          <>
            <Link to='/cart'>
              <div className='relative flex'>
                <Icon
                  className={`relative ${textColor}`}
                  icon='lets-icons:bag-fill'
                  width='32'
                  height='32'
                />
                {cartCount > 0 && (
                  <Badge className='p-1.5 text-center absolute font-bold left-5 bg-[#C12116] text-white size-5 min-w-5 rounded-full'>
                    <p>{cartCount}</p>
                  </Badge>
                )}
              </div>
            </Link>

            {/* Desktop Username */}
            <Link to='/profile' className='hidden lg:flex gap-4 items-center'>
              <Avatar>
                <AvatarImage
                  className='size-12 rounded-full'
                  src={profile?.avatar ?? 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <p className={`text-lg-semibold ${textColor}`}>{profile?.name}</p>
            </Link>
          </>
        )}

        {/* DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                className='h-12 lg:hidden rounded-full'
                src='https://github.com/shadcn.png'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='bg-white flex flex-col mr-4 w-[197px]'>
            <div>
              <DropdownMenuLabel className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage
                    className='h-9 rounded-full'
                    src='https://github.com/shadcn.png'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {user?.name ?? 'Guest'}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {!isGuest && (
                <>
                  <DropdownMenuItem>
                    <MapPin />
                    <span className='text-sm-medium text-neutral-950'>
                      Delivery Address
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Icon icon='akar-icons:file' width='24' height='24' />
                    <span className='text-sm-medium text-neutral-950'>
                      My Orders
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Icon icon='lets-icons:sign-out' width='20' height='20' />
                    <button
                      onClick={logout}
                      className='text-sm-medium text-neutral-950'
                    >
                      Logout
                    </button>
                  </DropdownMenuItem>
                </>
              )}
            </div>
            {/* LOGIN / REGISTER ALWAYS SHOWN */}

            <DropdownMenuItem asChild>
              <Link to='/login'>
                <Button variant='outline' className='w-full rounded-full'>
                  Login
                </Button>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to='/register'>
                <Button variant='secondary' className='w-full rounded-full'>
                  Register
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
