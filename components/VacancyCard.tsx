import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { IVacancies } from '../interfaces/IVacancies';

interface IProps {
  vacancies: IVacancies;
}

const VacancyCard = ({ vacancies }: IProps) => {
  let day: string = 'Today';
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

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center w-full h-[150px] bg-white pr-8">
        <div className="flex items-center">
          <Image src="/images/company-default.png" width={150} height={150} />
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

        {/* <div
  dangerouslySetInnerHTML={{ __html: marked(vacancy.job_duties) }}
></div> */}
      </div>
      <div className="h-[1px]" />
    </div>
  );
};

export default VacancyCard;
