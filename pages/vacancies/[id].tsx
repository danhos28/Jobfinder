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
  // const { id } = router.query;

  if (router.isFallback) {
    return <p>Loading</p>;
  }

  return (
    <Layout title="Job detail">
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-[80px] pb-14 h-[full] w-screen bg-gray-100">
        <div className="flex flex-col items-center justify-start w-3/4 pb-8 bg-white shadow-md rounded-md overflow-hidden">
          <div className=" bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 w-full h-[40px]" />
          <div className="flex justify-between items-center w-full px-10 border-b-[1px]">
            <div className="flex items-center">
              <Image
                src="/images/company-default.png"
                width={150}
                height={150}
              />
              <div className="flex flex-col ml-10">
                <p className="font-bold text-xl">{vacancy.job_title}</p>
                <p className="mb-4">{vacancy.company}</p>
                <div className="flex gap-4">
                  <Button type="button" variant="blue">
                    APPLY NOW
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
                </div>
              </div>
            </div>

            <div className="flex items-center">
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
              <p className="ml-2">{vacancy.job_location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full p-6">
            <h1 className="font-semibold text-md mb-1">Job Descriptions</h1>
            <p>{vacancy.job_desc}</p>
            <h1 className="font-semibold text-md mb-2">
              Minimum Qualifications
            </h1>
            <ReactMarkdown children={vacancy.job_qualifications} />
            <ReactMarkdown children={vacancy.job_notes} />
            <div className="flex mt-4 w-3/4 justify-between items-center">
              <div className="flex flex-col">
                <h1 className="font-semibold text-md mb-2">
                  Educational Requirement
                </h1>
                <p className="text-blue-700">{vacancy.job_educationReq}</p>
              </div>
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
            <div className="flex flex-col w-full border-t-[1px] py-4">
              <h1 className="font-semibold text-md mb-2">About Company</h1>
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
  const vacancies = await res.json();

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
  const vacancy = await res.json();

  return {
    props: {
      vacancy,
    },
  };
};
