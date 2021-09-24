/* eslint-disable react/style-prop-object */
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { IVacancies } from '../interfaces/IVacancies';

interface IProps {
  vacancyDelete: boolean;
  // eslint-disable-next-line no-unused-vars
  setVacancyDelete: (vacancyDelete: boolean) => void;
  vacancies: IVacancies;
  isEmployer: boolean;
}

const VacancyCard = ({
  vacancies,
  isEmployer,
  vacancyDelete,
  setVacancyDelete,
}: IProps) => {
  let day: string = 'Today';

  const url = `${process.env.NEXT_PUBLIC_URL}/images/`;
  const d1: number = new Date().getTime();
  const d2: number = Date.parse(vacancies.job_createAt);
  const datePostedInTime: number = Math.abs(d2 - d1);
  const datePostedInDays: number = Math.floor(
    datePostedInTime / (1000 * 3600 * 24),
  );
  if (datePostedInDays > 1) {
    day = ' days ago';
  } else if (datePostedInDays === 1) {
    day = ' day ago';
  }

  let src = `${url}${vacancies.job_thumb}`;
  if (!vacancies.job_thumb) {
    src = '/images/company-default.png';
  }

  const deleteHandler = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_URL}/vacancy/${vacancies.vacancy_id}`)
      .then(() => {
        console.log('delete success');
        setVacancyDelete(!vacancyDelete);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col font-poppins text-xs sm:text-sm">
      <div className="flex justify-between items-center w-full h-full box-border bg-white pr-2 sm:pr-8 gap-2">
        <div className="flex items-center">
          <div className="block sm:hidden">
            <Image
              loader={() => src}
              src={src}
              width={100}
              height={100}
              unoptimized
              layout="fixed"
            />
          </div>
          <div className="hidden sm:block">
            <Image
              loader={() => src}
              src={src}
              width={150}
              height={150}
              unoptimized
              layout="fixed"
            />
          </div>

          <div className="flex flex-col justify-center items-start ml-4 h-1/2">
            <div className="font-bold text-md cursor-pointer hover:underline">
              <Link href={`/vacancies/${vacancies.vacancy_id}`}>
                {vacancies.job_title}
              </Link>
            </div>
            <div>
              <p>{vacancies.company}</p>
              <p>{vacancies.job_location}</p>
              {datePostedInDays ? (
                <p className="text-gray-600">
                  {datePostedInDays}
                  {day}
                </p>
              ) : (
                <p className="text-gray-600">{day}</p>
              )}
            </div>
          </div>
        </div>

        {isEmployer && (
          <div className="flex flex-col items-end text-lg font-semibold">
            <div className="hover:underline cursor-pointer text-green-600 text-xs sm:text-sm">
              <Link
                href={`/vacancies/addVacancy/?status=edit&id=${vacancies.vacancy_id}`}
              >
                Edit
              </Link>
            </div>
            <button
              type="button"
              className="hover:underline font-semibold text-red-600 text-xs sm:text-sm"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        )}
        {!isEmployer && (
          <div className="hidden sm:block">
            <Button
              variant="green"
              type="button"
              style="bg-white border-2 text-green-700 border-green-600 hover:text-white font-bold px-3"
            >
              <div className="flex justify-center items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                SAVE
              </div>
            </Button>
          </div>
        )}
      </div>
      <div className="h-[1px]" />
    </div>
  );
};

export default VacancyCard;
