// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const Backdrop = ({
  children,
  onClick,
  elHeight,
}: {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  elHeight: number | null | undefined;
}) => {
  const bdropHeight = `${elHeight}px`;

  return (
    <motion.div
      className="absolute left-0 w-full bg-[#1d1d1d6b] block pt-20"
      style={{ height: bdropHeight }}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
