import React, { useEffect, useState } from 'react';
import '../styles/HeroSection.css';

const API_BASE = 'http://localhost:5000/api'; // Change if needed
const DASHBOARD_BG = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80'; // Cooking/ingredients bg

const cardIcons = [
  '🍲', // Recipes
  '🎉', // Mood Meals
  '👥', // Users
  '💡', // Suggestions
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipeCount, setRecipeCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
      try {
        // Fetch user info
        const userRes = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error('Failed to fetch user info');
        const userData = await userRes.json();
        setUser(userData);

        // Fetch recipe count
        const recipeRes = await fetch(`${API_BASE}/recipes/count`);
        if (!recipeRes.ok) throw new Error('Failed to fetch recipe count');
        const recipeData = await recipeRes.json();
        setRecipeCount(recipeData.count);

        // Fetch user count
        const userCountRes = await fetch(`${API_BASE}/users/count`);
        if (!userCountRes.ok) throw new Error('Failed to fetch user count');
        const userCountData = await userCountRes.json();
        setUserCount(userCountData.count);
      } catch (err) {
        setError(err.message || 'Error loading dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      className="hero-container"
      style={{
        backgroundImage: `linear-gradient(rgba(30,30,40,0.7), rgba(30,30,40,0.7)), url(${DASHBOARD_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        height: 'auto',
        padding: 0,
        overflowY: 'auto',
      }}
    >
      <div className="overlay" style={{ minHeight: '100vh', alignItems: 'flex-start', paddingTop: 48, overflowY: 'auto', width: '100%' }}>
        <div
          className="hero-text"
          style={{
            maxWidth: 1100,
            width: '100%',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.10)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            borderRadius: 24,
            padding: '2.5rem 2.5rem 2.5rem 2.5rem',
            animation: 'fadeIn 1.2s ease-in-out',
            minHeight: 'calc(100vh - 96px)',
            overflow: 'visible',
          }}
        >
          {/* Animated, bold dashboard heading without block */}
          <h1 className="dashboard-animated-title">Dashboard</h1>
          {loading ? (
            <p style={{ color: '#fff' }}>Loading...</p>
          ) : error ? (
            <p style={{ color: '#ffb3b3' }}>{error}</p>
          ) : (
            <>
              {/* User Greeting */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'User')}&background=00c896&color=fff&size=80`}
                  alt="User Avatar"
                  style={{ borderRadius: '50%', width: 80, height: 80, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                />
                <div>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
                    Welcome back, {user.fullName || 'User'}!
                  </h3>
                  <p style={{ color: '#e0e0e0', margin: 0, fontSize: '1.1rem' }}>
                    Here’s what’s happening today:
                  </p>
                </div>
              </div>
              {/* Summary Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 32,
                  marginBottom: 40,
                }}
              >
                <div className="card teal" style={cardStyle}>
                  <span style={iconStyle}>{cardIcons[0]}</span>
                  <h3>Total Recipes</h3>
                  <p style={countStyle}>{recipeCount !== null ? recipeCount : '-'}</p>
                </div>
                <div className="card yellow" style={cardStyle}>
                  <span style={iconStyle}>{cardIcons[1]}</span>
                  <h3>Mood Meals</h3>
                  <p style={countStyle}>52</p>
                </div>
                <div className="card blue" style={cardStyle}>
                  <span style={iconStyle}>{cardIcons[2]}</span>
                  <h3>Users</h3>
                  <p style={countStyle}>{userCount !== null ? userCount : '-'}</p>
                </div>
                <div className="card red" style={cardStyle}>
                  <span style={iconStyle}>{cardIcons[3]}</span>
                  <h3>Suggestions</h3>
                  <p style={countStyle}>89</p>
                </div>
              </div>
              {/* Bottom Section */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 32,
                  paddingBottom: 32,
                }}
              >
                {/* Suggestions of the Day */}
                <div
                  className="suggestions-box"
                  style={{
                    ...boxStyle,
                    background: 'rgba(255,255,255,0.13)',
                  }}
                >
                  <h4 style={sectionTitleStyle}>🤖 AI Suggestion of the Day</h4>
                  <p style={{ color: '#fff', fontSize: '1.1rem' }}>
                    “Swap coconut cream for cashew paste in curries for a nutty vegan twist!”
                  </p>
                </div>
                {/* Activity Feed */}
                <div
                  className="activity-box"
                  style={{
                    ...boxStyle,
                    background: 'rgba(255,255,255,0.13)',
                  }}
                >
                  <h4 style={sectionTitleStyle}>📋 Recent Activity</h4>
                  <ul style={{ color: '#fff', fontSize: '1.05rem', margin: 0, paddingLeft: 18 }}>
                    <li>✅ MoodMeal ‘Post-Gym’ added</li>
                    <li>👤 New user joined: <b>Sam</b></li>
                    <li>📝 AI suggested 3 ingredient swaps</li>
                    <li>📤 Community post uploaded</li>
                  </ul>
                </div>
                {/* Calendar Placeholder */}
                <div
                  className="calendar-box"
                  style={{
                    ...boxStyle,
                    background: 'rgba(255,255,255,0.13)',
                  }}
                >
                  <h4 style={sectionTitleStyle}>📅 Mini Calendar</h4>
                  <div className="calendar-placeholder" style={{ color: '#fff', opacity: 0.7 }}>
                    Coming Soon
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Card and box styles
const cardStyle = {
  background: 'rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
  padding: '2rem 1.5rem 1.5rem 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.2s',
  color: '#222',
  position: 'relative',
  minHeight: 150,
};
const iconStyle = {
  fontSize: '2.2rem',
  marginBottom: 8,
  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.10))',
};
const countStyle = {
  fontSize: '2.1rem',
  fontWeight: 700,
  color: '#00c896',
  margin: 0,
};
const boxStyle = {
  borderRadius: 16,
  boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
  padding: '1.5rem 1.2rem',
  minHeight: 120,
  marginBottom: 0,
};
const sectionTitleStyle = {
  color: '#00c896',
  fontWeight: 700,
  marginBottom: 12,
  fontSize: '1.15rem',
};

export default Dashboard;
