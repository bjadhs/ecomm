import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from '@clerk/clerk-react';

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <SignedIn>
                <UserButton />

            </SignedIn>
            <SignedOut>
                <SignInButton />
                <button className="btn btn-primary">Primary Button</button>
                <button className="btn btn-secondary">Secondary Button</button>
            </SignedOut>
        </div>
    )
}

export default LoginPage