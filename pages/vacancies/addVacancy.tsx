/* eslint-disable camelcase */
import { useForm, SubmitHandler } from 'react-hook-form';
import Navbar from '../../components/Navbar';

interface IAddVacancy {
  job_title: string;
  job_desc: string;
  job_qualifications: string;
  job_notes: string;
  job_level: string;
  job_educationReq: string;
  salary: string;
  job_location: string;
  job_thumb?: string;
}

const addVacancy = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<IAddVacancy> = (formData, e) => {
    e?.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center pt-[80px] pb-14 h-auto w-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-screen w-3/4 p-8 bg-blue-200 rounded-md shadow-md overflow-hidden"
        >
          <label htmlFor="job_title">Job Title</label>
          <input id="job_title" placeholder="Job Title" className="border-2" />
          <textarea className=" h-14 w-1/2" {...register('job_desc')} />
          <button type="submit" className="bg-gray-50 h-[30px] w-[80px]">
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default addVacancy;
