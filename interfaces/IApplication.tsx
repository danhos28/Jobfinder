/* eslint-disable camelcase */
export interface IApplication {
  application_id: string;
  message: string;
  applied_at: string;
  response: 'ACCEPT' | 'REJECT' | 'PEDING';
  vacancy_id: string;
  job_title: string;
  jobseeker_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_picture: string;
}
