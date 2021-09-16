/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line no-use-before-define
import React, { useContext } from 'react';
import StateContext from '../contexts/StateContext';
import Navbar from '../components/Navbar';
import VacancyCard from '../components/VacancyCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import { IVacancies } from '../interfaces/IVacancies';

interface IProps {
  vacancies: Array<IVacancies>;
}

const dashboard: React.FC<IProps> = ({ vacancies }) => {
  const { isLoggedIn } = useContext<any>(StateContext);
  const jobCount = vacancies.length;

  return (
    <div className="flex flex-col items-center bg-gray-50">
      <Navbar />
      <SearchBar />
      <div className="flex justify-between items-center mt-[40px] mb-2 w-3/4">
        <p>{jobCount} jobs found</p>
        <p>Sorted by: Newest</p>
        <p>login status: {isLoggedIn.toString()}</p>
      </div>

      <div className="flex flex-col  bg-gray-200 h-auto w-3/4 border-[1px] font-poppins mb-32">
        {vacancies.map((vacancy) => (
          <VacancyCard
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
  const res = await fetch('http://localhost:5000/vacancy');
  const vacancies = await res.json();

  return {
    props: {
      vacancies,
    },
    revalidate: 10,
  };
}

export default dashboard;
