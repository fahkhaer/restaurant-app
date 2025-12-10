import { Icon } from '@iconify/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';

function SideBarProfile() {
  return (
    <>
      <div className='hidden md:block h-[274px] space-y-2 md:w-60 shadow-card p-5 rounded-2xl'>
        {/* User */}
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage
              className='w-30 size-12 object-cover rounded-full'
              src='https://github.com/shadcn.png'
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className='text-lg-bold'>John Doe</span>
        </div>

        {/* Separator */}
        <hr className='bg-neutral-200 my-6' />

        {/* List */}
        <div className='flex items-center gap-2 mb-2 p-2 cursor-pointer hover:bg-neutral-100 rounded-md'>
          <MapPin className='size-6' />
          <span className='text-md-medium'>Delivery Address</span>
        </div>

        <div className='flex text-[#C12116] items-center gap-2 p-2 cursor-pointer hover:bg-neutral-100 rounded-md'>
          <Icon icon='akar-icons:file' width='24' height='24' />
          <span className='text-md-medium'>My Orders</span>
        </div>

        <div className='flex items-center gap-2 p-2 cursor-pointer hover:bg-neutral-100 rounded-md'>
          <Icon
            className='text-white stroke-black stroke-1.5'
            icon='lets-icons:sign-out'
            width='24'
            height='24'
          />
          <span className='text-md-medium'>Logout</span>
        </div>
      </div>
      {/* mobile ver */}
      <div className='md:hidden border-t-2 flex justify-between fixed items-center w-full left-0 bottom-0 shadow-card p-4 bg-white'>
        jkdsh
      </div>
    </>
  );
}

export default SideBarProfile;
