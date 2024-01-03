import React, { useState } from 'react';

const Support = () => {
  // State for input fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  // State for validation messages
  const [validation, setValidation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  // Regex patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(\+60|0)\d{2}-?\d{7,8}$/; // Accepts +6012-3456789, +60123456789, 012-3456789, or 0123456789

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate inputs
  const validateInputs = () => {
    let isValid = true;
    let errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required.';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required.';
      isValid = false;
    }
    if (!emailPattern.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!phonePattern.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid Malaysian phone number.';
      isValid = false;
    }
    if (!formData.message.trim()) {
      errors.message = 'Please enter your message.';
      isValid = false;
    }

    setValidation(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      alert('Your inquiry has been received.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    }
  };

  return (
    <div className="support-page-form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="support-page-title">Inquiry Form</h2>
        <p className="support-page-description">We will get in touch with you shortly</p>
        
        <label htmlFor="firstName" className="support-page-label">Your Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="support-page-input"
        />
        <span className="support-page-validation">{validation.firstName}</span>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="support-page-input"
        />
        <span className="support-page-validation">{validation.lastName}</span>
        
        <label htmlFor="email" className="support-page-label">Your E-mail Address</label>
        <input
          type="email"
          name="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
          className="support-page-input"
        />
        <span className="support-page-validation">{validation.email}</span>
        
        <label htmlFor="phoneNumber" className="support-page-label">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="+6012-3456789"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="support-page-input"
        />
        <span className="support-page-validation">{validation.phoneNumber}</span>
        
        <label htmlFor="message" className="support-page-label">Leave Your Message</label>
        <textarea
          name="message"
          placeholder="Your message here"
          value={formData.message}
          onChange={handleChange}
          className="support-page-textarea"
        />
        <span className="support-page-validation">{validation.message}</span>
        
        <button type="submit" className="support-page-button">Submit</button>
      </form>
    </div>
  );
};

export default Support;