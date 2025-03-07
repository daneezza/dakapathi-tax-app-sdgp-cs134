import { useState } from 'react';
import '../styles/Settings.css';

function Settings() {
    const [settings, setSettings] = useState({
        personalInfo: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            address: '123 Main St, City, Country'
        },
        notifications: {
            email: true,
            push: true,
            sms: false
        },
        privacy: {
            profileVisibility: 'public',
            dataSharing: true
        },
        appearance: {
            theme: 'light',
            fontSize: 'medium'
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

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [name]: checked
            }
        });
    };

    const handlePrivacyChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            privacy: {
                ...settings.privacy,
                [name]: type === 'checkbox' ? checked : value
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the settings to your backend
        alert('Settings saved successfully!');
    };

    return (
        <div className="settings-container">
            <h1>Account Settings</h1>
            <p>Manage your account settings and preferences</p>
            
            <form onSubmit={handleSubmit}>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={settings.personalInfo.email}
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
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={settings.personalInfo.address}
                            onChange={handlePersonalInfoChange}
                        />
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="settings-section">
                    <h2>Notifications</h2>
                    <div className="settings-group checkbox-group">
                        <input
                            type="checkbox"
                            id="email-notifications"
                            name="email"
                            checked={settings.notifications.email}
                            onChange={handleNotificationChange}
                        />
                        <label htmlFor="email-notifications">Email Notifications</label>
                    </div>
                    <div className="settings-group checkbox-group">
                        <input
                            type="checkbox"
                            id="push-notifications"
                            name="push"
                            checked={settings.notifications.push}
                            onChange={handleNotificationChange}
                        />
                        <label htmlFor="push-notifications">Push Notifications</label>
                    </div>
                    <div className="settings-group checkbox-group">
                        <input
                            type="checkbox"
                            id="sms-notifications"
                            name="sms"
                            checked={settings.notifications.sms}
                            onChange={handleNotificationChange}
                        />
                        <label htmlFor="sms-notifications">SMS Notifications</label>
                    </div>
                </div>

                {/* Privacy Section */}
                <div className="settings-section">
                    <h2>Privacy</h2>
                    <div className="settings-group checkbox-group">
                        <input
                            type="checkbox"
                            id="dataSharing"
                            name="dataSharing"
                            checked={settings.privacy.dataSharing}
                            onChange={handlePrivacyChange}
                        />
                        <label htmlFor="dataSharing">Allow Data Sharing for Improved Services</label>
                    </div>
                </div>

                {/* Language Section */}
                <div className="settings-section">
                    <h2>Language</h2>
                    <div className="settings-group">
                        <label htmlFor="language">Preferred Language</label>
                        <select
                            id="language"
                            name="language"
                            value={settings.language || 'en'}
                            onChange={(e) => setSettings({
                                ...settings,
                                language: e.target.value
                            })}
                        >
                            <option value="en">English</option>
                            <option value="es">සිංහල</option>
                            <option value="fr">தமிழ்</option>

                        </select>
                    </div>
                </div>

                {/* Security Section */}
                <div className="settings-section">
                    <h2>Security</h2>
                    <div className="settings-group checkbox-group">
                        <input
                            type="checkbox"
                            id="twoFactorAuth"
                            name="twoFactorAuth"
                            checked={settings.security.twoFactorAuth}
                            onChange={handleSecurityChange}
                        />
                        <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
                    </div>
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
                </div>

                <button type="submit" className="save-btn">Save Settings</button>
            </form>
        </div>
    );
}

export default Settings;
