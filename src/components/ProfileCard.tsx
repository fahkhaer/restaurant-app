import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { GetProfile } from '@/services/api/profile';
import { useRef } from 'react';

function ProfileCard() {
  const { data, isLoading, isError } = GetProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
      //api here
    }
  };

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <section className='flex flex-col gap-6'>
      <h1>Profile</h1>
      <div className='shadow-card p-5 w-[524px] rounded-2xl bg-white'>
        <div className='space-y-3'>
          <div className='flex justify-between items-center'>
            <Avatar>
              <AvatarImage
                className='object-cover size-16 rounded-full'
                src={`${data?.avatar ?? 'https://github.com/shadcn.png'}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <Button onClick={handleUploadClick}>Upload</Button>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden '
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <span>Name</span>
            <Input
              className='w-[250px] text-right text-md-bold'
              defaultValue={data?.name}
            />
          </div>

          <div className='flex justify-between'>
            <span>Email</span>
            <Input
              className='text-md-bold text-right w-[250px]'
              defaultValue={data?.email}
            />
          </div>

          <div className='flex justify-between'>
            <span>Nomor Handphone</span>
            <Input
              className='text-md-bold text-right w-[250px]'
              defaultValue={data?.phone}
            />
          </div>

          <Button className='w-full'>Update Profile</Button>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
