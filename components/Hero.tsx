import Link from 'next/link';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Hero = () => (
  <div className="flex flex-col h-full w-auto bg-hero-pattern bg-cover bg-bottom font-poppins">
    <Navbar />
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col bg-gray-50 bg-opacity-90 min-w-0 p-8 sm:p-12 lg:p-16 rounded-md shadow-2xl font-poppins md:hover:scale-105 transform transition-all ease-in-out duration-200">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          Find your dream career here
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl mb-8">
          Get matched with a job that suits you here at Jobfinder.
        </h2>
        <div className="flex w-full">
          <SearchBar />
        </div>
        <div className="flex justify-center items-center">
          <Link href="/dashboard">
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
