import { useState } from 'react';
import AuthContext from './auth-context';

export const AuthProvider = ({ children }) => {
  const [token, setToken]   = useState(localStorage.getItem('token'));
  const [user,  setUser]    = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const login = (t, u) => {
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
    setToken(t); setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null); setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
