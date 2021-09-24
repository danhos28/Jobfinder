/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, SubmitHandler } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { IProfileProps } from '../interfaces/IProfiles';

const editProfile = ({ data }: IProfileProps) => {
  const router = useRouter();
  const { id } = router.query;
  const url = `${process.env.NEXT_PUBLIC_URL}/jobseeker/${id}`;
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<IProfileProps> = (formData, e) => {
    e?.preventDefault();
    axios
      .put(url, formData)
      .then(() => router.push(`/profile?id=${id}`))
      .catch((err) => console.log(err));
  };
  return (
    <Layout title="Jobfinder: Edit profile">
      <Navbar />
      <div className="bg-layer-profile w-full pb-16 flex justify-center font-poppins">
        <div className="flex flex-col mt-[80px] w-[95vw] sm:w-[80vw] md:w-[70vw] max-w-screen-lg bg-white shadow-md rounded-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-12 text-sm font-poppins"
          >
            <h1 className="text-base font-bold text-center sm:text-left">
              Edit Profile
            </h1>
            <div className="flex flex-col-reverse sm:flex-row gap-6">
              <div className="flex flex-col w-full sm:w-1/2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    id="first_name"
                    placeholder="First Name"
                    className="input-text capitalize"
                    required
                    defaultValue={data.first_name}
                    {...register('first_name')}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    id="last_name"
                    placeholder="Last Name"
                    className="input-text capitalize"
                    required
                    defaultValue={data.last_name}
                    {...register('last_name')}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="job_title">Phone Number</label>
                  <input
                    id="phone_number"
                    type="number"
                    placeholder="Phone Number"
                    className="input-text"
                    defaultValue={data.phone_number}
                    {...register('phone_number')}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    placeholder="Address"
                    className="input-text"
                    defaultValue={data.address}
                    {...register('address')}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address">Tagline</label>
                  <input
                    id="tagline"
                    placeholder="Tagline"
                    className="input-text"
                    defaultValue={data.tagline}
                    {...register('tagline')}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="summary">Summary</label>
                  <textarea
                    className="w-full h-16 bg-gray-50 p-2"
                    id="summary"
                    placeholder="Summary"
                    defaultValue={data.summary}
                    {...register('summary')}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full sm:w-1/2 items-center justify-center gap-6">
                <div className="flex items-center justify-center rounded-full bg-gray-50 h-[150px] w-[150px] lg:h-[180px] lg:w-[180px]">
                  {data.profile_picture ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_URL}/images/${data.profile_picture}`}
                      alt="preview"
                      className="h-[150px] w-[150px] lg:h-[180px] lg:w-[180px] rounded-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#bcbcbc"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                <Link
                  href={`/profilePicture?id=${id}&profilepic=${data.profile_picture}`}
                >
                  <div className="px-4 py-2 border-2 border-blue-700 rounded-full text-blue-700 font-bold hover:bg-gray-100 cursor-pointer">
                    Edit profile picture
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-1 w-full sm:w-1/2">
                <label htmlFor="experience">Experience</label>
                <textarea
                  className="textarea"
                  id="experience"
                  placeholder="Experience"
                  defaultValue={data.experiences}
                  {...register('experiences')}
                />
              </div>
              <div className="flex flex-col gap-1 w-full sm:w-1/2">
                <label htmlFor="skill">Skill</label>
                <textarea
                  className="textarea"
                  id="skill"
                  placeholder="Skill"
                  defaultValue={data.skills}
                  {...register('skills')}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-1 w-full sm:w-1/2">
                <label htmlFor="education">Education</label>
                <textarea
                  className="textarea"
                  id="education"
                  placeholder="Education"
                  defaultValue={data.education}
                  {...register('education')}
                />
              </div>
              <div className="flex flex-col gap-1w-full sm:w-1/2">
                <label htmlFor="certificate">Certificate</label>
                <textarea
                  className="textarea"
                  id="certificate"
                  placeholder="Certificate"
                  defaultValue={data.certificates}
                  {...register('certificates')}
                />
              </div>
            </div>

            <div className="flex justify-center w-full gap-4">
              <Button type="submit" variant="green" style="mt-4 w-[150px]">
                Submit
              </Button>
              <Button
                type="button"
                variant="red"
                style="mt-4 w-[150px]"
                onClick={() => router.push(`/profile?id=${id}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default editProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/jobseeker/${id}`);
  const data = await res.json();

  return {
    props: { data },
  };
};
