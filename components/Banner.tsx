import Link from 'next/link';
// bg-[color:#4686C1]
const Banner = () => (
  <div className="flex justify-center items-center bg-[color:#4686C1] w-screen pb-20">
    <div className="flex flex-col md:flex-row justify-between items-center w-screen sm:w-[80vw] h-[380px] bg-white max-w-screen-lg sm:rounded-lg overflow-hidden shadow-2xl">
      <div className="flex flex-col justify-center items-start bg-gradient-to-br from-blue-400 to-blue-600 text-gray-50 p-12 w-full h-full font-poppins">
        <h1 className="text-2xl sm:text-4xl font-bold text-left">
          Reach new career heights with us
        </h1>
        <p className="text-md sm:text-xl text-left pt-4">
          Work with the best companies in Southeast Asia.
        </p>
        <button
          className="mt-12 py-3 px-6 bg-blue-900 rounded-lg font-bold text-xl sm:text-2xl hover:scale-105 transform transition ease-in-out duration-200"
          type="button"
        >
          <Link href="/register">Sign Up</Link>
        </button>
      </div>
      <img
        src="/images/banner-image.jpg"
        alt="banner"
        className="md:w-1/2 h-auto"
      />
    </div>
  </div>
);

export default Banner;
