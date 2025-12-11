import ProfileCard from '@/components/ProfileCard';
import SideBarProfile from '@/components/SideBarProfile';
import Container from '@/styles/Container';

function Profile() {
  return (
    <Container className='flex gap-8'>
      <SideBarProfile />
      <ProfileCard />
    </Container>
  );
}

export default Profile;
