// utils/sessionManager.js

const { v4: uuidv4 } = require('uuid');
let sessionStore = {};

const createSession = (userId, userType) => {
  const sessionId = uuidv4(); // Generate a unique session ID
  sessionStore[sessionId] = { userId, userType, createdAt: new Date() };
  return sessionId;
};

const getSession = (sessionId) => {
  return sessionStore[sessionId];
};

const deleteSession = (sessionId) => {
  delete sessionStore[sessionId];
};

const resetSessions = () => {
  sessionStore = {};
};

module.exports = {
  createSession,
  getSession,
  deleteSession,
  resetSessions
};
