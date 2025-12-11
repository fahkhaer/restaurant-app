import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className='flex'>
      <img
        className='h-screen w-1/2 object-cover'
        src={'/src/assets/images/Detail1.png'}
        alt='food-detail'
      />
      <div className='mx-auto h-screen max-w-sm flex flex-col justify-center gap-5'>
        {/* logo */}
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
        <div className='space-y-1'>
          <p className='display-sm-extrabold'>Welcome Back</p>
          <p className='text-md-medium'>Good to see you again! Let’s eat</p>
        </div>
        <Tabs defaultValue='login'>
          <TabsList className='w-full mb-2 rpunded-2xl h-14 '>
            <TabsTrigger className='w-1/2 ' value='login'>
              Sign in
            </TabsTrigger>
            <TabsTrigger className='w-1/2' value='register'>
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent className='w-94' value='login'>
            <div className='space-y-5'>
              <Input placeholder='Email' id='tabs-login' type='email' />
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
              <Button className='w-full'>Login</Button>
            </div>
          </TabsContent>
          <TabsContent value='register'>
            <div className='w-full space-y-5'>
              <Input placeholder='Name' id='tabs-register' type='text' />
              <Input placeholder='Email' id='tabs-register' type='email' />
              <Input
                placeholder='Number Phone'
                id='tabs-register'
                type='number'
              />
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
