import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import AuthPage from './pages/AuthPage';
import Success from './pages/Success';
import { store } from './features/store';
import AuthLayout from './styles/AuthLayout';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Detail from './pages/Detail';
import MainLayout from './styles/MainLayout';
import SideBarProfile from './components/SideBarProfile';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* AUTH ROUTES */}
            <Route element={<AuthLayout />}>
              <Route path='/login' element={<AuthPage />} />
              <Route path='/register' element={<AuthPage />} />
            </Route>

            {/* MAIN PAGE */}
            <Route path='/' element={<App />} />
            <Route element={<MainLayout />}>
              <Route path='/detail/:id' element={<Detail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/category' element={<Category />} />
              <Route path='/profile' element={<SideBarProfile />} />
              <Route path='/my-order' element={<SideBarProfile />} />
              <Route path='/' element={<App />} />
            </Route>

            {/* STATUS PAGE */}
            <Route path='/success' element={<Success />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
