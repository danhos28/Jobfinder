import Link from 'next/link';
import Navbar from './Navbar';

const Hero = () => (
  <div className="flex flex-col h-full w-auto bg-hero-pattern bg-cover bg-bottom font-poppins">
    <Navbar />
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col bg-gray-50 bg-opacity-90 p-8 sm:p-12 lg:p-16 rounded-md shadow-2xl font-poppins md:hover:scale-105 transform transition-all ease-in-out duration-200">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          Find your dream career here
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl mb-8">
          Get matched with a job that suits you here at Jobfinder.
        </h2>
        <div className="flex sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Search your job here..."
            className="h-12 w-full p-4 rounded-md mr-4"
          />
          <button
            type="button"
            className="bg-blue-900 text-white px-4 rounded-md font-bold py-2 sm:py-2 mt-4 sm:mt-0 hover:bg-blue-800 transition-all ease-in-out duration-100"
          >
            Search
          </button>
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
