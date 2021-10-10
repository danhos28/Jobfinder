/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-children-prop */
/* eslint-disable camelcase */
import axios from 'axios';
// eslint-disable-next-line object-curly-newline
import { useState, useEffect, useRef, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import ModalAccept from '../components/ModalAccept';
import Navbar from '../components/Navbar';
import StateContext from '../contexts/StateContext';
// /import { IProfileProps } from '../interfaces/IProfiles';
// import { IVacancies } from '../interfaces/IVacancies';

// interface IApplicationDetail extends IVacancies, IProfileProps {
//   message: string;
//   applied_at: string;
// }

const acceptApplicant = ({ data }: any) => {
  const url = `${process.env.NEXT_PUBLIC_URL}`;
  const router = useRouter();
  const { id, modal } = router.query;
  const { userId } = useContext<any>(StateContext);
  const [modalOpen, setModalOpen] = useState<boolean>(modal ? true : false);
  const [elHeight, setElHeight] = useState<number | null>();
  const ref = useRef<any>(null);

  const close = () => {
    setModalOpen(false);
  };
  const open = () => setModalOpen(true);

  const acceptHandler = () => {
    modalOpen ? close() : open();
  };

  const rejectHandler = (application_id: string | string[] | undefined) => {
    const app_response = {
      application_id,
      response: 'REJECT',
    };

    axios
      .put(`${url}/application`, app_response)
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
          title: 'Candidate Rejected!',
        });
        router.push('/empDashboard');
      })
      .catch(() => null);
  };

  const downlodResume = (jobseekerId: string) => {
    router.push(`${url}/uploadCv/${jobseekerId}`);
  };

  useEffect((): any => {
    // modalOpen
    //   ? (document.documentElement.style.overflow = 'hidden')
    //   : (document.documentElement.style.overflow = 'unset');
    setElHeight(ref.current.clientHeight);
    // return () => (document.documentElement.style.overflow = 'unset');
  }, [elHeight]);

  return (
    <Layout title="Jobfinder: accept">
      <Navbar />
      <div
        className="flex flex-col bg-gray-50 w-screen items-center pb-16 font-poppins"
        ref={ref}
      >
        <div className="flex flex-col mt-[80px] bg-white w-[95vw] sm:w-3/4 max-w-screen-lg shadow-md rounded-md">
          <div className="flex flex-col sm:flex-row py-4 px-4 sm:px-8 border-b-[1px] gap-4 text-sm items-center">
            <div className="flex items-center gap-2 sm:gap-4 w-full">
              <img
                src={
                  data.profile_picture
                    ? `${url}/vacancy/thumb/${data.profile_picture}`
                    : 'images/user.png'
                }
                className="w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] object-cover rounded-full"
                alt="profile-pic"
              />
              <div className="flex flex-col justify-center w-3/4 text-sm sm:text-base">
                <p className="capitalize text-base">
                  {`${data.first_name} ${data.last_name}`}
                </p>
                <p>{data.tagline}</p>
                <p>{data.email}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full items-end">
              <div className="flex items-center gap-1">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <p>{data.phone_number}</p>
              </div>
              <div className="flex items-center gap-1">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <p>{data.address}</p>
              </div>
            </div>
          </div>

          <div className="flex-col text-sm pb-16">
            <div className="flex p-4 sm:p-8 flex-col border-b-[1px]">
              <h1 className="pb-2 text-sm sm:text-base">
                Applied for:{' '}
                <span className=" font-bold text-blue-700">
                  {data.job_title}
                </span>
              </h1>
              <h1 className="pb-2 font-bold text-sm sm:text-base">
                Qualifications
              </h1>
              <ReactMarkdown children={data.job_qualifications} />
            </div>

            <div className="flex flex-col px-4 sm:px-8">
              <h1 className="capitalize mb-2 mt-4 font-bold text-sm sm:text-base">{`about ${data.first_name}`}</h1>
              <p className="mb-8">{data.message}</p>

              <Button
                type="button"
                variant="white"
                style="border-2 rounded-full w-[212px] border-blue-700 font-bold text-blue-700 flex gap-1 text-sm sm:text-base"
                onClick={() => downlodResume(data.jobseeker_id)}
              >
                DOWNLOAD RESUME
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </Button>

              <h1 className="capitalize mt-8 font-bold text-base">{`${data.first_name}'s profile`}</h1>
              <p className="font-semibold mt-2 mb-1">Summary</p>
              {data.summary ? (
                <ReactMarkdown children={data.summary} />
              ) : (
                <p className="text-gray-400">No data</p>
              )}

              <div className="flex flex-col sm:flex-row w-full mb-12 gap-0 sm:gap-16">
                <div className="flex flex-col">
                  <p className="font-bold mt-2 mb-1">Experience</p>
                  {data.experiences ? (
                    <ReactMarkdown children={data.experiences} />
                  ) : (
                    <p className="text-gray-400">No data</p>
                  )}

                  <p className="font-bold mt-2 mb-1">Skill</p>
                  {data.skills ? (
                    <ReactMarkdown children={data.skills} />
                  ) : (
                    <p className="text-gray-400">No data</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="font-bold mt-2 mb-1">Education</p>
                  {data.education ? (
                    <ReactMarkdown children={data.education} />
                  ) : (
                    <p className="text-gray-400">No data</p>
                  )}

                  <p className="font-bold mt-2 mb-1">Certificate</p>
                  {data.certificates ? (
                    <ReactMarkdown children={data.certificates} />
                  ) : (
                    <p className="text-gray-400">No data</p>
                  )}
                </div>
              </div>

              <div className="flex w-full gap-8 justify-center">
                <Button type="button" variant="green" onClick={acceptHandler}>
                  Accept
                </Button>
                <Button
                  type="button"
                  variant="red"
                  onClick={() => rejectHandler(id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={() => null}
        >
          {modalOpen && (
            <ModalAccept
              handleClose={close}
              name={data.first_name}
              jobseekerId={data.jobseeker_id}
              employerId={userId}
              applicationId={id}
              elHeight={elHeight}
              jobTitle={data.job_title}
              company={data.company}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </Layout>
  );
};

export default acceptApplicant;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/application/detail/${id}`,
  );
  const data = await res.json();

  return {
    props: { data },
  };
};
