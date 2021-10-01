/* eslint-disable prefer-template */
/* eslint-disable react/no-children-prop */
/* eslint-disable camelcase */
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import useWindowSize from '../hooks/useWindowSize';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { IVacancies } from '../interfaces/IVacancies';

interface IAppVac extends IVacancies {
  response: string;
  applied_at: string;
}

interface IApplication {
  application: {
    data: IAppVac[];
  };
}

const applications = ({ application }: IApplication) => {
  const { data } = application;
  const { width } = useWindowSize();
  console.log(width);

  return (
    <Layout title="Jobfinder: applications">
      <Navbar />
      <div className="flex justify-center w-screen h-auto bg-gray-50 pt-4 pb-16 font-poppins">
        <div className="flex flex-col h-auto w-[95vw] sm:w-[90vw] md:w-3/4 border-[1px] mt-[60px] bg-white">
          <p className="py-4 border-b-[1px] font-bold px-8 text-blue-800">
            Your Application
          </p>

          {data ? (
            data.map((app: IAppVac) => (
              <div className="flex flex-col border-b-[1px] w-full justify-between pr-8">
                <div className="flex items-center">
                  <img
                    src={
                      app.job_thumb
                        ? `${process.env.NEXT_PUBLIC_URL}/images/${app.job_thumb}`
                        : '/images/company-default.png'
                    }
                    alt="company logo"
                    className="w-[80px] h-[80px] sm:w-[140px] sm:h-[140px]"
                  />

                  <p className="p-4 font-bold text-base w-full">
                    {app.job_title}
                  </p>

                  <div className="flex flex-col p-2 sm:justify-center items-center w-[30%] text-sm sm:text-base">
                    <p className="font-bold">Status</p>
                    <p className="text-gray-400">{app.response}</p>
                  </div>
                </div>
                <div className="flex justify-between p-2 gap-2 sm:p-4">
                  <div className="flex flex-col">
                    <p>{app.company}</p>
                    <p className="text-sm">{app.job_location}</p>
                    <p className="text-blue-700 text-sm">
                      ± Rp.
                      {parseInt(app.salary, 10)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </p>
                    <p className="text-sm font-semibold">
                      {app.employment_type}
                    </p>
                    <p className="text-gray-500">
                      Applied at
                      {app.applied_at
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('/')}
                    </p>
                  </div>

                  <ReactMarkdown
                    children={
                      width! > 400
                        ? app.job_qualifications.substring(0, 250) + '......'
                        : app.job_qualifications.substring(0, 200) + '......'
                    }
                    className="text-sm"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-1 h-[70vh] w-full justify-center items-center">
              <p className="font-bold text-gray-300 text-xl">No applications</p>
              <p className="text-gray-300">Try to apply some jobs</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default applications;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/application/${id}`);
  const application = await res.json();

  return {
    props: { application },
  };
};
