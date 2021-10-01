import Link from 'next/link';
import { useState, useContext } from 'react';
import StateContext from '../contexts/StateContext';

interface IProps {
  username: string;
  logoutHandler: () => void;
}

const NavbarJobseeker = ({ username, logoutHandler }: IProps) => {
  const { userId } = useContext<any>(StateContext);
  const [hamburgerClick, setHamburgerClick] = useState(false);
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
            <Link href="/">Home</Link>
          </li>

          <li className="li-navbar">
            <Link href="/dashboard">Jobs</Link>
          </li>

          <li className="li-navbar">
            <Link href={`/applications/?id=${userId}`}>Applications</Link>
          </li>

          <li className="li-navbar">
            <Link href="/savedjob">Saved</Link>
          </li>

          <li className="li-navbar">
            <Link href={`/profile/?id=${userId}`}>
              <p className="hover:underline cursor-pointer capitalize">
                {username}
              </p>
            </Link>
          </li>

          <li className="li-navbar">
            <div className="flex justify-center items-center gap-1">
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
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavbarJobseeker;
