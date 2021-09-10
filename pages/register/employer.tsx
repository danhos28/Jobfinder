/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';

interface IFormInputs {
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const employer = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInputs>();
  const [passwordValidation, setPasswordValidation] = useState(false);
  const url = 'http://localhost:5000/register/employer';

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

  const registerEmployer = async (formData: IFormInputs) => {
    try {
      const response = await axios.post(url, formData);
      console.log(response);
      signInAlert();
      router.push('/dashboard');
    } catch (error: any) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      });
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = (formData: IFormInputs) => {
    if (formData.agree && formData.password === formData.confirmPassword) {
      setPasswordValidation(false);
      registerEmployer(formData);
    } else if (!formData.agree) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please indicate that you have read and agree to the Terms and Conditions.',
      });
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  };

  return (
    <Layout title="Jobfinder: Register">
      <Navbar />
      <div className="flex justify-center items-center w-screen h-[120vh] bg-gray-100">
        <div className="flex flex-col items-center  bg-white sm:rounded-lg sm:shadow-md px-10 sm:px-14 lg:px-16 xl:px-20 2xl:px-28 2xl:py-20 py-14 h-[90vh] max-h-[700px] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]">
          <h1 className="font-poppins font-bold text-lg 2xl:text-xl mb-6 2xl:mb-11">
            Sign Up
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between mt-4 w-full h-full font-poppins text-sm"
          >
            <div className="flex justify-between w-full">
              <input
                placeholder="First Name"
                className="input-text w-[48%]"
                required
                {...register('firstName')}
              />
              <input
                placeholder="Last Name"
                className="input-text w-[48%]"
                required
                {...register('lastName')}
              />
            </div>
            <input
              placeholder="Company Name"
              className="input-text w-full"
              required
              {...register('company')}
            />
            <input
              placeholder="Position"
              className="input-text w-full"
              required
              {...register('position')}
            />
            <input
              placeholder="Email"
              className="input-text w-full"
              required
              {...register('email')}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-text w-full"
              required
              {...register('password')}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-text w-full"
              required
              {...register('confirmPassword')}
            />
            {passwordValidation ? (
              <p className="text-red-600">
                Incorrect password. Password does not match.
              </p>
            ) : null}
            <div className="flex items-center">
              <input type="checkbox" {...register('agree')} />
              <label htmlFor="agree" className="ml-2">
                I agree to the
                <span className="text-blue-600 cursor-pointer">
                  {' '}
                  terms of service
                </span>
              </label>
            </div>

            <Button variant="blue" type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default employer;
