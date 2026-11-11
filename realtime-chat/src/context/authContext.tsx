import { createContext, type Dispatch, type SetStateAction } from 'react';

type AuthContextType = {
  isAuthentication: boolean;
  setIsAuthentication: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;