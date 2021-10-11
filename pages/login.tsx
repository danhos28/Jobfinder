/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

interface IFormInputs {
  email: string;
  password: string;
  checked: boolean;
  employer: boolean;
}

const login = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const urlJobseeker = `${process.env.NEXT_PUBLIC_URL}/auth`;
  const urlEmployer = `${process.env.NEXT_PUBLIC_URL}/auth/employer`;
  const { register, handleSubmit } = useForm<IFormInputs>();

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const signInAlert = (): void => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully',
    });
  };

  const userLogin = (formData: IFormInputs, url: string, route: string) => {
    axios
      .post(url, formData, { withCredentials: true })
      .then((res) => {
        signInAlert();
        const { accessToken } = res.data;

        cookies.set('accessToken', accessToken, {
          path: '/',
          // maxAge: 10,
          sameSite: 'strict',
        });
        router.push(route);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or password is incorrect.',
        });
      });
  };

  const onSubmit: SubmitHandler<IFormInputs> = (formData: IFormInputs, e) => {
    e?.preventDefault();
    if (formData.employer) {
      userLogin(formData, urlEmployer, '/empDashboard');
    } else {
      userLogin(formData, urlJobseeker, '/dashboard');
    }
  };

  return (
    <Layout title="Jobfinder: Find your dream job">
      <div>
        <Navbar />

        <div className="flex justify-center items-center w-screen h-full py-20 bg-gray-100 ">
          <motion.div
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center mt-60px bg-white sm:rounded-lg rounded-md sm:shadow-md px-10 sm:px-14 lg:px-16 xl:px-20 2xl:px-28 2xl:py-20 py-14 h-3/4 max-h-[600px] min-h-[600px] w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]"
          >
            <h1 className="font-poppins font-bold text-lg 2xl:text-xl mb-6 2xl:mb-11">
              Log In
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 justify-between mt-4 w-full h-full font-poppins text-sm"
            >
              <input
                placeholder="Email"
                className="input-text w-full"
                required
                {...register('email')}
              />
              <div className="flex w-full relative items-center">
                <input
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Password"
                  className="input-text w-full"
                  required
                  {...register('password')}
                />
                <i
                  onClick={togglePasswordVisiblity}
                  role="button"
                  tabIndex={0}
                  onKeyPress={togglePasswordVisiblity}
                  className="absolute right-4 cursor-pointer text-gray-300 hover:text-gray-400"
                >
                  {passwordShown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </i>
              </div>
              <div className="flex items-center ">
                <input type="checkbox" id="role" {...register('employer')} />
                <label htmlFor="role" className="ml-2">
                  Employer?
                </label>
              </div>
              <div className="flex items-center justify-start">
                <input type="checkbox" id="agree" {...register('checked')} />
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
                Login
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
                here.
              </p>
            </form>
          </motion.div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};

export default login;
