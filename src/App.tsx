import './App.css';
import Navbar from './components/NavbarGuest';
import NavbarGuest from './components/NavbarMain';

import Hero from './components/ui/Hero';

function App() {
  return (
    <>
    <NavbarGuest/>
    {/* <Navbar/> */}
    <div>

    <Hero/>
    </div>
    </>
  );
}

export default App;
