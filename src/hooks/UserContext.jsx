import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const stored = localStorage.getItem('devgamers:userData');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const putUserData = (data) => {                                   /////putUserData: atualiza o estado e salva os dados no localStorage
    setUserInfo(data);
    localStorage.setItem('devgamers:userData', JSON.stringify(data));
  };

  const logout = () => {
    setUserInfo({});
    localStorage.removeItem('devgamers:userData');
  };

  return (
    <UserContext.Provider value={{ userInfo, putUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

