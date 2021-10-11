/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Navbar from '../components/Navbar';
import VacancyCard from '../components/VacancyCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { IVacancies } from '../interfaces/IVacancies';
import Pagination from '../components/Pagination';

interface IProps {
  vacancies: {
    data: Array<IVacancies>;
    totalItems: number;
  };
}

const dashboard: React.FC<IProps> = ({ vacancies }) => {
  const [vacancyDelete, setVacancyDelete] = useState(false);
  const jobCount: number = vacancies.totalItems;

  return (
    <Layout title="Jobfinder: Dashboard">
      <div className="flex flex-col items-center bg-gray-50">
        <Navbar />
        <div className="pt-[60px] px-4 sm:px-7 h-32 sm:h-40 w-full sm:w-[90vw] md:w-3/4 bg-gray-100">
          <SearchBar />
        </div>
        <div className="flex justify-between items-center mt-[40px] mb-2 w-full sm:w-3/4 px-4 font-poppins text-sm">
          <p>{jobCount} jobs found</p>
          <p>Sorted by: Newest</p>
        </div>

        <div className="flex flex-col h-auto w-[95vw] sm:w-[90vw] md:w-3/4 border-[1px] border-gray-100 mb-10 shadow-sm">
          {vacancies.totalItems > 0 ? (
            vacancies.data.map((vacancy) => (
              <VacancyCard
                vacancyDelete={vacancyDelete}
                setVacancyDelete={setVacancyDelete}
                vacancies={vacancy}
                key={vacancy.vacancy_id}
                isEmployer={false}
              />
            ))
          ) : (
            <div
              className="h-[50vh] w-full text-lg font-poppins text-gray-300 font-bold bg-gray-100
             flex flex-col items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Sorry! Job not found.</p>
            </div>
          )}
        </div>
        {vacancies.data.length === 0 ? (
          <div className="p-12" />
        ) : (
          <Pagination perPage={10} pageTotal={jobCount} />
        )}

        <Footer />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { searchVacancy, page = 1, perPage = 10 }: any = context.query;

  const url = process.env.NEXT_PUBLIC_URL;
  const res = await fetch(
    searchVacancy
      ? `${url}/vacancy/search?searchVacancy=${searchVacancy}&page=${page}&perPage=${perPage}`
      : `${url}/vacancy?page=${page}&perPage=${perPage}`,
  );
  const vacancies = await res.json();

  return {
    props: {
      vacancies,
    },
    // revalidate: 10,
  };
};

export default dashboard;
