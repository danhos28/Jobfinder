/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import VacancyCard from '../components/VacancyCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import { IVacancies } from '../interfaces/IVacancies';

interface IProps {
  vacancies: Array<IVacancies>;
}

const dashboard: React.FC<IProps> = ({ vacancies }) => {
  const [vacancyDelete, setVacancyDelete] = useState(false);
  const jobCount = vacancies.length;

  return (
    <div className="flex flex-col items-center bg-gray-50">
      <Navbar />
      <SearchBar />
      <div className="flex justify-between items-center mt-[40px] mb-2 w-full sm:w-3/4 px-4">
        <p>{jobCount} jobs found</p>
        <p>Sorted by: Newest</p>
      </div>

      <div className="flex flex-col h-auto w-[95vw] sm:w-[90vw] md:w-3/4 border-[1px] font-poppins mb-32">
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
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/vacancy`);
  const vacancies = await res.json();

  return {
    props: {
      vacancies,
    },
    revalidate: 10,
  };
}

export default dashboard;
