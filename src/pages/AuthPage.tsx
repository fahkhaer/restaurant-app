'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { setUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/features/store';
import { loginSchema, registerSchema } from '@/schemas/auth';
import { useLogin, useRegister } from '@/services/api/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const location = useLocation();

  const defaultTab = useMemo(
    () => (location.pathname.includes('register') ? 'register' : 'login'),
    [location.pathname]
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [apiLoginError, setApiLoginError] = useState<string | null>(null);
  const [apiRegisterError, setApiRegisterError] = useState<string | null>(null);

  // ---------------- FORM ----------------
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = (data: LoginForm) => {
    setApiLoginError(null);
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        dispatch(setUser(res.user));
        localStorage.setItem('token', res.token);
        navigate('/');
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          setApiLoginError(err.response?.data?.message || 'Login failed');
        } else {
          setApiLoginError('Login failed');
        }
      },
    });
  };

  const onRegister = (data: RegisterForm) => {
    setApiRegisterError(null);
    if (data.password !== data.confirmPassword) {
      setApiRegisterError('Passwords do not match!');
      return;
    }

    registerMutation.mutate(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
      {
        onSuccess: () => navigate('/'),
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            setApiRegisterError(
              err.response?.data?.errors?.[0]?.msg || 'Registration failed'
            );
          } else {
            setApiRegisterError('Registration failed');
          }
        },
      }
    );
  };

  return (
    <section className='flex min-h-screen'>
      {/* Left Image */}
      <img
        className='hidden md:block w-1/2 object-cover'
        src='/images/Detail1.png'
        alt='food-detail'
      />

      {/* Right Form */}
      <div className='mx-auto h-screen max-w-sm flex flex-col justify-center gap-5 px-4'>
        <Link to='/'>
          <div className='flex items-center gap-4 w-fit'>
            <img
              className='h-auto'
              src='/icons/Logored.png'
              alt='Logo'
              style={{ width: 'clamp(2.5rem,3.5vw,2.63rem)' }}
            />
            <p className='hidden md:block display-md-extrabold'>Foody</p>
          </div>
        </Link>

        {/* Title */}
        <div className='space-y-1'>
          <p className='display-sm-extrabold'>Welcome Back</p>
          <p className='text-md-medium'>Good to see you again! Let’s eat</p>
        </div>

        {/* TABS */}
        <Tabs defaultValue={defaultTab}>
          <TabsList className='w-full mb-4 rounded-2xl h-14'>
            <TabsTrigger className='w-1/2' value='login'>
              Sign in
            </TabsTrigger>
            <TabsTrigger className='w-1/2' value='register'>
              Sign up
            </TabsTrigger>
          </TabsList>

          {/* ================= LOGIN ================= */}
          <TabsContent value='login'>
            <form
              onSubmit={handleLoginSubmit(onLogin)}
              className='space-y-4 w-[374px]'
            >
              <div>
                <Input placeholder='Email' {...loginRegister('email')} />
                {loginErrors.email && (
                  <p className='text-red-500 text-xs mt-2'>
                    {loginErrors.email.message}
                  </p>
                )}
              </div>

              <div className='relative'>
                <Input
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                  {...loginRegister('password')}
                  className='pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {loginErrors.password && (
                  <p className='text-red-500 text-xs mt-2'>
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              {apiLoginError && (
                <p className='text-red-500 text-sm'>{apiLoginError}</p>
              )}

              <Button type='submit' className='w-full'>
                Login
              </Button>
            </form>
          </TabsContent>

          {/* ================= REGISTER ================= */}
          <TabsContent value='register'>
            <form
              onSubmit={handleRegisterSubmit(onRegister)}
              className='space-y-4 w-[374px]'
            >
              <div>
                <Input placeholder='Name' {...registerRegister('name')} />
                {registerErrors.name && (
                  <p className='text-red-500 text-xs mt-2'>
                    {registerErrors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Input placeholder='Email' {...registerRegister('email')} />
                {registerErrors.email && (
                  <p className='text-red-500 text-xs mt-2'>
                    {registerErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder='Phone'
                  type='number'
                  {...registerRegister('phone')}
                />
                {registerErrors.phone && (
                  <p className='text-red-500 text-xs mt-2'>
                    {registerErrors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className='relative'>
                <Input
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                  {...registerRegister('password')}
                  className='pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {registerErrors.password && (
                  <p className='text-red-500 text-xs mt-2'>
                    {registerErrors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className='relative'>
                <Input
                  placeholder='Confirm Password'
                  type={showConfirm ? 'text' : 'password'}
                  {...registerRegister('confirmPassword')}
                  className='pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirm(!showConfirm)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {registerErrors.confirmPassword && (
                  <p className='text-red-500 text-xs mt-2'>
                    {registerErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              {apiRegisterError && (
                <p className='text-red-500 text-sm'>{apiRegisterError}</p>
              )}

              <Button type='submit' className='w-full'>
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default AuthPage;
