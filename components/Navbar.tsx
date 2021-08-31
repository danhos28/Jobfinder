import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { asPath } = useRouter();

  return (
    <nav className="flex justify-between fixed z-50 items-center font-poppins h-[60px] w-screen bg-white shadow-sm px-4 sm:px-8 md:px-14 lg:px-24 xl:px-36">
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
      <div className="flex justify-between items-center h-full w-auto  ">
        <Link href="/">
          <p className="px-2 sm:px-4 cursor-pointer">Home</p>
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
    </nav>
  );
};

export default Navbar;
