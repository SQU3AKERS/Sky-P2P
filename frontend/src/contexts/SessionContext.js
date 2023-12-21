import React, { createContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Fetch the session data when the component mounts
    const fetchSessionData = async () => {
      try {
        const response = await fetch('/api/session');
        const data = await response.json();
        setSessionData(data);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
