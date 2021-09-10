// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import StateContext from '../contexts/StateContext';

const Navbar = () => {
  const { asPath } = useRouter();
  const router = useRouter();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext<any>(StateContext);
  const [username, setUsername] = useState('');
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const url = 'http://localhost:5000';

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
        const { newAccessToken } = res.data;
        console.log(res.data);
        setUsername(res.data.jobseeker.name);

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
  }, [isLoggedIn]);

  const logoutHandler = () => {
    instance
      .get('logout')
      .then(() => {
        cookies.remove('accessToken');
        router.push('/');
      })
      .catch((err) => console.log(err));
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
      {isLoggedIn ? (
        <>
          <div className="sm:hidden px-4 cursor-pointer">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <div className="hidden justify-between items-center h-full sm:flex sm:w-8/12 md:w-7/12">
            <Link href="/">
              <p className="px-2 sm:px-4 cursor-pointer hover:underline">
                Home
              </p>
            </Link>
            <Link href="/application">
              <p className="hover:underline cursor-pointer">Application</p>
            </Link>
            <Link href="/savedJobs">
              <p className="hover:underline cursor-pointer">Saved Jobs</p>
            </Link>
            <Link href="/profile">
              <p className="hover:underline cursor-pointer capitalize">
                {username}
              </p>
            </Link>
            <button
              type="button"
              className="hover:underline cursor-pointer"
              onClick={logoutHandler}
            >
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center h-full w-auto  ">
            <Link href="/">
              <p className="px-2 sm:px-4 cursor-pointer hover:underline">
                Home
              </p>
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
              <p
                className={
                  asPath === '/login'
                    ? 'navbar-link-active'
                    : 'bg-white px-2 sm:px-4 cursor-pointer'
                }
              >
                Sign In
              </p>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
