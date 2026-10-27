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

  const putUserData = (data) => {
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

/*
import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const putUserData = (userInfo) => {
    setUserInfo(userInfo);

    localStorage.setItem('devgamers:userData', JSON.stringify(userInfo)); ///O localStorage é um recurso da Web Storage API do HTML5 que permite salvar dados diretamente no navegador do usuário.
  };

  const logout = () => {
    setUserInfo({});
    localStorage.removeItem('devgamers:userData');
  };

  useEffect(() => {
    const userInfoLocalStorage = localStorage.getItem('devgamers:userData');

    if (userInfoLocalStorage) {

     setUserInfo(JSON.parse(userInfoLocalStorage));
    
   }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, putUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
}; ////sempre que alterar ou integrar sistemas/dados , precisa incrementar em value no return
*/