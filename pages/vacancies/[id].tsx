/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import { GetStaticPropsResult, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import { IVacancies } from '../../interfaces/IVacancies';

interface IProps {
  vacancy: IVacancies;
}

const VacancyDetail = ({ vacancy }: IProps) => {
  const router = useRouter();
  const url = 'http://localhost:5000/images/';
  // const { id } = router.query;

  if (router.isFallback) {
    return <p>Loading</p>;
  }

  let src = `${url}${vacancy.job_thumb}`;
  if (!vacancy.job_thumb) {
    src = '/images/company-default.png';
  }

  return (
    <Layout title="Job detail">
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-[60px] sm:pt-[80px] pb-14 h-[full] w-screen bg-gray-100">
        <div className="flex flex-col items-center justify-start w-screen sm:w-[90vw] max-w-screen-xl pb-8 bg-white shadow-md rounded-md overflow-hidden">
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
                    />
                  </div>
                  <p className="font-bold text-xl">{vacancy.job_title}</p>
                  <p className="mb-4 block sm:hidden">{vacancy.company}</p>
                </div>
                <p className="mb-4 hidden sm:block">{vacancy.company}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="button" variant="blue">
                    APPLY
                  </Button>
                  <Button type="button" variant="green">
                    <div className="flex items-center justify-center gap-2">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      SAVE
                    </div>
                  </Button>
                  <div className="items-center sm:hidden block">
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
                    <p className="ml-2 sm:hidden block">
                      {vacancy.job_location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="items-center sm:flex hidden">
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
              <p className="ml-2 hidden sm:block">{vacancy.job_location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full py-6 px-4 sm:px-12">
            <h1 className="font-semibold text-md mb-1">Job Descriptions</h1>
            <ReactMarkdown children={vacancy.job_desc} />
            <h1 className="font-semibold text-md mb-2">
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
                  <p className="text-blue-700">{vacancy.job_educationReq}</p>
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
            <div className="flex flex-col w-full border-t-[1px] py-4">
              <h1 className="font-semibold text-md mb-2">
                About {vacancy.company}
              </h1>
              <ReactMarkdown children={vacancy.company_about} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VacancyDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:5000/vacancy');
  const data = await res.json();
  const vacancies = JSON.parse(JSON.stringify(data));

  const paths = vacancies.map((vacancy: IVacancies) => ({
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
  const res = await fetch(`http://localhost:5000/vacancy/${id}`);
  const data = await res.json();
  const vacancy = JSON.parse(JSON.stringify(data));

  return {
    props: {
      vacancy,
    },
  };
};
