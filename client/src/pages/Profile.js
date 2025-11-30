import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Profile.css';

function Profile({ setAuth }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Profile: Checking localStorage...');
    const userData = localStorage.getItem('user');
    console.log('Profile: userData from localStorage:', userData);
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Profile: Parsed user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Profile: Error parsing user data:', error);
      }
    } else {
      console.log('Profile: No user data found, trying to decode token...');
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const decodedUser = {
            id: payload.id,
            username: payload.username,
            email: payload.email
          };
          console.log('Profile: Decoded user from token:', decodedUser);
          setUser(decodedUser);
          localStorage.setItem('user', JSON.stringify(decodedUser));
        } catch (error) {
          console.error('Profile: Error decoding token:', error);
        }
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'white',
        fontSize: '1.5rem',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <p>No user data found</p>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{
            padding: '12px 24px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar setAuth={setAuth} />
      
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.profile_picture ? (
                <img src={user.profile_picture} alt={user.username} />
              ) : (
                <div className="avatar-placeholder">
                  {user.username ? user.username.charAt(0).toUpperCase() : '?'}
                </div>
              )}
            </div>
            <h1>{user.username || 'Unknown User'}</h1>
            <p>{user.email || 'No email'}</p>
          </div>

          <div className="profile-info">
            <h2>Account Information</h2>
            
            <div className="info-row">
              <span className="info-label">Username:</span>
              <span className="info-value">{user.username || 'N/A'}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email || 'N/A'}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Account Type:</span>
              <span className="info-value">
                {user.google_id ? 'Google Account' : 'Local Account'}
              </span>
            </div>
          </div>

          <div className="profile-stats">
            <h2>⚾ Baseball Stats</h2>
            <p>Your task completion and activity stats will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
