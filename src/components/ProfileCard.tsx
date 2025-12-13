import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { GetProfile, UpdateProfile } from '@/services/api/profile';
import { useRef, useState, useEffect } from 'react';
import DataAlert from './ui/custom/dataAlert';

function ProfileCard() {
  const { data, isLoading, isError } = GetProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message?: string;
  } | null>(null);
  const [updating, setUpdating] = useState(false); // untuk loading info

  // Sync API data ke state saat data tersedia
  useEffect(() => {
    if (data) {
      setName(data.name ?? '');
      setEmail(data.email ?? '');
      setPhone(data.phone ?? '');
    }
  }, [data]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Error loading profile</p>;

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const res = await UpdateProfile({
        name,
        email,
        phone,
        avatar: selectedFile ?? undefined,
      });
      console.log('Profile updated:', res);
      setAlert({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error: unknown) {
      console.error('Update failed:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Update failed';
      setAlert({ type: 'error', message: errorMessage });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section className='flex flex-col gap-6'>
      <h1>Profile</h1>
      <div className='shadow-card p-5 w-[524px] rounded-2xl bg-white'>
        <div className='space-y-3'>
          {/* Avatar + Upload */}
          <div className='flex items-center justify-between gap-4'>
            <Avatar>
              <AvatarImage
                className='object-cover size-16 rounded-full'
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : data?.avatar ?? 'https://github.com/shadcn.png'
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <Button onClick={handleUploadClick}>Upload</Button>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Form fields */}
          <div className='flex justify-between items-center'>
            <span>Name</span>
            <Input
              className='w-[250px] text-right text-md-bold'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='flex justify-between'>
            <span>Email</span>
            <Input
              className='text-md-bold text-right w-[250px]'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex justify-between'>
            <span>Nomor Handphone</span>
            <Input
              className='text-md-bold text-right w-[250px]'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Update button */}
          <Button className='w-full' onClick={handleUpdate} disabled={updating}>
            {updating ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>
      </div>

      {/* Alert */}
      {alert && <DataAlert type={alert.type} message={alert.message} />}
    </section>
  );
}

export default ProfileCard;
