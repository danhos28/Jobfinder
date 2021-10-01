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

  const acceptHandler = (id: string) => {
    //   const app_response = {
    //     application_id: id,
    //     response: 'ACCEPT',
    //   };
    //   axios
    //     .put(`${url}/application`, app_response)
    //     .then(() => {
    //       setAppResponse(!appResponse);
    //     })
    //     .catch((err) => console.log(err));
  };

  const renderResponse = (application_id: string) => (
    <div className="flex flex-col xl:flex-row gap-2 text-xs items-center">
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
          onClick={() => acceptHandler(application_id)}
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
      return <p>Rejected</p>;
      // eslint-disable-next-line no-else-return
    } else if (data.response === 'ACCEPT') {
      return <p>Accepted</p>;
    }
    return renderResponse(application_id);
  };

  return (
    <div
      className="flex items-center gap-4 w-full border-b-[1px] pl-2 pr-4 lg:py-4 xl:py-2 bg-white"
      key={data.application_id}
    >
      <img
        src={
          data.profile_picture
            ? `${url}/images/${data.profile_picture}`
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

      <div className="hidden flex-col items-center w-[30%] lg:flex text-sm">
        <p className="text-black font-base text-sm mb-2">{data.job_title}</p>
        {renderResult(data.application_id)}
      </div>
    </div>
  );
};

export default ApplicationCard;
