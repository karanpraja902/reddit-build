"use client"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from "./ui/button";
import RedditLogoOnly from "../../public/images/Reddit logo Only.svg";
import RedditFull from "../../public/images/Reddit full.svg";

import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import Image from "next/image";

function Header() {
  const { user } = useUser();

return (
  <>
    <header className="flex items-center justify-between p-4 border-b border-gray-200">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <MenuIcon className="w-6 h-6" />
        <Image
          src={RedditFull}
          alt="logo"
          width={150}
          height={150}
          className="hidden md:block"
        />
        <Image
          src={RedditLogoOnly}
          alt="logo"
          width={40}
          height={40}
          className='block md:hidden'
        />
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button asChild variant='outline'>
            <SignInButton mode='modal' />
          </Button>
        </SignedOut>
      </div>
    </header>
  </>
)
}

export default Header
