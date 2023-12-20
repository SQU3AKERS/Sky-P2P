const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;
const nameRegex = /^[a-zA-Z '-]+$/;
const dateRegex = /^([0-2][0-9]|(3)[0-1])\/(((0)[0-9])|((1)[0-2]))\/\d{4}$/;
const nationalityRegex = /^[a-zA-Z ,.'()Å]+$/;

const validateEmail = (email) => {
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return strongPasswordRegex.test(password);
};

const validateName = (name) => {
  return nameRegex.test(name);
};

const validateDateOfBirth = (date) => {
    if (!dateRegex.test(date)) return false;
    const [day, month, year] = date.split('/').map(Number);
    const dob = new Date(year, month - 1, day);
    return dob && dob < new Date() && dob.getDate() === day;
};

const validateNationality = (nationality) => {
    return nationalityRegex.test(nationality);
};

module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateDateOfBirth,
    validateNationality
};
  
