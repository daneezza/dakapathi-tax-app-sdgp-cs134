import { useState, useRef, useEffect } from 'react';
import '../styles/Settings.css';
import { getErrorMessage } from '../utils/validations';

function Settings() {
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});
    
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
            language: 'English' // Default language
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
                    name: parsedUser.fullname || prevSettings.personalInfo.name,
                    nic: parsedUser.nic || prevSettings.personalInfo.nic,
                    address: parsedUser.address || prevSettings.personalInfo.address,
                    dob: parsedUser.birthdate || prevSettings.personalInfo.dob
                }
            }));
        }
    }, []);

    const validateField = (name, value) => {
        const errorMessage = getErrorMessage(name, value);
        
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

    const handlePreferencesChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            preferences: {
                ...prevSettings.preferences,
                [name]: value
            }
        }));
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields before saving
        let newErrors = {};
        Object.keys(settings.personalInfo).forEach((field) => {
            const error = getErrorMessage(field, settings.personalInfo[field]);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert("Please fix the errors before saving.");
            return;
        }

        const storedUserData = localStorage.getItem('user');
        let existingUserData = storedUserData ? JSON.parse(storedUserData) : {};

        // Merge existing data with updated personalInfo
        const updatedUserData = {
            ...existingUserData,
            fullname: settings.personalInfo.name,
            nic: settings.personalInfo.nic,
            address: settings.personalInfo.address,
            birthdate: settings.personalInfo.dob
        };

        localStorage.setItem('user', JSON.stringify(updatedUserData));
        alert('Settings saved successfully!');
    };

    const handleUpdatePassword = () => {
        if (!settings.security.oldPassword || !settings.security.changePassword) {
            alert("Please fill in both password fields.");
            return;
        }

        alert('Password updated successfully!');
    };

    const handleCloseAccount = () => {
        if (window.confirm("Are you sure you want to close your account? This action cannot be undone.")) {
            alert('Your account has been successfully deleted.');
        }
    };

    return (
        <div className="settings-container">
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
                                        <img src="src/assets/cam.png" alt="Camera" className="camera-icon-img" />
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
                    </div>
                    <button type="button" className="update-password-btn" onClick={handleUpdatePassword}>
                        Update Password
                    </button>
                </div>

                {/* Language Preferences Section */}
                <div className="settings-section">
                    <h2>Language Preferences</h2>
                    <div className="settings-group">
                        <select
                            id="language"
                            name="language"
                            value={settings.preferences.language}
                            onChange={handlePreferencesChange}
                        >
                            <option value="English">English</option>
                            <option value="Tamil">தமிழ் (Tamil)</option>
                            <option value="Sinhala">සිංහල (Sinhala)</option>
                        </select>
                    </div>
                </div>

                {/* Account Actions Section */}
                <div className="settings-section danger-zone">
                    <h2>Account Actions</h2>
                    <p>Once you delete your account, there is no going back. Please be certain.</p>
                    <button type="button" className="close-account-btn" onClick={handleCloseAccount}>
                        Close Account
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Settings;
