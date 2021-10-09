/* eslint-disable camelcase */
import axios from 'axios';
import { useRouter } from 'next/router';
import { IApplication } from '../interfaces/IApplication';

const ApplicationCard = ({
  data,
  appResponse,
  setAppResponse,
}: {
  data: IApplication;
  appResponse: boolean;
  // eslint-disable-next-line no-unused-vars
  setAppResponse: (response: boolean) => void;
}) => {
  const url = `${process.env.NEXT_PUBLIC_URL}`;
  const router = useRouter();

  const rejectHandler = (id: string) => {
    const app_response = {
      application_id: id,
      response: 'REJECT',
    };

    axios
      .put(`${url}/application`, app_response)
      .then(() => {
        setAppResponse(!appResponse);
      })
      .catch(() => null);
  };

  const acceptHandler = () => {
    router.push(`/applicationDetail?id=${data.application_id}&modal=true`);
  };

  const deleteHandler = () => {
    axios
      .delete(`${url}/application/${data.application_id}`)
      .then(() => {
        setAppResponse(!appResponse);
      })
      .catch(null);
  };

  const renderResponse = (application_id: string) => (
    <div className="flex flex-row gap-2 text-xs items-center">
      <button
        type="button"
        className=" p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 w-[60px]"
        onClick={
          () =>
            // eslint-disable-next-line implicit-arrow-linebreak
            router.push(`/applicationDetail?id=${data.application_id}`)
          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        Details
      </button>
      <div className="flex gap-2">
        <button
          type="button"
          className=" p-2 bg-green-500 rounded-md text-white hover:bg-green-600"
          onClick={acceptHandler}
        >
          Accept
        </button>
        <button
          type="button"
          className=" p-2 bg-red-500 rounded-md text-white hover:bg-red-600"
          onClick={() => rejectHandler(application_id)}
        >
          Reject
        </button>
      </div>
    </div>
  );

  const renderResult = (application_id: string) => {
    if (data.response === 'REJECT') {
      return (
        <div className="flex gap-1 items-center">
          <p className="text-red-600">Rejected</p>
          <button type="button" onClick={deleteHandler}>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      );
      // eslint-disable-next-line no-else-return
    } else if (data.response === 'ACCEPT') {
      return (
        <div className="flex gap-1 items-center">
          <p className="text-green-600">Accepted</p>
          <button type="button" onClick={deleteHandler}>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      );
    }
    return renderResponse(application_id);
  };

  return (
    <div
      className="flex flex-col xl:flex-row xl:items-center gap-4 w-full border-b-[1px] py-2 pl-2 pr-4 lg:py-4 xl:py-2 bg-white"
      key={data.application_id}
    >
      <div className="flex gap-2 w-full">
        <img
          src={
            data.profile_picture
              ? `${url}/vacancy/thumb/${data.profile_picture}`
              : 'images/user.png'
          }
          alt="profile-pic"
          className="w-[100px] h-[100px] object-cover rounded-full"
        />
        <div className="flex flex-col text-sm font-normal text-black flex-1">
          <p className="block font-bold lg:hidden text-blue-700 mb-2">
            {data.job_title}
          </p>
          <p className="capitalize font-semibold">
            {`${data.first_name} ${data.last_name}`}
          </p>
          <p className="text-xs">{data.email}</p>
          <p className="text-xs">{data.phone_number}</p>
          <p className="text-xs">
            {'Applied at '}
            {data.applied_at.slice(0, 10).split('-').reverse().join('/')}
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:items-center w-[30%] lg:flex text-sm px-2">
        <p className="text-black font-base text-sm mb-2">{data.job_title}</p>
        {renderResult(data.application_id)}
      </div>
    </div>
  );
};

export default ApplicationCard;
