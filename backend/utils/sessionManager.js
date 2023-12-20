const createSession = (req, userData) => {
  req.session.user = userData;
  req.session.lastLoginTime = new Date();
};

const getSession = (req) => {
  return req.session.user;
};

const destroySession = (req) => {
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
