/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import VacancyCard from '../components/VacancyCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { IVacancies } from '../interfaces/IVacancies';

interface IProps {
  vacancies: Array<IVacancies>;
}

const dashboard: React.FC<IProps> = ({ vacancies }) => {
  const [vacancyDelete, setVacancyDelete] = useState(false);
  const jobCount = vacancies.length;

  return (
    <Layout title="Jobfinder: Dashboard">
      <div className="flex flex-col items-center bg-gray-50">
        <Navbar />
        <SearchBar />
        <div className="flex justify-between items-center mt-[40px] mb-2 w-full sm:w-3/4 px-4 font-poppins text-sm">
          <p>{jobCount} jobs found</p>
          <p>Sorted by: Newest</p>
        </div>

        <div className="flex flex-col h-auto w-[95vw] sm:w-[90vw] md:w-3/4 border-[1px] mb-32">
          {vacancies.map((vacancy) => (
            <VacancyCard
              vacancyDelete={vacancyDelete}
              setVacancyDelete={setVacancyDelete}
              vacancies={vacancy}
              key={vacancy.vacancy_id}
              isEmployer={false}
            />
          ))}
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const url = process.env.NEXT_PUBLIC_URL;
  const res = await fetch(`${url}/vacancy`);
  const vacancies = await res.json();

  return {
    props: {
      vacancies,
    },
    revalidate: 10,
  };
}

export default dashboard;
