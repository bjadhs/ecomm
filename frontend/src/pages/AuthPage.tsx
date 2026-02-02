import { useState } from 'react';
import {
  SignedIn,
  SignedOut,
  useSignIn,
  useSignUp,
  UserButton,
} from '@clerk/clerk-react';
import { isClerkAPIResponseError } from '@clerk/clerk-react/errors';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    isLoaded: isSignInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignInLoaded) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId });
      } else {
        setError('Invalid email or password');
      }
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        setError(err.errors[0]?.message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignUpLoaded) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId });
      } else if (result.status === 'missing_requirements') {
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });
        setError('Please check your email for a verification code.');
      }
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        setError(err.errors[0]?.message || 'Sign up failed. Please try again.');
      } else {
        setError('Sign up failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isSignInLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/home',
      });
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        setError(
          err.errors[0]?.message || 'Google login failed. Please try again.',
        );
      } else {
        setError('Google login failed. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setError('');
    setShowPassword(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-[#FAFAF9] dark:bg-[#0A0A0A] px-4 py-12'>
      <SignedIn>
        <UserButton userProfileMode='navigation' userProfileUrl='/dashboard' />
      </SignedIn>

      <SignedOut>
        <div className='w-full max-w-md'>
          {/* Main Card */}
          <div className='bg-white dark:bg-[#141414] border-2 border-[#0A0A0A] dark:border-[#404040] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] rounded-xl p-8'>
            {/* Header */}
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold tracking-tight text-[#0A0A0A] dark:text-white mb-2'>
                Ecom
              </h1>
              <p className='text-[#737373] dark:text-[#A3A3A3] text-sm font-medium uppercase tracking-wider'>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className='w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-white py-3 px-4 rounded-lg border-2 border-[#0A0A0A] dark:border-[#404040] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 mb-6 font-semibold'
            >
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className='relative mb-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t-2 border-[#E7E5E4] dark:border-[#262626]'></div>
              </div>
              <div className='relative flex justify-center'>
                <span className='px-3 bg-white dark:bg-[#141414] text-xs font-semibold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3]'>
                  Or
                </span>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={isLogin ? handleLogin : handleSignUp}
              className='space-y-4'
            >
              {/* Name fields - only for signup */}
              {!isLogin && (
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-sm font-semibold text-[#0A0A0A] dark:text-white mb-1.5 uppercase tracking-wide text-xs'>
                      First Name
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]' />
                      <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='John'
                        className='w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-[#E7E5E4] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-white placeholder-[#A3A3A3] focus:border-[#8B5CF6] focus:outline-none transition-colors duration-150 font-medium'
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-[#0A0A0A] dark:text-white mb-1.5 uppercase tracking-wide text-xs'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder='Doe'
                      className='w-full px-3 py-2.5 rounded-lg border-2 border-[#E7E5E4] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-white placeholder-[#A3A3A3] focus:border-[#8B5CF6] focus:outline-none transition-colors duration-150 font-medium'
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className='block text-sm font-semibold text-[#0A0A0A] dark:text-white mb-1.5 uppercase tracking-wide text-xs'>
                  Email
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]' />
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='you@example.com'
                    className='w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-[#E7E5E4] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-white placeholder-[#A3A3A3] focus:border-[#8B5CF6] focus:outline-none transition-colors duration-150 font-medium'
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className='block text-sm font-semibold text-[#0A0A0A] dark:text-white mb-1.5 uppercase tracking-wide text-xs'>
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='••••••••'
                    className='w-full pl-10 pr-11 py-2.5 rounded-lg border-2 border-[#E7E5E4] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-white placeholder-[#A3A3A3] focus:border-[#8B5CF6] focus:outline-none transition-colors duration-150 font-medium'
                    required
                    minLength={8}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3] transition-colors duration-150'
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className='bg-[#FEE2E2] dark:bg-[#7F1D1D] border-2 border-[#FCA5A5] dark:border-[#F87171] rounded-lg px-4 py-3'>
                  <p className='text-[#0A0A0A] dark:text-white text-sm font-medium'>
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3 px-4 rounded-lg border-2 border-[#0A0A0A] dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 mt-2 uppercase tracking-wider text-sm'
              >
                {isLoading
                  ? isLogin
                    ? 'Signing In...'
                    : 'Creating...'
                  : isLogin
                    ? 'Sign In'
                    : 'Create Account'}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className='mt-6 pt-6 border-t-2 border-[#E7E5E4] dark:border-[#262626]'>
              <p className='text-center text-sm text-[#525252] dark:text-[#A3A3A3] font-medium'>
                {isLogin
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <button
                  onClick={toggleMode}
                  className='text-[#8B5CF6] hover:text-[#7C3AED] dark:text-[#A78BFA] dark:hover:text-[#8B5CF6] font-bold underline underline-offset-2 decoration-2'
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className='text-center text-xs text-[#737373] dark:text-[#525252] mt-6 font-medium uppercase tracking-wider'>
            Secure Authentication
          </p>
        </div>
      </SignedOut>
    </div>
  );
};

export default AuthPage;
