/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';

const register = () => (
  <Layout title="Jobfinder: Find your dream job">
    <div>
      <Navbar />
      <div className="flex justify-evenly items-center bg-layer-three w-screen h-full bg-bottom font-poppins">
        <div className="flex flex-col justify-between mt-[calc(60px+5vh)] mb-[6vh] pb-8 items-center w-[90vw] sm:w-3/4 h-[90vh] max-h-[800px] bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col justify-around items-center bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 px-4 py-2 text-gray-50 w-full h-1/6">
            <h1 className="text-base font-bold sm:text-2xl">
              We're glad you're here!
            </h1>
            <p className="text-sm sm:text-base">
              First of all, what do you want to do?
            </p>
          </div>

          <div className="flex flex-col md:flex-row w-11/12 h-full pt-6">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="hidden md:block md:mb-4 2xl:hidden">
                <Image
                  src="/images/jobseeker.png"
                  alt="jobseeker"
                  width={200}
                  height={200}
                />
              </div>
              <div className="hidden md:mb-4 2xl:block">
                <Image
                  src="/images/jobseeker.png"
                  alt="jobseeker"
                  width={300}
                  height={300}
                />
              </div>
              <h2 className="font-bold mb-4 2xl:text-xl">
                I'm looking for work
              </h2>
              <p className="mb-4">
                Create a
                <span className="italic font-bold text-sm sm:text-md">
                  {' '}
                  jobseeker{' '}
                </span>
                account.
              </p>
              <Button variant="blue">
                <Link href="/register/jobseeker">START LOOKING FOR JOBS</Link>
              </Button>
              <p className="mt-4 mx-4 text-sm">
                Login with{' '}
                <span className="text-blue-700 cursor-pointer hover:underline font-bold">
                  <Link href="/login">Google.</Link>
                </span>
              </p>
            </div>
            <div className="flex flex-row md:flex-col items-center">
              <div className="bg-gray-400 w-full md:w-[1px] h-[1px] md:h-full" />
              <h3 className="mx-2">OR</h3>
              <div className="bg-gray-400 w-full md:w-[1px] h-[1px] md:h-full" />
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="hidden md:block md:mb-4 2xl:hidden">
                <Image
                  src="/images/employer.png"
                  alt="jobseeker"
                  width={200}
                  height={200}
                />
              </div>
              <div className="hidden md:mb-4 2xl:block">
                <Image
                  src="/images/employer.png"
                  alt="jobseeker"
                  width={300}
                  height={300}
                />
              </div>
              <h2 className="font-bold mb-4 2xl:text-xl">
                I'm looking to hire
              </h2>
              <p className="mb-4">
                Create a
                <span className="italic font-bold text-sm sm:text-md">
                  {' '}
                  recruiter{' '}
                </span>
                account.
              </p>
              <Button variant="green">
                <Link href="/register/employer">START HIRING NOW</Link>
              </Button>
            </div>
          </div>
          <p className="mt-4 mx-4 text-sm sm:text-md">
            Already have an account?{' '}
            <span className="text-blue-700 cursor-pointer hover:underline font-bold">
              <Link href="/login">Log in.</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </Layout>
);

export default register;
