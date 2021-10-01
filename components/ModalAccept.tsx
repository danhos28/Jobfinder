import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';

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

const ModalAccept = ({ handleClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded-md flex flex-col items-center px-6 py-8 sm:p-10 bg-white w-[95vw] sm:w-[60vw] max-w-screen-md h-auto font-poppins"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      ></motion.div>
    </Backdrop>
  );
};

export default ModalAccept;
