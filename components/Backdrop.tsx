// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const Backdrop = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <motion.div
    className="absolute top-[20px] left-0 h-full w-full bg-[#1d1d1d6b] flex items-center justify-center"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

export default Backdrop;
