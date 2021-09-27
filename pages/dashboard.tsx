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
        <SearchBar />
        <div className="flex justify-between items-center mt-[40px] mb-2 w-full sm:w-3/4 px-4 font-poppins text-sm">
          <p>{jobCount} jobs found</p>
          <p>Sorted by: Newest</p>
        </div>

        <div className="flex flex-col h-auto w-[95vw] sm:w-[90vw] md:w-3/4 border-[1px] mb-10">
          {vacancies.data.map((vacancy) => (
            <VacancyCard
              vacancyDelete={vacancyDelete}
              setVacancyDelete={setVacancyDelete}
              vacancies={vacancy}
              key={vacancy.vacancy_id}
              isEmployer={false}
            />
          ))}
        </div>
        <Pagination perPage={5} pageTotal={jobCount} />

        <Footer />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1, perPage = 5 }: any = context.query;

  const url = process.env.NEXT_PUBLIC_URL;
  const res = await fetch(`${url}/vacancy?page=${page}&perPage=${perPage}`);
  const vacancies = await res.json();

  return {
    props: {
      vacancies,
    },
    // revalidate: 10,
  };
};

export default dashboard;
