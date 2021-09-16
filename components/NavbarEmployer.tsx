import Link from 'next/link';

interface IProps {
  username: string;
  logoutHandler: () => void;
}

const NavbarEmployer = ({ username, logoutHandler }: IProps) => (
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
    <div className="hidden justify-between items-center h-full sm:flex sm:w-6/12 md:w-5/12">
      <Link href="/">
        <p className="px-2 sm:px-4 cursor-pointer hover:underline">Home</p>
      </Link>
      <Link href="/empDashboard">
        <p className="hover:underline cursor-pointer">Dashboard</p>
      </Link>
      <Link href="/profile">
        <p className="hover:underline cursor-pointer capitalize">{username}</p>
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
);

export default NavbarEmployer;
