import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-(--bg-main) transition-colors duration-300'>
      <SignedIn>
        <UserButton userProfileMode='navigation' userProfileUrl='/dashboard' />
      </SignedIn>

      <SignedOut>
        <div className='w-full max-w-md mx-auto'>
          <h1 className='text-4xl font-bold mb-4 text-center bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
            Ecom Login
          </h1>
          <SignIn />
        </div>
      </SignedOut>
    </div>
  );
};

export default LoginPage;
