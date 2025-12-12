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

function NavbarMain() {
  const user = { role: 'USER' };
  const username = 'JohnDoe';
  const cartCount = 3;
  return (
    <div className=' bg-white w-full flex h-20 px-4 md:px-[120px] justify-between items-center'>
      {/* logo */}
      <Link to={'/'}>
        <div className='size-10 w-fit gap-4 flex'>
          <img
            className='h-auto'
            src='src/assets/icons/logored.png'
            alt='Logo-text'
            style={{ width: 'clamp(2.5rem, 3.5vw, 2.63rem)' }}
          />
          <p className='hidden md:block items-center text-neutral-950 display-md-extrabold'>
            Foody
          </p>
        </div>
      </Link>

      {/* Right Icons */}
      <div className='flex gap-6 items-center '>
        {/* cart */}
        {user?.role !== 'ADMIN' && (
          <Link to={'/cart'}>
            <div className='relative flex'>
              <Icon
                className='relative text-neutral-950'
                icon='lets-icons:bag-fill'
                width='32'
                height='32'
              />
              {cartCount > 0 && (
                <Badge className='absolute hover:bg-red-700 left-5 bg-[#EE1D52] text-white h-5 min-w-5 text-center rounded-[833.33px] font-mono tabular-nums p-[6.67px]'>
                  {cartCount}
                </Badge>
              )}
            </div>
          </Link>
        )}

        <div className='flex gap-4 items-center'>
          <Link
            to={
              user?.role === 'ADMIN'
                ? '/admin'
                : user?.role === 'USER'
                ? '/user'
                : '/user'
            }
            className='flex gap-4 items-center'
          >
            <Avatar>
              <AvatarImage
                className='h-12 lg:block hidden rounded-full'
                src='https://github.com/shadcn.png'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className='text-lg-semibold text-neutral-950 hidden lg:block'>
              {username}
            </p>
          </Link>

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
                  John Doe
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <MapPin />
                  <span className='text-sm-medium text-neutral-950'>
                    Delivery Address
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon icon='akar-icons:file' width='24' height='24' />{' '}
                  <span className='text-sm-medium text-neutral-950'>
                    My Orders
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon
                    className='text-white stroke-black fill-black stroke-1'
                    icon='lets-icons:sign-out'
                    width='20'
                    height='20'
                  />{' '}
                  <span className='text-sm-medium text-neutral-950'>
                    Logout{' '}
                  </span>
                </DropdownMenuItem>
              </div>

              <div>
                {/* login-logout */}
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
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default NavbarMain;
