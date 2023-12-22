import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);

  const updateSessionData = (newData) => {
    console.log('Updating session data with:', newData);
    setSessionData(newData);
    localStorage.setItem('sessionData', JSON.stringify(newData));
  };

  useEffect(() => {
    // Fetch the session data when the component mounts
    const fetchSessionData = async () => {
    const storedSessionData = localStorage.getItem('sessionData'); // Retrieve from localStorage
      if (storedSessionData) {
        setSessionData(JSON.parse(storedSessionData));
      } else {
        try {
          const response = await fetch('http://localhost:3001/api/session/getSession');
          const data = await response.json();
          console.log('Data received:', data);
          setSessionData(data);
          if (data && data.success) {
            localStorage.setItem('sessionData', JSON.stringify(data)); // Save to localStorage
          }
        } catch (error) {
          console.error('Error fetching session data:', error);
        }
      }
    };
  
    fetchSessionData();
  }, []);
  

  const logout = async () => {
    // Clear the session state
    setSessionData(null);
  
    // Clear the session from localStorage
    localStorage.removeItem('sessionData');
  
    // Optionally, send a request to the backend to invalidate the session
    const response2 = await fetch('http://localhost:3001/api/session/logout', { method: 'POST' });
    const data2 = await response2.json();
    console.log('Logging user out:', data2);
  };

  return (
    <SessionContext.Provider value={{ sessionData, updateSessionData, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
