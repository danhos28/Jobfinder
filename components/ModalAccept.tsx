/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import Backdrop from './Backdrop';
import Button from './Button';

const dropIn = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

interface IModal {
  handleClose: () => void;
  name: string;
  elHeight: number | null | undefined;
  jobseekerId: string;
  employerId: string;
  applicationId: string | string[] | undefined;
}

interface IFormData {
  interviewer: string;
  type: string;
  // eslint-disable-next-line camelcase
  location_link: string;
  notes: string;
}

const ModalAccept = ({
  handleClose,
  name,
  elHeight,
  jobseekerId,
  employerId,
  applicationId,
}: IModal) => {
  const { register, handleSubmit } = useForm();
  const [selectedDate, setSelectDate] = useState<any>(new Date());
  const url = `${process.env.NEXT_PUBLIC_URL}/application/postInterview`;
  const router = useRouter();

  const onSubmit = (formData: IFormData) => {
    const data = {
      application_id: applicationId,
      employer_id: employerId,
      jobseeker_id: jobseekerId,
      interviewer: formData.interviewer,
      type: formData.type,
      datetime: selectedDate,
      link: formData.location_link,
      notes: formData.notes,
    };
    axios
      .post(url, data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Interview schedule posted!',
          text: 'Schedule for interview has been posted',
        });
        handleClose();
        router.push('/empDashboard');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong',
          text: error,
        });
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <Backdrop onClick={handleClose} elHeight={elHeight}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded-md flex flex-col items-center px-6 py-8 sm:p-10 bg-white w-[95vw] sm:w-[60vw] max-w-screen-md font-poppins mx-auto"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-base mb-4">
          Take
          <span className="font-bold capitalize">{` ${name} `}</span>
          to the next step!
        </h1>

        <form
          className="flex flex-col w-full gap-2 text-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>Choose date and time for interview</p>
          <DatePicker
            selected={selectedDate}
            minDate={new Date()}
            onChange={(date) => setSelectDate(date)}
            showTimeSelect
            dateFormat="Pp"
            showDisabledMonthNavigation
          />

          <label htmlFor="interviewer">Interviewer</label>
          <select
            id="interviewer"
            required
            //  {...register('job_level')}
            className="w-[90px]"
            {...register('interviewer')}
          >
            <option value="HR">HR</option>
            <option value="User">User</option>
          </select>

          <p>Interview Type</p>
          <div className="flex w-full items-center gap-4">
            <label htmlFor="online" className="flex gap-1 items-center">
              <input
                type="radio"
                id="online"
                value="Online"
                checked
                {...register('type', { required: true })}
              />
              Online
            </label>
            <label htmlFor="offline" className="flex gap-1 items-center">
              <input
                type="radio"
                id="offline"
                value="Offline"
                {...register('type', { required: true })}
              />
              Offline
            </label>
          </div>

          <label htmlFor="location_link">Location/Link</label>
          <input
            id="location_link"
            placeholder="location/link"
            className="input-text w-full"
            required
            {...register('location_link')}
          />

          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            className="textarea w-full"
            placeholder="notes"
            required
            {...register('notes')}
          />

          <div className="flex w-full justify-center py-6 px-4 gap-4">
            <Button type="submit" variant="green">
              Submit
            </Button>
            <Button type="button" variant="red" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default ModalAccept;
