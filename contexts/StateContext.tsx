/* eslint-disable no-unused-vars */
import { createContext } from 'react';

type ContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  userId: string;
  setUserId: (employer: string) => void;
};

const StateContext = createContext<ContextType | null>(null);

export default StateContext;
