'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { setUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/features/store';
import { useLogin } from '@/services/api/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function AuthPage() {
  const navigate = useNavigate();

  // API
  const loginMutation = useLogin();
  const dispatch = useAppDispatch();

  // Routing
  const location = useLocation();
  const defaultTab = useMemo(() => {
    return location.pathname.includes('register') ? 'register' : 'login';
  }, [location.pathname]);

  // Input state
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = () => {
    const payload = {
      email: emailLogin,
      password: passwordLogin,
    };

    loginMutation.mutate(payload, {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('email', data.user.email);

        dispatch(setUser(data.user));

        navigate('/');
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <section className='flex'>
      {/* Left Image */}
      <img
        className='h-screen w-1/2 object-cover'
        src={'/src/assets/images/Detail1.png'}
        alt='food-detail'
      />

      <div className='mx-auto h-screen max-w-sm flex flex-col justify-center gap-5'>
        {/* Logo */}
        <Link to={'/'}>
          <div className='size-12 w-fit gap-4 flex items-center'>
            <img
              className='h-auto'
              src='src/assets/icons/logored.png'
              alt='Logo-text'
              style={{ width: 'clamp(2.5rem, 3.5vw, 2.63rem)' }}
            />
            <p className='hidden md:block items-center display-md-extrabold'>
              Foody
            </p>
          </div>
        </Link>

        {/* Title */}
        <div className='space-y-1'>
          <p className='display-sm-extrabold'>Welcome Back</p>
          <p className='text-md-medium'>Good to see you again! Let’s eat</p>
        </div>

        {/* TABS */}
        <Tabs defaultValue={defaultTab}>
          <TabsList className='w-full mb-2 rounded-2xl h-14'>
            <TabsTrigger className='w-1/2' value='login'>
              Sign in
            </TabsTrigger>
            <TabsTrigger className='w-1/2' value='register'>
              Sign up
            </TabsTrigger>
          </TabsList>

          {/* ================= LOGIN ================= */}
          <TabsContent value='login'>
            <div className='space-y-5'>
              <Input
                placeholder='Email'
                type='email'
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
              />

              <div className='relative'>
                <Input
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                  className='pr-10'
                />

                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button className='w-full' onClick={onSubmit}>
                Login
              </Button>
            </div>
          </TabsContent>

          {/* ================= REGISTER ================= */}
          <TabsContent value='register'>
            <div className='w-full space-y-5'>
              <Input placeholder='Name' type='text' />
              <Input placeholder='Email' type='email' />
              <Input placeholder='Number Phone' type='number' />

              {/* Password */}
              <div className='relative'>
                <Input
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                  className='pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className='relative'>
                <Input
                  placeholder='Confirm Password'
                  type={showConfirm ? 'text' : 'password'}
                  className='pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirm(!showConfirm)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button className='w-full'>Register</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default AuthPage;
