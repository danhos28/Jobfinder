import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import VacancyCard from '../components/VacancyCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { IVacancies } from '../interfaces/IVacancies';

const savejob = () => {
  const router = useRouter();
  const [vacancyDelete, setVacancyDelete] = useState(false);
  const [vacancies, setVacancies] = useState<IVacancies[] | null>();

  useEffect(() => {
    const { id } = router.query;
    const url = process.env.NEXT_PUBLIC_URL;
    axios
      .get(`${url}/savejob/${id}`)
      .then((res) => {
        setVacancies(res.data);
      })
      .catch(() => setVacancies(null));
  }, [vacancyDelete]);

  return (
    <Layout title="Jobfinder: Dashboard">
      <div className="flex flex-col items-center bg-gray-50 w-screen">
        <Navbar />
        <div className="flex flex-col mt-[76px] h-auto w-[95vw] sm:w-[90vw] md:w-3/4 border-[1px] mb-10">
          <h1 className="text-blue-700 font-poppins px-8 py-2 sm:py-4 bg-white border-b-[1px] font-bold">
            Saved Jobs
          </h1>
          {vacancies ? (
            vacancies.map((vacancy) => (
              <VacancyCard
                vacancyDelete={vacancyDelete}
                setVacancyDelete={setVacancyDelete}
                vacancies={vacancy}
                key={vacancy.vacancy_id}
                isEmployer={false}
              />
            ))
          ) : (
            <p className="flex items-center justify-center font-poppins h-[70vh] text-lg bg-white text-gray-300 font-bold">
              No saved job
            </p>
          )}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default savejob;
