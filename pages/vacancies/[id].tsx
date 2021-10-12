/* eslint-disable react/style-prop-object */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
// eslint-disable-next-line object-curly-newline
import { useContext, useState, useEffect, useRef } from 'react';
import { GetStaticPropsResult, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AnimatePresence } from 'framer-motion';
import StateContext from '../../contexts/StateContext';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import { IVacancies } from '../../interfaces/IVacancies';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer';

interface IProps {
  vacancy: IVacancies;
}

const VacancyDetail = ({ vacancy }: IProps) => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;
  const { isLoggedIn, userId } = useContext<any>(StateContext);
  const { id } = router.query;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [elHeight, setElHeight] = useState<number | null | undefined>();
  const ref = useRef<any>(null);

  const close = () => {
    setModalOpen(false);
  };
  const open = () => setModalOpen(true);

  if (router.isFallback) {
    return <p>Loading</p>;
  }

  useEffect((): any => {
    setElHeight(ref.current.clientHeight - 25);
  }, [elHeight]);

  let src = `${url}/vacancy/thumb/${vacancy.job_thumb}`;
  if (!vacancy.job_thumb) {
    src = '/images/company-default.png';
  }

  const applyHandler = () => {
    if (isLoggedIn) {
      modalOpen ? close() : open();
    } else {
      router.push('/login');
    }
  };

  const saveHandler = () => {
    if (isLoggedIn) {
      axios
        .post(`${process.env.NEXT_PUBLIC_URL}/savejob`, {
          jobseeker_id: userId,
          vacancy_id: id,
        })
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Job saved!',
          });
        })
        .catch((err) => console.log(err));
    } else {
      router.push('/login');
    }
  };

  return (
    <Layout title={`Jobfinder: ${vacancy.job_title}`}>
      <Navbar />
      <div
        className="relative flex flex-col justify-center items-center pt-[60px] sm:pt-[80px] pb-14 h-full w-screen bg-gray-100"
        ref={ref}
      >
        <div className="flex flex-col items-center justify-start h-full w-screen sm:w-[90vw] max-w-screen-xl pb-8 bg-white shadow-md rounded-md overflow-hidden font-poppins">
          <div className="hidden sm:block bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 w-full h-[40px] mb-2" />
          <div className="flex justify-between items-center w-full px-0 sm:px-10 pb-2 py-4 sm:py-0 border-b-[1px]">
            <div className="flex bg-white w-full sm:w-auto items-center">
              <div className="hidden sm:block">
                <Image
                  loader={() => src}
                  src={src}
                  width={150}
                  height={150}
                  unoptimized
                  objectFit="contain"
                />
              </div>
              <div className="flex flex-row justify-between gap-2 sm:justify-start sm:flex-col mx-4 sm:mx-10 w-full sm:w-auto sm:pb-4 md:pb-0">
                <div className="flex flex-col">
                  <div className="block sm:hidden">
                    <Image
                      loader={() => src}
                      src={src}
                      width={150}
                      height={150}
                      unoptimized
                      objectFit="contain"
                    />
                  </div>
                  <p className="font-bold text-md uppercase">
                    {vacancy.job_title}
                  </p>
                  <p className="mb-4 block sm:hidden text-sm">
                    {vacancy.company}
                  </p>
                </div>
                <p className="mb-4 hidden sm:block">{vacancy.company}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-end justify-center">
                  <Button
                    type="button"
                    variant="blue"
                    style="text-sm sm:text-base py-[10px] sm:py-3 w-[105px]"
                    onClick={applyHandler}
                  >
                    APPLY
                  </Button>
                  <Button
                    type="button"
                    variant="green"
                    onClick={saveHandler}
                    style="text-sm sm:text-base py-[10px] sm:py-3 w-[105px]"
                  >
                    <div className="flex items-center justify-center gap-1">
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
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      SAVE
                    </div>
                  </Button>
                  <div className="items-center sm:hidden flex">
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
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="ml-2 sm:hidden block text-xs sm:text-base">
                      {vacancy.job_location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="items-center sm:flex hidden">
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
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="ml-2 hidden text-sm sm:text-md sm:block">
                {vacancy.job_location}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full py-6 px-4 sm:px-12 text-sm">
            <h1 className="font-semibold text-md mb-1 uppercase">
              Job Descriptions
            </h1>
            <ReactMarkdown children={vacancy.job_desc} />
            <h1 className="font-semibold text-md mb-2 uppercase">
              Minimum Qualifications
            </h1>
            <ReactMarkdown children={vacancy.job_qualifications} />
            <ReactMarkdown children={vacancy.job_notes} />

            <div className="flex mt-4 w-full max-w-screen-md justify-between items-start text-sm capitalize">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-md mb-2">
                    Educational Requirement
                  </h1>
                  <p className="text-blue-700">{vacancy.job_educationreq}</p>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-md mb-2">
                    Employment Type
                  </h1>
                  <p className="text-blue-700">{vacancy.employment_type}</p>
                </div>
                <div className="flex sm:hidden flex-col ">
                  <h1 className="font-semibold text-md mb-2">Category</h1>
                  <p className="text-blue-700">{vacancy.category}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-md mb-2">Job Level</h1>
                  <p className="text-blue-700">{vacancy.job_level}</p>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-md mb-2">Salary</h1>
                  <p className="text-blue-700">
                    ± Rp.{' '}
                    {parseInt(vacancy.salary, 10)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex flex-col ">
                <h1 className="font-semibold text-md mb-2">Category</h1>
                <p className="text-blue-700">{vacancy.category}</p>
              </div>
            </div>
            <div className="flex flex-col w-full border-t-[1px] py-6">
              <h1 className="font-semibold text-md mb-2">
                About {vacancy.company}
              </h1>
              <ReactMarkdown children={vacancy.company_about} />
            </div>
          </div>
        </div>
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={() => null}
        >
          {modalOpen && (
            <Modal
              handleClose={close}
              vacancy={vacancy}
              userId={userId}
              elHeight={elHeight}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </Layout>
  );
};

export default VacancyDetail;

interface IVacancyDetail {
  data: Array<IVacancies>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const url = process.env.NEXT_PUBLIC_URL;
  const res = await fetch(`${url}/vacancy?perPage=50`);

  const vacancies: IVacancyDetail = await res.json();

  const paths = vacancies.data.map((vacancy: IVacancies) => ({
    params: {
      id: vacancy.vacancy_id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: any,
): Promise<GetStaticPropsResult<IProps>> => {
  const { id } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/vacancy/${id}`);
  const vacancy = await res.json();

  return {
    props: {
      vacancy,
    },
  };
};
