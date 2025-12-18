import './App.css';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/ui/search';

function App() {
  return (
    <>
      <Navbar variant='main' />
      <div className="bg-[url('./assets/images/hero.png')] bg-cover w-full text-white flex-center items-center h-screen text-center bg-center">
        <div>
          <div className='flex pb-6 md:pb-10 flex-col gap-2 '>
            <span className='display-2xl-extrabold'>
              Explore Culinary Experiences
            </span>
            <p className='display-xs-bold'>
              Search and refine your choice to discover the perfect restaurant.
            </p>
          </div>
          <SearchBar />
        </div>
      </div>
      <Home />
      <Footer />
    </>
  );
}

export default App;
