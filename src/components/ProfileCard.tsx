import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

function ProfileCard() {
  return (
    <section className='flex flex-col gap-6'>
      <h1>Profile</h1>
      <div className='shadow-card p-5 md:w-[524px] rounded-2xl bg-white'>
        <div className='space-y-3'>
          <Avatar>
            <AvatarImage
              className='object-cover size-16 rounded-full'
              src='https://github.com/shadcn.png'
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className='flex justify-between items-center'>
            <span>Name</span>
            <Input
              className='w-[250px] text-right text-md-bold'
              defaultValue='John Doe'
            />
          </div>

          <div className='flex justify-between'>
            <span>Email</span>
            <span className='text-md-bold'>johndoe@gmail.com</span>
          </div>

          <div className='flex justify-between'>
            <span>Nomor Handphone</span>
            <span className='text-md-bold'>08123456789</span>
          </div>

          <Button className='w-full'>Update Profile</Button>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
