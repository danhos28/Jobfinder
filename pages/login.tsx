/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Swal from 'sweetalert2';
// import axios from 'axios';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

const login = () => {
  const initialState = {
    email: '',
    password: '',
  };

  // const router = useRouter();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      console.log('true');
    } else {
      console.log('false');
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Layout title="Jobfinder: Find your dream job">
      <div>
        <Navbar />
        <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
          <div className="flex flex-col items-center mt-60px bg-white sm:rounded-lg sm:shadow-md px-10 sm:px-14 lg:px-16 xl:px-20 2xl:px-28 2xl:py-20 py-14 h-3/4 max-h-[600px] w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]">
            <h1 className="font-poppins font-bold text-lg 2xl:text-xl mb-6 2xl:mb-11">
              Sign Up
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between mt-4 w-full h-full font-poppins text-sm"
            >
              <input
                type="text"
                placeholder="Email"
                className="input-text w-full"
                name="email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input-text w-full"
                name="password"
                onChange={handleChange}
                required
              />
              <div className="flex items-center justify-start">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  onChange={handleCheckbox}
                />
                <div className="flex flex-row justify-between items-center w-full">
                  <label htmlFor="agree" className="ml-2">
                    Remember me
                  </label>
                  <p className="text-sm hover:underline text-blue-600 font-bold">
                    <Link href="/">Forgot password?</Link>
                  </p>
                </div>
              </div>
              <Button variant="blue" type="submit">
                Sign Up
              </Button>
              <div className="flex w-full items-center text-gray-400">
                <div className="h-[1px] w-full bg-gray-300 mr-1" />
                OR
                <div className="h-[1px] w-full bg-gray-300 ml-1" />
              </div>
              <Button variant="red" type="button">
                Sign In with Google
              </Button>
              <p>
                Don't have an account yet?
                <span className="text-blue-600 font-bold hover:underline">
                  <Link href="/register"> Sign up </Link>
                </span>
                here
              </p>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default login;
