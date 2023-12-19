const session = require('express-session');
const ONE_DAY = 1000 * 60 * 60 * 24; // Milliseconds in a day

module.exports = (app) => {
  // Create a new session
  const createSession = (req, userData) => {
    req.session.user = userData;
  };

  // Get an existing session
  const getSession = (req) => {
    return req.session.user;
  };

  // Destroy a session
  const destroySession = (req) => {
    req.session.destroy(err => {
      if (err) {
        console.error("Error destroying session:", err);
      }
    });
  };

  // Reset a session
  const resetSession = (req, newUserData) => {
    destroySession(req);
    createSession(req, newUserData);
  };

  return {
    createSession,
    getSession,
    destroySession,
    resetSession
  };
};
