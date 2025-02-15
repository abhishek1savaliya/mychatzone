'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Make sure to import axios

const Navbar = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileImageRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const [user, setUser] = useState(null);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileImageRef.current &&
        !profileImageRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  return (
    <nav className="bg-red-600 p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-lg font-semibold">
        ChatZone
      </Link>

      <div className="relative">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
          width={40}
          height={40}
          className="rounded-full border-2 border-white cursor-pointer"
          onClick={toggleDropdown}
          ref={profileImageRef}
          alt="Profile"
        />

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10"
          >
            <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Profile
            </Link>

            <span className="block px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100" onClick={handleLogout}>
              Logout
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;