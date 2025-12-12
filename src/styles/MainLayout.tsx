import Footer from '@/components/Footer';
import NavbarMain from '@/components/NavbarMain';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <main>
        <NavbarMain />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default MainLayout;
