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
  const { isLoggedIn, setIsLoggedIn, setUserId } =
    useContext<any>(StateContext);
  const router = useRouter();
  const [hamburgerClick, setHamburgerClick] = useState(false);
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
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute right-8 top-4 block sm:hidden cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => setHamburgerClick(!hamburgerClick)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <div
          className={
            hamburgerClick
              ? 'flex '
              : 'hidden sm:flex justify-between h-full w-auto'
          }
        >
          <ul className="flex flex-col sm:flex-row list-none bg-gray-50 sm:bg-white w-screen sm:w-auto text-center shadow-md sm:shadow-none">
            <li className="li-navbar">
              <div className="flex justify-center items-center gap-1">
                <Link href="/">Home</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </li>

            <li className="li-navbar">
              <div className="flex justify-center items-center gap-1">
                <Link href="/register">Sign Up</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
            </li>

            <li className="li-navbar">
              <div className="flex justify-center items-center gap-1">
                <Link href="/login">Login</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center fixed z-50 font-poppins text-md font-bold text-blue-900 h-[60px] w-screen bg-white shadow-sm sm:px-6 md:px-14 lg:px-24 xl:px-36">
      <div className="flex items-center w-auto ml-8 sm:ml-0 mt-2 sm:mt-0">
        <Link href="/">
          <div className="flex gap-4 items-center">
            <Image
              src="/images/jobfinder_logo.png"
              width={40}
              height={40}
              alt="logo"
            />
            <p className="hidden sm:block">Jobfinder</p>
          </div>
        </Link>
      </div>

      {renderNavbar()}
    </nav>
  );
};

export default Navbar;
