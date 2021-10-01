/* eslint-disable react/style-prop-object */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const uploadResume = () => {
  const router = useRouter();
  const { id } = router.query;
  const url = `${process.env.NEXT_PUBLIC_URL}/uploadCv/${id}`;
  const [resume, setResume] = useState('');

  const onSubmit = () => {
    const postFormData = new FormData();
    postFormData.append('resume', resume);
    axios
      .post(url, postFormData)
      .then(() => router.push(`/profile?id=${id}`))
      .catch(
        () =>
          // eslint-disable-next-line implicit-arrow-linebreak
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Input invalid.',
          }),
        // eslint-disable-next-line function-paren-newline
      );
  };

  const onCancel = () => {
    router.push(`/profile?id=${id}`);
  };

  const handleResume = (e: React.SyntheticEvent<EventTarget>): void => {
    setResume((e.target as HTMLFormElement).files[0]);
  };

  const removeResume = () => {
    axios
      .delete(url)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Resume removed!',
          text: "You've removed your resume",
        });
      })
      .catch(null);
  };

  return (
    <div>
      <Layout title="Jobfinder: upload resume">
        <Navbar />
        <div className="flex flex-col h-screen w-screen bg-layer-profile justify-center items-center p-16 font-poppins">
          <div className="flex flex-col items-center p-12 w-[90vw] md:w-[70vw] xl:w-[50vw] bg-white mt-[60px] rounded-md shadow-md max-w-[600px]">
            <p className="font-bold mb-2">Upload or Replace Resume</p>
            <p className="text-sm mb-6">File type should be a pdf (max: 2mb)</p>
            <input
              type="file"
              className="mb-6 text-sm bg-gray-50 rounded-[50px] shadow-md w-[110%] sm:w-[70%]"
              accept="application/pdf"
              onChange={handleResume}
            />
            <button
              type="button"
              className="text-sm text-gray-500 hover:underline mb-4"
              onClick={removeResume}
            >
              Remove resume
            </button>
            <div className="flex w-full items-center justify-center gap-4 text-sm">
              <Button
                type="submit"
                variant="green"
                style="mt-4 w-[150px]"
                onClick={onSubmit}
              >
                Apply
              </Button>
              <Button
                type="button"
                variant="red"
                style="mt-4 w-[150px]"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export default uploadResume;
