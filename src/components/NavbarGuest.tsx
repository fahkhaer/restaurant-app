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

function NavbarGuest() {
  return (
    <div
      className='fixed w-full flex h-20 px-4 md:px-[120px] justify-between 
items-center'
    >
      {/* logo */}
      <Link to={'/'}>
        <div className='size-10 w-fit gap-4 flex'>
          <img
            className='h-auto'
            src='src/assets/icons/logo.png'
            alt='Logo-text'
            style={{ width: 'clamp(2.5rem, 3.5vw, 2.63rem)' }}
          />
          <p className='hidden md:block text-white items-center  display-md-extrabold'>
            Foody
          </p>
        </div>
      </Link>

      {/* Right Icons */}
      {/* mobile */}
      <div className='flex gap-4 items-center'>
        <Link className='lg:hidden block' to={'/cart'}>
          <div className='relative flex'>
            <Icon
              className='relative text-white'
              icon='lets-icons:bag-fill'
              width='32'
              height='32'
            />
            <Badge className='absolute hover:bg-red-700 left-5 bg-[#EE1D52] text-white h-5 min-w-5 text-center  rounded-[833.33px] tabular-nums p-[6.67px]  '>
              1
            </Badge>
          </div>
        </Link>
        <div className='hidden lg:flex gap-4 items-center '>
          <Link to={'/login'}>
            <Button
              variant={'outline'}
              type='submit'
              className='w-[163px] h-12 text-white bg-transparent'
            >
              <span className='text-md-bold'>Sign In</span>
            </Button>{' '}
          </Link>
          <Link to={'/login'}>
            <Button
              variant={'outline'}
              type='submit'
              className='w-[163px] h-12 bg-white'
            >
              <span className='text-md-bold text-neutral-950'>Sign Up</span>
            </Button>{' '}
          </Link>
        </div>
        {/* dropdown */}
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
                    className='h-9 lg:hidden rounded-full'
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
                <span className='text-sm-medium text-neutral-950'>Logout </span>
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
  );
}

export default NavbarGuest;
