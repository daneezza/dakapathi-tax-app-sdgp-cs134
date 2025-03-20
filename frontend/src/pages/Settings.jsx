import { useState, useRef } from 'react';
import '../styles/Settings.css';

function Settings() {
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [settings, setSettings] = useState({
        personalInfo: {
            name: 'John Doe',
            nic: '123456789012',
            phone: '123-456-7890',
            address: '123 Main St, City, Country',
            dob: '02/03/2000'
        },
        security: {
            twoFactorAuth: false,
            changePassword: ''
        }
    });

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setSettings({
            ...settings,
            personalInfo: {
                ...settings.personalInfo,
                [name]: value
            }
        });
    };

    const handleSecurityChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            security: {
                ...settings.security,
                [name]: type === 'checkbox' ? checked : value
            }
        });
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
        alert('Settings saved successfully!');
    };

    const handleUpdatePassword = () => {
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
                        <div 
                            className="user-avatar" 
                            onClick={handleAvatarClick}
                        >
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <div className="camera-icon">
                                        <img 
                                            src="src/assets/cam.png" 
                                            alt="Camera" 
                                            className="camera-icon-img" 
                                        />
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
                    </div>
                    <div className="settings-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={settings.personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                        />
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
                    </div>
                    <div className="settings-group">
                        <label htmlFor="dob">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={settings.personalInfo.address}
                            onChange={handlePersonalInfoChange}
                        />
                    </div>
                    <div className="settings-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="text"
                            id="dob"
                            name="dob"
                            value={settings.personalInfo.dob}
                            onChange={handlePersonalInfoChange}
                        />
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
                            value={settings.security.oldPassword || ''}
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

                {/* Account Actions Section */}
                <div className="settings-section danger-zone">
                    <h2>Account Actions</h2>
                    <p>Once you delete your account, there is no going back. Please be certain.</p>
                    <button 
                        type="button" 
                        className="close-account-btn" 
                        onClick={handleCloseAccount}
                    >
                        Close Account
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Settings;
