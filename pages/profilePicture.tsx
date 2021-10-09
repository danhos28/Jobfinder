/* eslint-disable react/style-prop-object */
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Button from '../components/Button';

const profilePicture = () => {
  const router = useRouter();
  const { id, profilepic } = router.query;
  const url = `${process.env.NEXT_PUBLIC_URL}/jobseeker/picture/${id}`;
  const profilePicUrl = `${process.env.NEXT_PUBLIC_URL}/jobseeker/profilePic/${profilepic}`;
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState<string>();

  const onSubmit = () => {
    const postFormData = new FormData();
    postFormData.append('image', image);
    axios
      .post(url, postFormData)
      .then(() => router.push(`/editProfile?id=${id}`))
      .catch(
        () =>
          // eslint-disable-next-line implicit-arrow-linebreak
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload a picture.',
          }),
        // eslint-disable-next-line function-paren-newline
      );
  };

  const onCancel = () => {
    router.push(`/editProfile?id=${id}`);
  };

  const removeHandle = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/jobseeker/picture/remove/${id}`)
      .then(() => setImageUrl(''))
      .catch(null);
  };

  const handleImage = (e: React.SyntheticEvent<EventTarget>): void => {
    setImage((e.target as HTMLFormElement).files[0]);
    if ((e.target as HTMLFormElement).files.length !== 0) {
      setImageUrl(URL.createObjectURL((e.target as HTMLFormElement).files[0]));
    }
  };
  useEffect(() => {}, [image, imageUrl]);

  useEffect(() => {
    const arrUrl: string[] = profilePicUrl.split('/');
    if ((arrUrl[4] as unknown as string) === 'null') {
      return;
    }
    setImageUrl(profilePicUrl);
  }, [profilePicUrl]);

  return (
    <Layout title="Jobfinder: profile picture">
      <Navbar />
      <div className="flex w-screen bg-layer-profile justify-center items-center font-poppins pt-10 pb-16">
        <div className="mt-[60px] flex flex-col items-center bg-white w-[90vw] md:w-1/2 max-w-screen-sm rounded-md shadow-md p-16">
          <p className="font-bold mb-6">Edit profile picture</p>
          <div className="rounded-full mb-6 h-[150px] w-[150px] bg-gray-100 flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="preview"
                className="h-[150px] w-[150px] rounded-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#bcbcbc"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <button
            type="button"
            onClick={removeHandle}
            className="flex gap-1 items-center justify-center mb-6 text-gray-500 rounded-full px-4 py-1 text-sm bg-white hover:underline"
          >
            Remove
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>

          <p className="mb-4 text-sm">Upload or replace picture (Max: 1mb)</p>

          <input
            type="file"
            className="mb-6 text-sm bg-gray-50 rounded-[50px] shadow-md w-[110%] sm:w-[70%]"
            onChange={handleImage}
            accept="image/jpg, image/jpeg, image/png"
          />
          <div className="flex w-full items-center justify-center gap-4 text-sm">
            <Button
              type="submit"
              variant="green"
              onClick={onSubmit}
              style="mt-4 w-[150px]"
            >
              Apply
            </Button>
            <Button
              type="button"
              variant="red"
              onClick={onCancel}
              style="mt-4 w-[150px]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default profilePicture;
