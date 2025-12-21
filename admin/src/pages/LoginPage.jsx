import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <SignedIn>
                <UserButton userProfileMode="navigation" userProfileUrl="/dashboard" />
            </SignedIn>

            <SignedOut className="w-full max-w-md mx-auto">

                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Admin Login</h1>
                <SignIn />
            </SignedOut>
        </div>
    )
}

export default LoginPage