/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import StateContext from '../contexts/StateContext';
import VacancyCard from '../components/VacancyCard';
import Navbar from '../components/Navbar';
import Error from '../components/Error';
import { IVacancies } from '../interfaces/IVacancies';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import ApplicationCard from '../components/ApplicationCard';
import { IApplication } from '../interfaces/IApplication';

const empDashboard = () => {
  const { isLoggedIn, userId } = useContext<any>(StateContext);
  const [data, setData] = useState([]);
  const [appData, setAppData] = useState([]);
  const [vacancyDelete, setVacancyDelete] = useState(false);
  const [appResponse, setAppResponse] = useState(false);
  const router = useRouter();
  const role = userId.split('-')[0];
  const url = `${process.env.NEXT_PUBLIC_URL}`;

  const addJobHandler = () => {
    router.push('/vacancies/addVacancy');
  };

  useEffect(() => {
    axios
      .get(`${url}/vacancy/employer/${userId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId, vacancyDelete]);

  useEffect(() => {
    axios
      .get(`${url}/application/employer/${userId}`)
      .then((res) => {
        setAppData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [userId, appResponse]);

  const renderDashboard = () => {
    if (isLoggedIn && role === 'employer') {
      return (
        <div className="flex flex-col pt-[80px] gap-4 px-0 sm:px-8 pb-12 bg-gray-50">
          <button
            type="button"
            onClick={addJobHandler}
            className="max-w-[150px] ml-4 sm:ml-0 bg-green-500 px-4 py-2 text-white rounded-md hover:bg-green-400 font-poppins text-sm font-black"
          >
            Post a New Job
          </button>

          <div className="flex flex-col md:flex-row w-full gap-6">
            <div className="flex flex-col w-full lg:w-1/2">
              <p className="flex justify-center items-center font-bold bg-white border-[1px] px-2 py-1 max-w-[120px]">
                My vacancy
              </p>
              <div className="flex flex-col min-h-[450px] border-[1px] bg-gray-100">
                {data.map((vacancy: IVacancies) => (
                  <div key={vacancy.vacancy_id}>
                    <VacancyCard
                      vacancyDelete={vacancyDelete}
                      setVacancyDelete={setVacancyDelete}
                      vacancies={vacancy}
                      key={vacancy.vacancy_id}
                      isEmployer
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-1/2">
              <p className="flex justify-center items-center font-bold bg-white border-[1px] px-2 py-1 max-w-[120px]">
                Applicant
              </p>
              <div className="flex flex-col font-poppins items-center min-h-[450px] bg-gray-100 border-[1px] w-full text-xl font-bold text-gray-400">
                {appData ? (
                  appData.map((app: IApplication) => (
                    <ApplicationCard
                      key={app.application_id}
                      data={app}
                      appResponse={appResponse}
                      setAppResponse={setAppResponse}
                    />
                  ))
                ) : (
                  <p>No applicant yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Error />;
  };

  return (
    <>
      <Layout title="Jobfinder: Find your dream job">
        <Navbar />
        {renderDashboard()}
        <Footer />
      </Layout>
    </>
  );
};

export default empDashboard;
