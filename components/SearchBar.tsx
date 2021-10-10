/* eslint-disable react/style-prop-object */
import axios from 'axios';
// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from './Button';
import { IVacancies } from '../interfaces/IVacancies';

const SearchBar = () => {
  const [searchVacancy, setSearchVacancy] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredData, setFilteredData] = useState<IVacancies[]>([]);
  const router = useRouter();

  const handleFilter = (event: ChangeEvent<{ value: string }>) => {
    setSearchVacancy(event.target.value);
  };

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/dashboard?searchVacancy=${searchVacancy}`);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_URL}/vacancy/search?searchVacancy=${searchVacancy}`,
      )
      .then((res) => {
        setFilteredData(res.data.data);
      });
  }, [searchVacancy]);

  return (
    <form className="flex justify-between items-center gap-4 h-full w-full text-sm">
      <div className="flex w-full relative">
        <input
          placeholder="Search job or company ..."
          className="h-10 sm:h-12 px-4 w-full"
          onChange={handleFilter}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
        />
        {searchVacancy.length !== 0 && isExpanded && (
          <div className="flex flex-col absolute w-full h-auto bg-white shadow-md top-[50px] z-10 cursor-pointer">
            {filteredData.slice(0).map((value) => (
              <button
                type="submit"
                onMouseDown={
                  () =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    router.push(`/vacancies/${value.vacancy_id}`)
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                key={value.vacancy_id}
              >
                <div className="flex gap-4 p-4 hover:bg-gray-50">
                  <p>{value.job_title}</p>
                  <p className="text-gray-500 hidden sm:block">
                    {value.company}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        type="submit"
        variant="blue"
        onClick={handleSearch}
        style="h-10 sm:h-12"
      >
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">SEARCH</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </Button>
    </form>
  );
};
export default SearchBar;
