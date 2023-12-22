import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);

  const updateSessionData = (newData) => {
    console.log('Updating session data with:', newData);
    setSessionData(newData);
  };

  useEffect(() => {
    // Fetch the session data when the component mounts
    const fetchSessionData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/session/getSession');
        const data = await response.json();
        console.log('Data received:', data);
        setSessionData(data);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
    
  }, []);

  return (
    <SessionContext.Provider value={{ sessionData, updateSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
