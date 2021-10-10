/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import { IVacancies } from '../../interfaces/IVacancies';
import StateContext from '../../contexts/StateContext';
import Layout from '../../components/Layout';

const addVacancy = () => {
  const router = useRouter();
  const { id, status } = router.query;
  const { register, handleSubmit } = useForm();
  const { isLoggedIn, userId } = useContext<any>(StateContext);
  const [data, setData] = useState<IVacancies | undefined>();
  const url = `${process.env.NEXT_PUBLIC_URL}/vacancy`;
  const role = userId.split('-')[0];

  const onSubmit: SubmitHandler<IVacancies> = (formData, e) => {
    e?.preventDefault();

    const postFormData = new FormData();

    postFormData.append('employer_id', userId);
    postFormData.append('job_title', formData.job_title);
    postFormData.append('job_desc', formData.job_desc);
    postFormData.append('job_qualifications', formData.job_qualifications);
    postFormData.append('job_notes', formData.job_notes);
    postFormData.append('job_level', formData.job_level);
    postFormData.append('job_educationreq', formData.job_educationreq);
    postFormData.append('salary', formData.salary);
    postFormData.append('employment_type', formData.employment_type);
    postFormData.append('category', formData.category);
    postFormData.append('job_location', formData.job_location);
    postFormData.append('company', formData.company);
    postFormData.append('company_about', formData.company_about);
    postFormData.append('image', formData.image[0]);

    if (status === 'edit') {
      axios
        .put(`${url}/${id}`, postFormData, {
          headers: { 'Content-type': 'multipart/form-data' },
        })
        .then(() => {
          router.push('/empDashboard');
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(url, postFormData, {
          headers: { 'Content-type': 'multipart/form-data' },
        })
        .then(() => {
          router.push('/empDashboard');
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (status === 'edit') {
      axios
        .get(`${url}/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const renderForm = () => {
    if (
      status
        ? isLoggedIn && role === 'employer' && data
        : isLoggedIn && role === 'employer'
    ) {
      return (
        <Layout title="Jobfinder: Vacancy">
          <div className="flex justify-center pt-[75px] pb-14 h-auto w-screen bg-layer">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-auto w-11/12 sm:w-3/4 md:w-[60vw] lg:w-1/2 max-w-lg bg-white rounded-md shadow-md overflow-hidden font-poppins text-xs"
            >
              <div className="flex justify-between items-center text-base text-left text-white bg-blue-500 font-semibold w-full border-b-[1px] px-8 py-4">
                {data ? <p>EDIT VACANCY</p> : <p>ADD NEW VACANCY</p>}
                <Link href="/empDashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 cursor-pointer hover:scale-110 transition-all duration-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-col p-6 bg-white font-semibold gap-3">
                <label htmlFor="job_title">Title</label>
                <input
                  id="job_title"
                  placeholder="Title"
                  className="input-text"
                  required
                  defaultValue={data?.job_title}
                  {...register('job_title')}
                />

                <label htmlFor="job_desc">Description</label>
                <textarea
                  className="textarea"
                  id="job_desc"
                  placeholder="Description"
                  required
                  defaultValue={data?.job_desc}
                  {...register('job_desc')}
                />

                <label htmlFor="job_qualifications">
                  Minimun Qualifications
                </label>
                <textarea
                  className="textarea"
                  id="job_qualifications"
                  placeholder="Minimun Qualifications"
                  required
                  defaultValue={data?.job_qualifications}
                  {...register('job_qualifications')}
                />

                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  className="textarea"
                  id="notes"
                  placeholder="Additional Notes"
                  defaultValue={data?.job_notes}
                  {...register('job_notes')}
                />

                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  placeholder="Location"
                  className="input-text"
                  required
                  defaultValue={data?.job_location}
                  {...register('job_location')}
                />

                <label htmlFor="salary">Salary</label>
                <input
                  id="salary"
                  type="number"
                  placeholder="Salary"
                  className="input-text"
                  required
                  defaultValue={data?.salary}
                  {...register('salary')}
                />

                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-col w-1/2 gap-2">
                    <label htmlFor="job_level">Job Level</label>
                    <select
                      id="job_level"
                      required
                      {...register('job_level')}
                      className="w-[90px]"
                      defaultValue={data?.job_level}
                    >
                      <option value="internship">Internship</option>
                      <option value="entry level">Entry level</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="manager">Manager</option>
                      <option value="executive">Executive</option>
                    </select>

                    <label htmlFor="emp_type">Employment Type</label>
                    <select
                      id="emp_type"
                      required
                      {...register('employment_type')}
                      className="w-[90px]"
                      defaultValue={data?.employment_type}
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Contractual">Contractual</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-1/2 gap-2">
                    <label htmlFor="education">Education</label>
                    <select
                      id="education"
                      required
                      {...register('job_educationReq')}
                      className="w-[160px]"
                      defaultValue={data?.job_educationreq}
                    >
                      <option value="less than high school">
                        Less than high school
                      </option>
                      <option value="high School">High School</option>
                      <option value="graduated from high school">
                        Graduated from high school
                      </option>
                      <option value="associate's studies">
                        Associate's studies
                      </option>
                      <option value="completed associate's studies">
                        Completed associate's studies
                      </option>
                      <option value="bachelor's studies">
                        Bachelor's studies
                      </option>
                      <option value="bachelor's degree graduate">
                        Bachelor's degree graduate
                      </option>
                      <option value="master">Master</option>
                      <option value="master degree graduate">
                        Master degree graduate
                      </option>
                      <option value="doctorate">Doctorate</option>
                      <option value="doctoral degree graduate">
                        Doctoral degree graduate
                      </option>
                    </select>

                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      required
                      {...register('category')}
                      className="w-[120px]"
                      defaultValue={data?.category}
                    >
                      <option value="accounting and fincance">
                        Accounting and Fincance
                      </option>
                      <option value="architecture and engineering">
                        Architecture and Engineering
                      </option>
                      <option value="arts and sports">Arts and Sports</option>
                      <option value="customer services">
                        Customer Services
                      </option>
                      <option value="education and training">
                        Education and Training
                      </option>
                      <option value="health and medical">
                        Health and Medical
                      </option>
                      <option value="human resources">Human Resources</option>
                      <option value="hospitality and tourism">
                        Hospitality and Tourism
                      </option>
                      <option value="IT and software">IT and Software</option>
                      <option value="management and consultancy">
                        Management and Consultancy
                      </option>
                      <option value="supply chain">Supply Chain</option>
                      <option value="writing and content">
                        Writing and Content
                      </option>
                      <option value="media and creatives">
                        Media and Creatives
                      </option>
                      <option value="safety and security">
                        Safety and Security
                      </option>
                    </select>
                  </div>
                </div>

                <label htmlFor="job_thumb">Upload company logo</label>
                <input {...register('image')} type="file" id="job_thumb" />

                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  placeholder="Company"
                  className="input-text"
                  required
                  defaultValue={data?.company}
                  {...register('company')}
                />

                <label htmlFor="about">Company Profile</label>
                <textarea
                  className="textarea mb-4"
                  id="about"
                  placeholder="Company Profile"
                  required
                  defaultValue={data?.company_about}
                  {...register('company_about')}
                />

                <Button type="submit" variant="green">
                  {data ? 'UPDATE' : 'SUBMIT'}
                </Button>
              </div>
            </form>
          </div>
        </Layout>
      );
    }

    return (
      <div className="h-screen w-screen justify-center items-center bg-gray-50 font-bold text-lg text-gray-400">
        <h1>Loading...</h1>
      </div>
    );
  };
  return (
    <>
      <Navbar />
      {renderForm()}
    </>
  );
};

export default addVacancy;
