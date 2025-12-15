"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { Building, Crown, Plus, Search, Sparkles, Ticket } from "lucide-react";
import { SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs";
import SearchLocationBar from "./SearchLocationBar";
const Header = () => {
  const { isSignedIn, user } = useUser();
  return (
    <>
      <nav className="flex items-center justify-between px-5 py-1 border-b border-gray-800">
        <Link href="/">
          <Image src={logo} alt="Logo" width={220} height={150} />
        </Link>

        <div className="hidden md:flex items-center justify-center">
          <SearchLocationBar />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Link href="/pricing">Pricing</Link>
          <Link href="/explore">Explore</Link>
         

          {/* <Link href="">Sign In</Link> */}
          {/* User Button */}
          {isSignedIn && (
  <>
    {/* Create Event Button */}
    <button>
      <Link href="/create-event" className="flex gap-2 mr-4 items-center justify-between bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700 transition">
        <Plus className="w-4 h-4" />
        <span className="hidden md:inline">Create Event</span>
      </Link>
    </button>

    {/* User Button */}
    <UserButton
     
      appearance={{
        elements: { avatarBox: "w-9 h-9" },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Tickets"
          labelIcon={<Ticket size={16} />}
          href="/my-tickets"
        />
        <UserButton.Link
          label="My Events"
          labelIcon={<Building size={16} />}
          href="/my-events"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  </>
)}

          {!isSignedIn && (
  <SignInButton mode="modal">
    <button className="cursor-pointer bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700 transition">Sign In</button>
  </SignInButton>
)}

        </div>
      </nav>
    </>
  );
};

export default Header;
