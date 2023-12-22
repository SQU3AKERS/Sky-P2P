const createSession = (req, userData) => {
  req.session.user = userData;
  console.log('Creating session for user:', userData);
  req.session.lastLoginTime = new Date();
  return userData;
};

const getSession = (req) => {
  console.log('Retrieving session data:', req.session.user);
  return req.session.user;
};

const destroySession = (req) => {
  console.log('Destroying session:', req.sessionID);
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
    }
  });
};

const resetSession = (req, newUserData) => {
  destroySession(req);
  createSession(req, newUserData);
};

// Middleware to reset the session after 1 day
const resetAfterOneDay = (req, res, next) => {
  const now = new Date();
  if (req.session.lastLoginTime && (now - req.session.lastLoginTime) > (24 * 60 * 60 * 1000)) {
    resetSession(req, req.session.user);
  }
  next();
};

module.exports = {
  createSession,
  getSession,
  destroySession,
  resetSession,
  resetAfterOneDay
};
