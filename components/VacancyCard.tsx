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
    <div className="flex flex-col">
      <div className="flex justify-between items-center w-full h-[150px] bg-white pr-8">
        <div className="flex items-center">
          <Image
            loader={() => src}
            src={src}
            width={150}
            height={150}
            unoptimized
          />
          <div className="flex flex-col justify-center items-start ml-4 h-1/2">
            <div className="font-bold text-lg cursor-pointer hover:underline">
              <Link href={`/vacancies/${vacancies.vacancy_id}`}>
                {vacancies.job_title}
              </Link>
            </div>
            <div className="text-sm font-poppins">
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
            <div className="hover:underline cursor-pointer text-green-600">
              <Link
                href={`/vacancies/addVacancy/?status=edit&id=${vacancies.vacancy_id}`}
              >
                Edit
              </Link>
            </div>
            <button
              type="button"
              className="hover:underline font-semibold text-red-600"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        )}
        {!isEmployer && (
          <Button variant="green" type="button">
            <div className="flex justify-center gap-1">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              SAVE
            </div>
          </Button>
        )}
      </div>
      <div className="h-[1px]" />
    </div>
  );
};

export default VacancyCard;
