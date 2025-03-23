import { useState, useRef, useEffect } from 'react';
import '../styles/Settings.css';
import { getErrorMessage,isValidAddress ,isValidPassword} from '../utils/validations';
import axios from 'axios';
import Notification from '../components/auth/Notification.jsx';


function Settings() {
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [hasPassword, setHasPassword] = useState(null); // Check if user has a password
    const [notification, setNotification] = useState({ message: '', variant: 'info' });

    const [settings, setSettings] = useState({
        personalInfo: {
            name: '',
            nic: '',
            address: '',
            dob: ''
        },
        security: {
            oldPassword: '',
            changePassword: ''
        },
        preferences: {
            language: localStorage.getItem('language') || 'English'
        }
    });

    // Load user data from localStorage
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setSettings((prevSettings) => ({
                ...prevSettings,
                personalInfo: {
                    name: parsedUser.fullname === "N/A" ? "" : parsedUser.fullname || prevSettings.personalInfo.name,
                    nic: parsedUser.nic === "N/A" ? "" : parsedUser.nic || prevSettings.personalInfo.nic,
                    address: parsedUser.address === "N/A" ? "" : parsedUser.address || prevSettings.personalInfo.address,
                    dob: parsedUser.birthdate === "N/A" ? "" : parsedUser.birthdate || prevSettings.personalInfo.dob
                }
            }));

            checkPasswordStatus(parsedUser.email);
        }

        // Dynamically load Google Translate script
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);

        script.onload = () => {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'ta,si', // Add supported languages
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                    },
                    'google_translate_element'
                );
            };
        };


        fetchProfileImage();

    }, []);

    const checkPasswordStatus = async (email) => {
        try {
            const response = await axios.get(
                `https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/auth/check-password-status?email=${email}`
            );
            setHasPassword(response.data.hasPassword);
        } catch (error) {
            console.error("Error checking password status:", error);
        }
    };

    const validateField = (name, value) => {
        let errorMessage = getErrorMessage(name, value);
        if (name === "dob") {
            const today = new Date();
            const enteredDate = new Date(value);
            const minDate = new Date();
            minDate.setFullYear(today.getFullYear() - 18); // Minimum age 13

            if (enteredDate > today) {
                errorMessage = "Date of birth cannot be in the future.";
            } else if (enteredDate > minDate) {
                errorMessage = "You must be at least 18 years old.";
            }
        }

        if (name === "address" && !isValidAddress(value)) {
            errorMessage = "Please enter a valid address (5-100 characters, no special symbols).";
        }

        // Validate new password
    if (name === "changePassword" && !isValidPassword(value)) {
        errorMessage = "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
        
    }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
        }));
    };

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setSettings((prevSettings) => ({
            ...prevSettings,
            personalInfo: {
                ...prevSettings.personalInfo,
                [name]: value
            }
        }));
    };

    const handleSecurityChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setSettings((prevSettings) => ({
            ...prevSettings,
            security: {
                ...prevSettings.security,
                [name]: value
            }
        }));
    };
//---------------------------Pfp stuff------------------------------------------------------------------
const handleProfileImageChange = async (e) => {
    const file = e.target.files ? e.target.files[0] : null; 
    if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const base64String = e.target.result;

            const img = new Image();
            img.onload = () => {
                // craete a canvas element to resize the image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const maxWidth = 450;  
                const maxHeight = 450; 

                // calculate the aspect ratio
                const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                const width = img.width * ratio;
                const height = img.height * ratio;

                // set canvas size
                canvas.width = width;
                canvas.height = height;

                // draw the resized image on the canvas
                ctx.drawImage(img, 0, 0, width, height);

                // convert canvas to base64 (low quality image)
                const lowQualityBase64 = canvas.toDataURL('image/jpeg', 0.5); 

                console.log('Base64 low quality image string:', lowQualityBase64);

               
                saveProfileImage(lowQualityBase64);  
                setProfileImage(lowQualityBase64);  
            };

            img.src = base64String;
        };


        reader.readAsDataURL(file);
    } else {
        console.error('No file selected.');
    }
};



const saveProfileImage = async (base64Image) => {
    try {

        const storedUserData = localStorage.getItem('user');
        let existingUserData = storedUserData ? JSON.parse(storedUserData) : null;
        
        if (!existingUserData || !existingUserData.email) {
            console.error("User email not found.");
            return;
        }

        const email = existingUserData.email; 

       
        const updatedUserData = {
            email: email,  
            profilePic: base64Image, 
        };

        console.log('Saving profile image for:', email); 

       
        const response = await axios.post(
            'https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/auth/updateProfileImage',
            updatedUserData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
            console.log('Profile image saved successfully');
        } else {
            console.error('Error saving profile image:', response.data);
        }
    } catch (error) {
        console.error('Error saving profile image:', error);
    }
};
//----------------------Fetch the pfp-------------------------------------------

const fetchProfileImage = async () => {
    try {
       
        const storedUserData = localStorage.getItem('user');
        let existingUserData = storedUserData ? JSON.parse(storedUserData) : null;

        if (!existingUserData || !existingUserData.email) {
            console.error("User email not found.");
            return;
        }

        const email = existingUserData.email; 

        console.log('Fetching profile image for:', email); 

        const response = await axios.get(`https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/auth/getProfileImage?email=${email}`);

        if (response.status === 200 && response.data.profileImage) {
            console.log('Profile image fetched successfully');
            setProfileImage(response.data.profileImage); 
        } else {
            console.error('Error fetching profile image:', response.data);
        }
    } catch (error) {
        console.error('Error fetching profile image:', error);
    }
};


//-----------------------------------------------------------------------------------------


    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Validate all personal info fields
    Object.keys(settings.personalInfo).forEach((field) => {
        validateField(field, settings.personalInfo[field]);
        if (!settings.personalInfo[field]) {
            newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        }
    });

    // If there are any errors, prevent submission
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    const storedUserData = localStorage.getItem('user');
    let existingUserData = storedUserData ? JSON.parse(storedUserData) : {};

    const updatedUserData = {
        email: existingUserData.email,
        fullname: settings.personalInfo.name,
        nic: settings.personalInfo.nic,
        address: settings.personalInfo.address,
        birthdate: settings.personalInfo.dob
    };

    try {
        const response = await axios.post(
            'https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/auth/updateUser',
            updatedUserData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        localStorage.setItem('user', JSON.stringify(updatedUserData));
        setNotification({ message: 'User details updated successfully!', variant: 'success' });
        console.log('User details updated successfully!');
    } catch (error) {
        console.error('Error updating user:', error);
        setNotification({ 
            message: error.response?.data?.message || 'Failed to update user details.', 
            variant: 'error' 
        });
    }
};


const handleUpdatePassword = async () => {
        const { oldPassword, changePassword } = settings.security;
        const storedUserData = localStorage.getItem('user');
        let existingUserData = storedUserData ? JSON.parse(storedUserData) : {};

        if (!changePassword) {
            setNotification({ message: "New password is required.", variant: 'error' });
            return;
        }

        if (!isValidPassword(changePassword)) {
            setNotification({ message:"New password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.", variant: 'error' });
            return;
        }

        try {
            const payload = hasPassword
                ? { email: existingUserData.email, currentPassword: oldPassword, newPassword: changePassword }
                : { email: existingUserData.email, newPassword: changePassword };

            const response = await axios.post(
                'https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/auth/update-password',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('Password updated successfully:', response.data);
            setNotification({ message: response.data.message || "Password updated successfully!", variant: 'success' });

            setSettings((prevSettings) => ({
                ...prevSettings,
                security: {
                    oldPassword: '',
                    changePassword: ''
                }
            }));
        } catch (error) {
            console.error('Error updating password:', error);
            setNotification({ 
                message: error.response?.data?.message || "Failed to update password.", 
                variant: 'error' 
            });
        }
    };


const handleDeleteAccount = async () => {
    try {
        setShowConfirmPopup(false);
        const storedUserData = localStorage.getItem('user');
        
        if (!storedUserData) {
            setNotification({ message: "No user data found.", variant: 'error' });
            return;
        }

        const userData = JSON.parse(storedUserData);
        const userEmail = userData.email;

        const response = await axios.delete('https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/auth/delete-account', {
            data: { email: userEmail },
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {

            localStorage.removeItem('user');
            console.log('Account deleted successfully');
            setNotification({ message: 'Your account has been successfully deleted.', variant: 'success' });
                
            setTimeout(() => {
                window.location.href = '/'; // redirect to login page
            }, 2000);
        } else {
            throw new Error("Failed to delete account.");
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        setNotification({ 
            message: error.response?.data?.message || 'Failed to delete account.', 
            variant: 'error' 
        });
    }
};


    return (
        <div className="settings-container">
            {notification.message && (
                <Notification
                    message={notification.message}
                    variant={notification.variant}
                    className="settings-container"
                    onClose={() => setNotification({ message: '', variant: 'info' })}
                    duration={5000}
                />
            )}
            <h1>Account Settings</h1>
            <p>Manage your account settings and preferences</p>
            
            <form onSubmit={handleSubmit}>
               {/* Profile Picture Section */}
                <div className="settingsPic-section">
                    <div className="profile-picture-container">
                        <div className="user-avatar" onClick={handleAvatarClick}>
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <div className="camera-icon">
                                        <img src="/assets/cam.png" alt="Camera" className="camera-icon-img" />
                                    </div>
                                    <span>Choose photo</span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}  
                            accept="image/*"
                            onChange={handleProfileImageChange} 
                        />
                    </div>
                </div>
                

                {/* Personal Information Section */}
                <div className="settings-section">
                    <h2>Personal Information</h2>
                    <div className="settings-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={settings.personalInfo.name}
                            onChange={handlePersonalInfoChange}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div className="settings-group">
                        <label htmlFor="nic">NIC Number</label>
                        <input
                            type="text"
                            id="nic"
                            name="nic"
                            value={settings.personalInfo.nic}
                            onChange={handlePersonalInfoChange}
                        />
                        {errors.nic && <p className="error-message">{errors.nic}</p>}
                    </div>

                    <div className="settings-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={settings.personalInfo.address}
                            onChange={handlePersonalInfoChange}
                        />
                        {errors.address && <p className="error-message">{errors.address}</p>}
                    </div>

                    <div className="settings-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={settings.personalInfo.dob ? new Date(settings.personalInfo.dob).toISOString().split('T')[0] : ''}
                            onChange={handlePersonalInfoChange}
                        />
                        {errors.dob && <p className="error-message">{errors.dob}</p>}
                    </div>

                    <button type="submit" className="save-btn">Save Settings</button>
                </div>

                {/* Security Section */}
                <div className="settings-section">
                    <h2>Security</h2>
                    
                    {hasPassword === null ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {hasPassword && (
                                <div className="settings-group">
                                    <label htmlFor="oldPassword">Current Password</label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={settings.security.oldPassword}
                                        onChange={handleSecurityChange}
                                        placeholder="Enter current password"
                                    />
                                </div>
                            )}
                            
                            <div className="settings-group">
                                <label htmlFor="changePassword">New Password</label>
                                <input
                                    type="password"
                                    id="changePassword"
                                    name="changePassword"
                                    value={settings.security.changePassword}
                                    onChange={handleSecurityChange}
                                    placeholder="Enter new password"
                                />
                                {errors.changePassword && <p className="error-message">{errors.changePassword}</p>}
                            </div>
                            
                            <button type="button" className="update-password-btn" onClick={handleUpdatePassword}>
                                Update Password
                            </button>
                        </>
                    )}
                </div>
                {/* Language Preferences Section */}
                <div className="settings-section">
                    <h2>Language Preferences</h2>
                    <div id="google_translate_element"></div>
                    <div className="language-info-message">
                        <p>To switch back to the default language, simply click the close icon in the top right Google Translate bar.</p>
                    </div>
                </div>

                {/* Account Actions Section */}
                <div className="settings-section danger-zone">
                    <h2>Account Actions</h2>
                    <p>Your account will be permanently deleted. We appreciate your time with us.</p>
                    <button type="button" className="close-account-btn" onClick={() => setShowConfirmPopup(true)}>
                        Close Account
                    </button>
                </div>
                {showConfirmPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>Confirm Account Deletion</h2>
                            <p>Leaving already? We'll miss you! Come back anytime.</p>
                            <div className="popup-buttons">
                                <button className="confirm-btn" onClick={() => { handleDeleteAccount(); setShowConfirmPopup(false); }}>Delete Account</button>
                                <button className="cancel-btn" onClick={() => setShowConfirmPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
            
        </div>
    );
}

export default Settings;
