import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from '@clerk/clerk-react';


const App = () => {
  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton />

        </SignedIn>
      </header>
      <h1>Ecommerce Application</h1>
    </div>
  )
}

export default App