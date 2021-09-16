/* eslint-disable operator-linebreak */
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import StateContext from '../contexts/StateContext';
import NavbarJobseeker from './NavbarJobseeker';
import NavbarEmployer from './NavbarEmployer';

const Navbar = () => {
  const { asPath } = useRouter();
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, setUserId } =
    useContext<any>(StateContext);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const url = process.env.NEXT_PUBLIC_URL;

  const instance = axios.create({
    withCredentials: true,
    baseURL: url,
  });

  useEffect(() => {
    const headersConfig = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    instance
      .post('isVerify', null, headersConfig)
      .then((res) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUsername(res.data.jobseeker.name);
        setUserId(res.data.jobseeker.user_id);
        setRole(res.data.jobseeker.user_id.split('-')[0]);

        const { newAccessToken } = res.data;

        if (newAccessToken) {
          cookies.set('accessToken', newAccessToken, {
            path: '/',
            sameSite: 'strict',
          });
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [isLoggedIn, isLoggedOut]);

  const logoutHandler = () => {
    instance
      .get('logout')
      .then(() => {
        cookies.remove('accessToken');
        setIsLoggedOut(!isLoggedOut);
        router.push('/');
      })
      .catch((err) => console.log(err));
  };

  const renderNavbar = () => {
    if (isLoggedIn) {
      if (!isLoading) {
        if (role === 'employer') {
          return (
            <NavbarEmployer username={username} logoutHandler={logoutHandler} />
          );
        }
        return (
          <NavbarJobseeker username={username} logoutHandler={logoutHandler} />
        );
      }
      return null;
    }
    return (
      <div className="flex justify-between items-center h-full w-auto  ">
        <Link href="/">
          <p className="px-2 sm:px-4 cursor-pointer hover:underline">Home</p>
        </Link>
        <Link href="/register">
          <p
            className={
              asPath === '/register'
                ? 'navbar-link-active'
                : 'bg-white px-2 sm:px-4 cursor-pointer'
            }
          >
            Sign Up
          </p>
        </Link>

        <Link href="/login">
          <div
            className={
              asPath === '/login'
                ? 'navbar-link-active flex gap-1'
                : 'bg-white px-2 sm:px-4 cursor-pointer flex gap-1'
            }
          >
            <p>Sign In</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <nav className="flex justify-between fixed z-50 items-center font-poppins font-bold text-blue-900 h-[60px] w-screen bg-white shadow-sm px-4 sm:px-8 md:px-14 lg:px-24 xl:px-36">
      <div className="flex justify-between items-center w-auto">
        <Image
          src="/images/jobfinder_logo.png"
          width={40}
          height={40}
          alt="logo"
        />
        <div className="hidden lg:block lg:ml-4 font-bold text-blue-800">
          <Link href="/">Jobfinder</Link>
        </div>
      </div>
      {renderNavbar()}
    </nav>
  );
};

export default Navbar;
