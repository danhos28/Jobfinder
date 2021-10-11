/* eslint-disable react/style-prop-object */
// eslint-disable-next-line no-use-before-define
import React, { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Button from './Button';
import StateContext from '../contexts/StateContext';
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

  const router = useRouter();
  const { saved } = router.query;
  const { userId, isLoggedIn } = useContext<any>(StateContext);
  const role = userId.split('-')[0];
  const url = process.env.NEXT_PUBLIC_URL;
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

  let src = `${url}/vacancy/thumb/${vacancies.job_thumb}`;
  if (!vacancies.job_thumb) {
    src = '/images/company-default.png';
  }

  const saveHandler = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isLoggedIn) {
      axios
        .post(`${process.env.NEXT_PUBLIC_URL}/savejob`, {
          jobseeker_id: userId,
          vacancy_id: vacancies.vacancy_id,
        })
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Job saved!',
          });
        })
        .catch((err) => console.log(err));
    } else {
      router.push('/login');
    }
  };

  const editHandler = (event: React.MouseEvent, vacancyId: string) => {
    event.stopPropagation();
    router.push(`/vacancies/addVacancy/?status=edit&id=${vacancyId}`);
  };

  const deleteHandler = (event: React.MouseEvent, vacancyId: string) => {
    event.stopPropagation();

    if (role === 'employer') {
      axios
        .delete(`${process.env.NEXT_PUBLIC_URL}/vacancy/${vacancyId}`)
        .then(() => {
          setVacancyDelete(!vacancyDelete);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_URL}/savejob/delete`, {
          jobseeker_id: userId,
          vacancy_id: vacancies.vacancy_id,
        })
        .then(() => {
          setVacancyDelete(!vacancyDelete);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex flex-col font-poppins text-xs sm:text-sm">
      <div
        className="flex justify-between items-center w-full h-full box-border bg-white hover:bg-gray-50 pr-2 sm:pr-8 gap-2"
        onClick={() => router.push(`/vacancies/${vacancies.vacancy_id}`)}
        role="button"
        tabIndex={0}
        onKeyPress={() => router.push(`/vacancies/${vacancies.vacancy_id}`)}
      >
        <div className="flex items-center">
          <div className="block sm:hidden">
            <Image
              loader={() => src}
              src={src}
              width={100}
              height={100}
              unoptimized
              layout="fixed"
              objectFit="contain"
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
              objectFit="contain"
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

        {saved || isEmployer ? (
          <div className="flex items-center gap-4">
            {isEmployer && (
              <button
                type="button"
                onClick={(event) => editHandler(event, vacancies.vacancy_id)}
                className="font-bold hover:underline text-green-600 text-xs sm:text-sm"
              >
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
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>
            )}
            <button
              className="text-red-600 text-xs sm:text-sm font-bold hover:underline"
              type="button"
              onClick={(event) => deleteHandler(event, vacancies.vacancy_id)}
            >
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </div>
            </button>
          </div>
        ) : (
          <div className="hidden sm:block">
            <Button
              variant="white"
              type="button"
              style="border-2 text-green-700 border-green-600 font-bold px-3"
              onClick={saveHandler}
            >
              <div className="flex justify-center items-center gap-1">
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
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
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
