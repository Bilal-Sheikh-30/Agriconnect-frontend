// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in (from session storage)
//     const savedUser = sessionStorage.getItem('agriconnect_user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     sessionStorage.setItem('agriconnect_user', JSON.stringify(userData));
//   };

//   const signup = (userData) => {
//     setUser(userData);
//     sessionStorage.setItem('agriconnect_user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     sessionStorage.removeItem('agriconnect_user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };





import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // store JWT
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('agriconnect_user');
    const savedToken = sessionStorage.getItem('agriconnect_token');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
    setIsLoading(false);
  }, []);

  const login = (userData, jwtToken) => {
    // console.log("Token", jwtToken);
    setUser(userData);
    setToken(jwtToken);
    sessionStorage.setItem('agriconnect_user', JSON.stringify(userData));
    sessionStorage.setItem('agriconnect_token', jwtToken);
  };

  const signup = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    sessionStorage.setItem('agriconnect_user', JSON.stringify(userData));
    sessionStorage.setItem('agriconnect_token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('agriconnect_user');
    sessionStorage.removeItem('agriconnect_token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
