/* eslint-disable camelcase */
import { GetServerSideProps } from 'next';
import moment from 'moment';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

interface IData {
  data: {
    interview_id: string;
    employer_id: string;
    jobseeker_id: string;
    interviewer: string;
    type: string;
    datetime: string;
    link: string;
    notes: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    job_title: string;
    company: string;
  }[];
}

const schedule = ({ dataApp }: { dataApp: IData }) => {
  const { data } = dataApp;

  return (
    <Layout title="Schedule for interview - Jobfinder">
      <Navbar />
      {data ? (
        <div className="flex flex-col bg-gray-50 w-screen pb-16 items-center justify-center font-poppins text-sm">
          <div className="flex items-center gap-1 mt-[80px] py-8 font-bold uppercase text-blue-800 text-lg sm:text-xl">
            <h1>Your schedule for Interview</h1>
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <main className="bg-white w-[95vw] lg:w-full rounded-md shadow-md max-w-screen-lg">
            {data.map((item) => (
              <div className="w-full flex-col sm:flex-row border-b-[1px] flex justify-between p-6">
                <div className="flex flex-col w-1/2 mb-2">
                  <p className="font-bold">Candidate</p>
                  <p className="capitalize">{`${item.first_name} ${item.last_name}`}</p>
                  <p>{item.email}</p>
                  <p className="mb-2">{item.phone_number}</p>

                  <p className="font-bold">Applied for</p>
                  <p>{item.job_title}</p>
                  <p>{item.company}</p>
                </div>

                <div className="flex flex-col w-1/2">
                  <p className="font-bold">Date & Time</p>
                  <p className="mb-2">
                    {moment(item.datetime).format('MMMM Do YYYY, h:mm a')}
                  </p>

                  <p className="font-bold">Interviewer</p>
                  <p className="mb-2">{item.interviewer}</p>

                  <p className="font-bold">Interview Type</p>
                  <p className="mb-2">{item.type}</p>

                  <p className="font-bold">Link / Location</p>
                  <p>{item.link}</p>
                </div>
              </div>
            ))}
          </main>
        </div>
      ) : (
        <p className="w-full h-screen flex items-center justify-center text-gray-400 font-bold text-xl">
          You have no schedule for interview
        </p>
      )}
      <Footer />
    </Layout>
  );
};

export default schedule;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/application/getInterview/${id}`,
  );
  const dataApp = await res.json();

  return {
    props: { dataApp },
  };
};
