/* eslint-disable react/no-children-prop */
/* eslint-disable camelcase */
// eslint-disable-next-line no-use-before-define
import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import StateContext from '../contexts/StateContext';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { IProfileProps } from '../interfaces/IProfiles';
import Error from '../components/Error';
// eslint-disable-next-line arrow-body-style
const profile = ({ data }: IProfileProps) => {
  const { userId, isLoggedIn } = useContext<any>(StateContext);

  return (
    <Layout title="Jobfinder: profile">
      <Navbar />
      {isLoggedIn ? (
        <div className="bg-layer-profile w-full flex justify-center font-poppins pb-16">
          <div className="flex flex-col mt-[80px] gap-10 items-center w-[95vw] sm:w-[80vw] md:w-[70vw] pb-20 max-w-screen-lg bg-white shadow-md rounded-md overflow-hidden">
            <div className="flex justify-center relative bg-gradient-to-b from-blue-700 to-blue-800 h-[65px] sm:h-[80px] w-full mb-10">
              <div className="flex items-center justify-center w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] bg-gray-100 rounded-full">
                {data.profile_picture ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}/images/${data.profile_picture}`}
                    alt="preview"
                    className="h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] rounded-full object-cover"
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
              <div className="flex items-center h-full absolute right-6 sm:right-8 text-gray-50">
                <Link href={`/editProfile?id=${userId}`}>
                  <div className="flex gap-1 cursor-pointer hover:text-gray-200">
                    <p className="block sm:hidden">Edit</p>
                    <p className="hidden sm:block">Edit Profile</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex flex-col text-sm justify-center items-center gap-2 mx-4">
              <p className="capitalize text-lg font-bold">{`${data.first_name} ${data.last_name}`}</p>
              {data.tagline ? (
                <p className="text-center text-blue-700 font-bold">
                  {data.tagline}
                </p>
              ) : null}
              <p>{data.email}</p>
              {data.address ? (
                <p className="text-center text-blue-700 font-bold">
                  {data.address}
                </p>
              ) : null}
              {data.phone_number ? (
                <p className="text-center text-blue-700 font-bold">
                  {data.phone_number}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col text-sm mx-8 sm:mx-16 items-center gap-2">
              <p className="font-bold">Resume</p>
              <p>DanielHosea_resume.pdf</p>
              <Link href="/uploadCv">
                <div className="px-4 py-2 border-2 border-blue-700 rounded-full text-blue-700 font-bold hover:bg-gray-100 cursor-pointer">
                  Upload or replace resume
                </div>
              </Link>
            </div>

            <div className="flex flex-col text-sm mx-8 sm:mx-16 items-center gap-4">
              <p className="font-bold">Summary</p>
              {data.summary ? (
                <ReactMarkdown children={data.summary} />
              ) : (
                <p className="text-gray-400">No data</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row w-full justify-center gap-4 px-8 sm:px-16">
              <div className="flex flex-col sm:w-1/2 gap-4">
                <div className="flex flex-col items-start text-sm gap-2 w-full">
                  <p className="font-bold">Experience</p>
                  {data.experiences ? (
                    <ReactMarkdown children={data.experiences} />
                  ) : (
                    <p className="text-gray-400">No data</p>
                  )}
                </div>
                <div className="flex flex-col items-start text-sm gap-2 w-full">
                  <p className="font-bold">Skill</p>
                  {data.skills ? (
                    <ReactMarkdown children={data.skills} />
                  ) : (
                    <p className="text-gray-400">No data</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:w-1/2 gap-4">
                <div className="flex flex-col items-start text-sm gap-2 w-full">
                  <p className="font-bold">Certificate</p>
                  {data.certificates ? (
                    <ReactMarkdown children={data.certificates} />
                  ) : (
                    <p className="text-gray-400">No data</p>
                  )}
                </div>
                <div className="flex flex-col items-start text-sm gap-2 w-full">
                  <p className="font-bold">Education</p>
                  {data.education ? (
                    <ReactMarkdown children={data.education} />
                  ) : (
                    <p className="text-gray-400">No data</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
      <Footer />
    </Layout>
  );
};

export default profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/jobseeker/${id}`);
  const data = await res.json();

  return {
    props: { data },
  };
};
