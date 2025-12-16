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
import axios from 'axios';

function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // API
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  // Routing
  const location = useLocation();
  const defaultTab = useMemo(
    () => (location.pathname.includes('register') ? 'register' : 'login'),
    [location.pathname]
  );

  // Input state
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [loginErrors, setLoginErrors] = useState<string | null>(null);

  // Register input state
  const [name, setName] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerErrors, setRegisterErrors] = useState<string | null>(null);

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  //helper
  const getErrorMessage = (
    error: unknown,
    fallback = 'Something went wrong'
  ) => {
    if (axios.isAxiosError(error)) {
      return (error.response?.data?.message as string) || fallback;
    }
    return fallback;
  };

  // on submit login
  const onSubmit = () => {
    const result = loginSchema.safeParse({
      email: emailLogin,
      password: passwordLogin,
    });
    if (!result.success) {
      setLoginErrors(result.error.errors.map((e) => e.message).join(', '));
      return;
    }
    setLoginErrors(null);

    loginMutation.mutate(result.data, {
      onSuccess: (data) => {
        dispatch(setUser(data.user));
        localStorage.setItem('token', data.token);
        navigate('/');
      },
      onError: (error: unknown) =>
        setLoginErrors(getErrorMessage(error, 'Login failed')),
    });
  };

  //on submit register
  const onSubmitRegister = () => {
    const result = registerSchema.safeParse({
      name,
      email: emailRegister,
      phone,
      password: passwordRegister,
      confirmPassword,
    });
    if (!result.success) {
      setRegisterErrors(result.error.errors.map((e) => e.message).join(', '));
      return;
    }

    if (passwordRegister !== confirmPassword) {
      setRegisterErrors('Passwords do not match!');
      return;
    }

    setRegisterErrors(null);

    registerMutation.mutate(
      { name, email: emailRegister, phone, password: passwordRegister },
      {
        onSuccess: () => navigate('/'),
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            const msg =
              (error.response?.data?.errors?.[0]?.msg as string) ||
              'Registration failed';
            setRegisterErrors(msg);
          } else {
            setRegisterErrors('Registration failed');
          }
        },
      }
    );
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
            <div className='space-y-5 w-[374px]'>
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
              {loginErrors && (
                <p className='text-red-500 text-sm'>{loginErrors}</p>
              )}
              <Button className='w-full' onClick={onSubmit}>
                Login
              </Button>
            </div>
          </TabsContent>

          {/* ================= REGISTER ================= */}
          <TabsContent value='register'>
            <div className='w-full space-y-5'>
              <Input
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder='Email'
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
              />
              <Input
                placeholder='Number Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type='number'
              />

              {/* Password */}
              <div className='relative'>
                <Input
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                  value={passwordRegister}
                  onChange={(e) => setPasswordRegister(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {registerErrors && (
                <p className='text-red-500 text-sm'>{registerErrors}</p>
              )}
              <Button className='w-full' onClick={onSubmitRegister}>
                Register
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default AuthPage;
