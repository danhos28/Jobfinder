/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import { motion } from 'framer-motion';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Backdrop from './Backdrop';
import { IVacancies } from '../interfaces/IVacancies';
import { IProfileProps } from '../interfaces/IProfiles';
import Button from './Button';

const dropIn = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const Modal = ({
  handleClose,
  vacancy,
  userId,
  elHeight,
}: {
  handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  vacancy: IVacancies;
  userId: string;
  elHeight: number | null | undefined;
}) => {
  const [profile, setProfile] = useState<IProfileProps>();
  const url = `${process.env.NEXT_PUBLIC_URL}/jobseeker/${userId}`;
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(url)
      .then((res) => {
        setProfile(res);
      })
      .catch(null);
  }, []);

  const onSubmit = (formData: { message: string }) => {
    console.log(formData);
    const data = {
      vacancy_id: vacancy.vacancy_id,
      jobseeker_id: userId,
      message: formData.message,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/application`, data)
      .then(() => {
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
          title: 'Job Applied!',
        });

        router.push('/dashboard');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Backdrop onClick={handleClose} elHeight={elHeight}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded-md flex flex-col items-center mx-auto px-6 py-8 sm:p-10 bg-white w-[95vw] sm:w-[60vw] max-w-screen-md h-auto font-poppins"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="font-bold mb-8">Apply to {vacancy.company}?</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-col gap-2 w-full h-full text-sm">
              <p className="font-bold text-base">{vacancy.job_title}</p>
              <div className="flex flex-col">
                <p className="font-bold">Salary</p>
                <p className="text-blue-700 text-sm">
                  ± Rp.{' '}
                  {parseInt(vacancy.salary, 10)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">Employment Type</p>
                <p className="text-blue-700 text-sm">
                  {vacancy.employment_type}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex flex-col">
              <p className="font-bold">Resume</p>
              {profile?.data.resume ? (
                <p className="text-sm">
                  {profile?.data.resume}
                  <span className="inline underline font-bold ml-2">
                    <Link href={`/profile?id=${userId}`}>Edit</Link>
                  </span>
                </p>
              ) : (
                <div>
                  <p className="text-gray-400">-</p>
                  <p className="text-sm">
                    ( It is recommended to upload resume before applying ).
                    <span className="inline underline font-bold ml-2">
                      <Link href={`/profile?id=${userId}`}>Edit Profile</Link>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-8 gap-4"
        >
          <p>Tell me about your self</p>
          <textarea
            placeholder="max 200 words"
            className="textarea rounded text-sm"
            maxLength={200}
            {...register('message')}
          />{' '}
          <div className="flex justify-center p-4 gap-8">
            <Button type="submit" variant="green">
              Apply
            </Button>
            <Button type="button" variant="red" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
