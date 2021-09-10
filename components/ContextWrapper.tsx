// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import StateContext from '../contexts/StateContext';

interface IContextProps {
  children: React.ReactNode;
  loginStatus: boolean;
}

const ContextWrapper = ({ children, loginStatus }: IContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(loginStatus);

  return (
    <StateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </StateContext.Provider>
  );
};

export default ContextWrapper;
