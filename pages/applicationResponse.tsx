/* eslint-disable camelcase */
import { GetServerSideProps } from 'next';
import moment from 'moment';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

interface IData {
  interviewer: string;
  type: string;
  datetime: string;
  link: string;
  notes: string;
  job_title: string;
  company: string;
  first_name: string;
  last_name: string;
}

const applicationResponse = ({ data }: { data: IData }) => (
  <Layout title="Jobfinder: Response">
    <Navbar />
    <div className="w-screen bg-gray-50 flex items-start justify-center font-poppins pb-8">
      <main className="flex flex-col w-[90vw] max-w-screen-lg bg-white rounded-md shadow-md mt-[90px] px-10 pt-6 pb-16 text-sm">
        <div className="flex text-blue-800 gap-1 items-center mb-12">
          <h1 className="font-bold text-lg">Your Interview Schedule</h1>
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
        <div className="flex flex-col gap-4">
          <div className="flex justify-between mb-4 gap-2 flex-col sm:flex-row">
            <div className="flex flex-col gap-2 mb-2 sm:mb-0">
              <p className="font-bold">{data.job_title}</p>
              <p>{data.company}</p>
              <p className="font-bold">Interviewer</p>
              <p className="capitalize">{`${data.first_name} ${data.last_name} (${data.interviewer})`}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">Interview Type</p>
              <p>{data.type}</p>
              <p className="font-bold">Date & Time</p>
              <p>{moment(data.datetime).format('MMMM Do YYYY, h:mm a')}</p>
              <p className="font-bold">Link / Location</p>
              <p>{data.link}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t-[1px] pt-4">
            <p className="font-bold">Notes</p>
            <p>{data.notes}</p>
          </div>
        </div>
      </main>
    </div>
    <Footer />
  </Layout>
);

export default applicationResponse;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/application/getInterviewDetail/${id}`,
  );
  const data = await res.json();

  return {
    props: { data },
  };
};
