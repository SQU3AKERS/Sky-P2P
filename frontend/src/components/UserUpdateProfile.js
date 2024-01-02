import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';

// Regular expressions for validation
// Same as backend
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,32}$/;

function UserUpdateProfile() {
    // Use context to access user session data
    const session = useContext(SessionContext);
    const sessionUserId = session.sessionData.userId;

    // State for user profile data
    const [userProfile, setUserProfile] = useState({});

    // State to toggle edit mode for form inputs
    const [editMode, setEditMode] = useState(false);

    // State to store any validation errors
    const [errors, setErrors] = useState({});

    // Validates the input fields against the regex patterns and updates errors state
    const validateInput = (name, value) => {
        let errorMessage = '';
        if (name === 'email' && !emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.';
        }
    
        // Use functional update to ensure we have the latest state
        setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
        return errorMessage === '';
    };    
    
    // Fetches the user profile data when the component mounts or the userId changes
    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch(`http://localhost:3001/api/profile/fetchUserProfile/${sessionUserId}`);
            const data = await response.json();
            setUserProfile(data); // Assuming the data is the user profile object
        };
        fetchUserProfile();
    }, [sessionUserId]);

    // Handles the logic for changing the user's password
    const changePasswordHandler = async () => {
        // Get current password from the user
        const currentPassword = prompt('Please enter your current password:');
        if (!currentPassword) {
            alert('Password change cancelled.');
            return; // User cancelled the prompt
        }
    
        // Get new password from the user
        const newPassword = prompt('Please enter your new password:');
        if (!newPassword) {
            alert('Password change cancelled.');
            return; // User cancelled the prompt
        }
    
        // Validate the new password
        if (!strongPasswordRegex.test(newPassword)) {
            alert('Your new password does not meet the requirements. It must be 8-32 characters long, include uppercase and lowercase letters, a number, and a special character.');
            return; // New password is not strong enough
        }
    
        // Get password confirmation from the user
        const confirmPassword = prompt('Please confirm your new password:');
        if (confirmPassword !== newPassword) {
            alert('Passwords do not match. Please try again.');
            return; // Passwords do not match
        }
    
        // Call the API to update the password
        try {
            const response = await fetch('http://localhost:3001/api/profile/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session.sessionData.userId,
                    currentPassword: currentPassword,
                    newPassword: newPassword
                }),
            });
    
            if (!response.ok) {
                throw new Error('Password update failed');
            }
    
            const result = await response.json();
            if (result.success) {
                alert('Password successfully changed.');
            } else {
                alert(result.message || 'Failed to change password.');
            }
        } catch (error) {
            console.error('Error during password change:', error);
            alert('An error occurred while changing the password. Please try again later.');
        }
    };

    // Toggles the edit mode which enables or disables the form inputs
    const handleEditChange = (e) => {
        setEditMode(e.target.checked);
    };

    // Handles input changes, validates the input, and updates the userProfile state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Always update the state with the new value
        setUserProfile(prevProfile => ({ ...prevProfile, [name]: value }));
    
        // Validate the input and update error messages if necessary
        validateInput(name, value);
    };   

    // Submits the updated profile data to the server after validation
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Initialize an object to collect any new errors
        let newErrors = {};
    
        // Validate email field
        const emailValid = validateInput('email', userProfile.email);
        if (!emailValid) newErrors.email = 'Please enter a valid email address.';

        // Check if there are any new errors
        if (Object.keys(newErrors).length > 0) {
            // There are new errors. Update the state and abort the submit.
            setErrors(newErrors);
            return;
        }
    
        // No new errors were found. Proceed with the form submission.
        try {
            const response = await fetch('http://localhost:3001/api/profile/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: sessionUserId, // Include the user ID from the session
                    email: userProfile.email,
                }),
            });
    
            // Check if the response was successful
            if (response.ok) {
                const result = await response.json();
                // The update was successful. You can now refresh or provide a success message.
                console.log('Profile successfully updated:', result);
                // Optionally, refresh the page or redirect the user.
            } else {
                // The server responded with an error. Retrieve and display the error message.
                const errorResult = await response.json();
                alert(`Failed to update profile: ${errorResult.message}`);
            }
        } catch (error) {
            // An error occurred during the fetch request.
            console.error('Error during profile update:', error);
            alert('Error during profile update. Please try again later.');
        }
    };

    return (
        <div className="profile-settings-form">
            <form onSubmit={handleSubmit}>
                {/* Display Only Fields */}
                <div className="display-only-fields">
                    <div className="form-group">
                        <label>First Name:</label>
                        <span>{userProfile.FirstName || 'N/A'}</span>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <span>{userProfile.LastName || 'N/A'}</span>
                    </div>

                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <span>{userProfile.DateOfBirth || 'N/A'}</span>
                    </div>

                    <div className="form-group">
                        <label>Nationality:</label>
                        <span>{userProfile.Nationality || 'N/A'}</span>
                    </div>

                    <div className="form-group">
                        <label>User Type:</label>
                        <span>{userProfile.UserType || 'N/A'}</span>
                    </div>
                </div>

                {/* Horizontal Line Separator */}
                <hr />

                {/* Editable Email Field */}
                <div className="form-group edit-mode-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={editMode}
                            onChange={handleEditChange}
                        />
                        Edit Email
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userProfile.email || ''}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                
                {/* Submit Button */}
                <div className="form-group submit-button">
                    <button type="submit" disabled={!editMode}>
                        Update Email
                    </button>
                </div>

                {/* Change Password Button */}
                <div className="form-group change-password-button">
                    <button type="button" onClick={changePasswordHandler}>
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserUpdateProfile;
