import Link from 'next/link';
import '../styles/Home.module.css';

const Footer = () => (
  <div className="flex flex-col bg-blue-900 text-sm h-full py-10 sm:py-0 sm:h-[80vh] w-screen font-poppins justify-evenly px-8 sm:px-24">
    <div className="flex flex-col gap-2">
      <img
        src="/images/jobfinder_logo.png"
        alt="logo"
        className="w-20 h-20 mb-4"
      />
      <p className="font-bold text-gray-200 mb-4 sm:mb-0">
        We transform the way candidates find jobs and companies hire talent.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row justify-between h-2/4 max-h-[400px] w-4/6 max-w-screen-lg text-gray-200 gap-6">
      <div className="flex flex-col justify-around">
        <h2 className="font-bold mb-2 sm:mb-4">Candidates</h2>
        <Link href="/">Sign Up</Link>
        <Link href="/">Testimonials</Link>
        <Link href="/">Job Board</Link>
      </div>
      <div className="flex flex-col justify-around">
        <h2 className="font-bold mb-2 sm:mb-4">Employer</h2>
        <Link href="/">Start Hiring</Link>
        <Link href="/">Jobfinder Partnership</Link>
        <Link href="/">Testimonials</Link>
      </div>
      <div className="flex flex-col justify-around">
        <h2 className="font-bold mb-2 sm:mb-4">About</h2>
        <Link href="/">About</Link>
        <Link href="/">Careers</Link>
        <Link href="/">Newsroom</Link>
      </div>
      <div className="flex flex-col justify-around">
        <h2 className="font-bold mb-2 sm:mb-4">Support</h2>
        <Link href="/">Contact Us</Link>
        <Link href="/">Career Advice</Link>
        <Link href="/">Blog</Link>
      </div>
    </div>
  </div>
);

export default Footer;
