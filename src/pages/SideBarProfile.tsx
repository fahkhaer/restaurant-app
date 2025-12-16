import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Icon } from '@iconify/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';
import MyOrderPage from '@/pages/MyOrderPage';
import Container from '@/styles/Container';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { GetProfile } from '@/services/api/profile';
import { useLogout } from '@/services/api/auth';

function SideBarProfile() {
  const { data } = GetProfile();
  const logout = useLogout();

  const location = useLocation();
  const defaultTab = useMemo(() => {
    return location.pathname.includes('my-order') ? 'my-order' : 'profile';
  }, [location.pathname]);

  return (
    <Container className='mb-25'>
      <Tabs defaultValue={defaultTab} className='md:w-60 flex gap-8'>
        <div className='h-[274px] space-y-2 shadow-card p-5 rounded-2xl'>
          {/* User */}
          <TabsList className='flex bg-transparent p-0 justify-between '>
            <TabsTrigger
              value='profile'
              className='flex bg-transparent p-0 gap-2 data-[state=active]:border-none  data-[state=active]:shadow-none data-[state=active]:bg-none w-full justify-start'
            >
              <Avatar>
                <AvatarImage
                  className='size-12 object-cover rounded-full'
                  src={data?.avatar ?? 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className='text-lg-bold'>{data?.name}</span>
            </TabsTrigger>
          </TabsList>
          <hr className='bg-neutral-200 my-6' />

          {/* Tabs */}
          <TabsList className='flex flex-col space-y-2 mt-18 bg-transparent p-0 gap-2'>
            <TabsTrigger
              value='address'
              className='
              flex w-full justify-start gap-2 p-2
              rounded-md
              hover:bg-neutral-100
              data-[state=active]:bg-neutral-100
              data-[state=active]:text-[#C12116]'
            >
              <MapPin className='size-6 shrink-0' />
              <span className='text-md-medium'>Delivery Address</span>
            </TabsTrigger>

            <TabsTrigger
              value='my-order'
              className='
              flex w-full justify-start gap-2 p-2
              rounded-md
              hover:bg-neutral-100
              data-[state=active]:bg-neutral-100
              data-[state=active]:text-[#C12116]'
            >
              <Icon icon='akar-icons:file' width='24' height='24' />
              <span className='text-md-medium'>My Orders</span>
            </TabsTrigger>

            <TabsTrigger
              value='logout'
              className='
              flex w-full justify-start gap-2 p-2
              rounded-md
              hover:bg-neutral-100'
            >
              <Icon icon='lets-icons:sign-out' width='24' height='24' />
              <button onClick={logout} type='button' className='text-md-medium'>
                Logout
              </button>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className='flex'>
          {/* profile */}
          <TabsContent className='m-0 w-full' value='profile'>
            <ProfileCard />
          </TabsContent>
          {/* delivery address */}
          <TabsContent value='address' className='m-0 w-full'>
            <div className='shadow-card w-3xl rounded-2xl space-y-5 p-5 '>
              <div className='flex items-center gap-2'>
                <img
                  className='size-8 rounded-t-2xl'
                  src='./src/assets/icons/map-logo.png'
                  alt='map-logo'
                />
                <span className='text-lg-extrabold'>Delivery Address</span>
              </div>
              <div className='text-md-medium'>
                Jl. Sudirman No. 25, Jakarta Pusat, 10220
                <p>0812-3456-7890</p>
              </div>

              <Button className='w-30' variant={'outline'}>
                Change
              </Button>
            </div>
          </TabsContent>
          {/* my order */}
          <TabsContent className='m-0' value='my-order'>
            <MyOrderPage />
          </TabsContent>
        </div>
      </Tabs>
    </Container>
  );
}

export default SideBarProfile;
