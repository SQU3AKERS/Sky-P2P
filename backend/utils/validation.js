const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/; // 8 to 32 characters

const validateEmail = (email) => {
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return strongPasswordRegex.test(password);
};

module.exports = {
  validateEmail,
  validatePassword
};
