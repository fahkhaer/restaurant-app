import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { GetProfile } from '@/services/api/profile';

function ProfileCard() {
  const { data, isLoading, isError } = GetProfile();

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <section className='flex flex-col gap-6'>
      <h1>Profile</h1>
      <div className='shadow-card p-5 md:w-[524px] rounded-2xl bg-white'>
        <div className='space-y-3'>
          <Avatar>
            <AvatarImage
              className='object-cover size-16 rounded-full'
              src={`${data?.avatar ?? 'https://github.com/shadcn.png'}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className='flex justify-between items-center'>
            <span>Name</span>
            <Input
              className='w-[250px] text-right text-md-bold'
              defaultValue={data?.name}
            />
          </div>

          <div className='flex justify-between'>
            <span>Email</span>
            <span className='text-md-bold'>{data?.email}</span>
          </div>

          <div className='flex justify-between'>
            <span>Nomor Handphone</span>
            <span className='text-md-bold'>{data?.phone}</span>
          </div>

          <Button className='w-full'>Update Profile</Button>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
