import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

function Navbar() {
  // Dummy data untuk UI
  const user = { role: 'USER' };
  const username = 'JohnDoe';
  const cartCount = 3;

  return (
    <div
      className='flex  bg-black h-20 px-4 md:px-[120px] justify-between shadow-[0_0_20px_0_#CBCACA40]
items-center'
    >
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
      <div className='flex gap-6 items-center '>
        {user?.role !== 'ADMIN' && (
          <Link to={'/cart'}>
            <div className='relative flex'>
              <Icon
                className='relative text-white'
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
                className='h-12 rounded-full'
                src='https://github.com/shadcn.png'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className='text-lg-semibold text-white hidden lg:block'>{username}</p>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className='lg:hidden'>
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white'>
              <DropdownMenuSeparator />

              {user?.role === 'ADMIN' ? (
                <>
                  <Link to='admin?tab=borrowers'>
                    <DropdownMenuItem>Borrowed List</DropdownMenuItem>
                  </Link>
                  <Link to='/admin?tab=userlist'>
                    <DropdownMenuItem>User</DropdownMenuItem>
                  </Link>
                  <Link to='/admin?tab=booklist'>
                    <DropdownMenuItem>Booklist</DropdownMenuItem>
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/user?tab=profile'>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link to='/user?tab=borrowedlist'>
                    <DropdownMenuItem>Borrowed List</DropdownMenuItem>
                  </Link>
                  <Link to='/user?tab=reviews'>
                    <DropdownMenuItem>Reviews</DropdownMenuItem>
                  </Link>
                </>
              )}

              <DropdownMenuItem className='text-[#EE1D52]'>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
