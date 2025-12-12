import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default MainLayout;
