import Link from 'next/link';

const Hero = () => (
  <div className="flex flex-col h-full w-auto bg-hero-pattern bg-cover bg-bottom font-poppins">
    <div className="flex w-screen justify-between items-center px-4 pt-4 sm:px-8 text-blue-800">
      <img
        src="/images/jobfinder_logo.png"
        alt="logo"
        className="h-12 w-12 mb-2"
      />
      <div className="hidden sm:flex justify-around items-center sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 font-bold">
        <Link href="/register">
          <p className="cursor-pointer hover:underline">Sign Up</p>
        </Link>
        <p>|</p>
        <div className="flex justify-between items-center w-20">
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
          <Link href="/login">
            <p className="cursor-pointer hover:underline">Sign In</p>
          </Link>
        </div>
        <button
          type="button"
          className="bg-blue-900 rounded-sm px-4 py-1.5 shadow-lg text-gray-50 font-medium"
        >
          Hire Now
        </button>
      </div>
      <div className="px-4 cursor-pointer sm:hidden">
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
    </div>
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col bg-gray-50 bg-opacity-90 p-8 sm:p-12 lg:p-16 rounded-md shadow-2xl font-poppins md:hover:scale-105 transform transition-all ease-in-out duration-200">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          Find your dream career here
        </h1>
        <h3 className="text-base sm:text-lg md:text-xl mb-8">
          Get matched with a job that suits you here at Jobfinder.
        </h3>
        <div className="flex sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Search your job here..."
            className="h-12 w-full p-4 rounded-md mr-4"
          />
          <button
            type="button"
            className="bg-blue-500 text-gray-50 px-4 rounded-md font-bold py-2 sm:py-2 mt-4 sm:mt-0 hover:bg-blue-600 transition-all ease-in-out duration-100"
          >
            Search
          </button>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/">
            <p className="cursor-pointer underline pt-4">
              See all available jobs
            </p>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
