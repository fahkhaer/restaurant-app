import ProfileCard from '@/components/ProfileCard';
import SideBarProfile from '@/components/SideBarProfile';

function Profile() {
  return (
    <section className='flex gap-8'>
      <SideBarProfile />
      <ProfileCard />
    </section>
  );
}

export default Profile;
