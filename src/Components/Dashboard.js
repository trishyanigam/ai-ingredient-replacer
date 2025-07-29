import React, { useEffect, useState } from 'react';
import '../styles/HeroSection.css';
import { getDashboardMetrics } from '../api';

const API_BASE = 'http://localhost:5000/api'; // Change if needed
const DASHBOARD_BG = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80'; // Cooking/ingredients bg

const cardIcons = [
  '🍲', // Recipes
  '🎉', // Mood Meals
  '👥', // Users
  '💡', // Suggestions
];

const DIETARY_OPTIONS = [
  { key: 'vegan', label: 'Vegan' },
  { key: 'nutFree', label: 'Nut-Free' },
  { key: 'glutenFree', label: 'Gluten-Free' },
  { key: 'dairyFree', label: 'Dairy-Free' },
  { key: 'eggFree', label: 'Egg-Free' },
  { key: 'sugarFree', label: 'Sugar-Free' },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipeCount, setRecipeCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [preferences, setPreferences] = useState(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem('dietaryPreferences');
    return stored ? JSON.parse(stored) : {
      vegan: false,
      nutFree: false,
      glutenFree: false,
      dairyFree: false,
      eggFree: false,
      sugarFree: false,
    };
  });
  const [prefSaved, setPrefSaved] = useState(false);
  // Fetch recent activity from localStorage
  const [recentSaved, setRecentSaved] = useState([]);
  const [recentReplaced, setRecentReplaced] = useState([]);
  const [myRecipes, setMyRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem('myRecipes')) || [];
  });
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editRecipeIdx, setEditRecipeIdx] = useState(null);
  const [recipeForm, setRecipeForm] = useState({ title: '', ingredients: '', instructions: '' });
  const [metrics, setMetrics] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [metricsError, setMetricsError] = useState('');

  // Save myRecipes to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
  }, [myRecipes]);

  const handleRecipeFormSubmit = (e) => {
    e.preventDefault();
    if (!recipeForm.title.trim()) return;
    if (editRecipeIdx !== null) {
      // Edit existing
      const updated = [...myRecipes];
      updated[editRecipeIdx] = { ...recipeForm };
      setMyRecipes(updated);
    } else {
      // Add new
      setMyRecipes([{ ...recipeForm }, ...myRecipes]);
    }
    setShowRecipeForm(false);
    setEditRecipeIdx(null);
    setRecipeForm({ title: '', ingredients: '', instructions: '' });
  };

  const handleEditRecipe = (idx) => {
    setEditRecipeIdx(idx);
    setRecipeForm(myRecipes[idx]);
    setShowRecipeForm(true);
  };

  const handleDeleteRecipe = (idx) => {
    if (window.confirm('Delete this recipe?')) {
      setMyRecipes(myRecipes.filter((_, i) => i !== idx));
    }
  };

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

        // Fetch recent saved recipes
        const saved = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        setRecentSaved(saved.slice(-3).reverse());
        // Fetch recent replaced recipes
        const replaced = JSON.parse(localStorage.getItem('replacerHistory')) || [];
        setRecentReplaced(replaced.slice(-3).reverse());
      } catch (err) {
        setError(err.message || 'Error loading dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setMetricsLoading(true);
    getDashboardMetrics()
      .then(data => {
        setMetrics(data);
        setMetricsLoading(false);
      })
      .catch(err => {
        setMetricsError('Failed to load dashboard metrics');
        setMetricsLoading(false);
      });
  }, []);

  return (
    <section
      className="hero-container"
      style={{
        backgroundImage: `linear-gradient(rgba(20,24,28,0.95), rgba(20,24,28,0.98)), url(${DASHBOARD_BG})`,
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
            background: 'rgba(24,28,34,0.92)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            borderRadius: 24,
            padding: '2.5rem 2.5rem 2.5rem 2.5rem',
            animation: 'fadeIn 1.2s ease-in-out',
            minHeight: 'calc(100vh - 96px)',
            overflow: 'visible',
            color: '#f3f6fa',
          }}
        >
          {/* Animated, bold dashboard heading without block */}
          <h1 className="dashboard-animated-title" style={{ fontSize: '2.7rem', color: '#00e6a2', marginBottom: 24, letterSpacing: 1 }}>Welcome to Your Dashboard</h1>
          <hr style={{ border: 'none', borderTop: '2px solid #222', margin: '0 0 32px 0', opacity: 0.18 }} />
          {loading || metricsLoading ? (
            <p style={{ color: '#fff' }}>Loading...</p>
          ) : error || metricsError ? (
            <p style={{ color: '#ffb3b3' }}>{error || metricsError}</p>
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
                  <h3 style={{ color: '#00e6a2', margin: 0, fontSize: '1.7rem', fontWeight: 700 }}>
                    Hello, {user.fullName || 'User'}!
                  </h3>
                  <p style={{ color: '#b0b8c1', margin: 0, fontSize: '1.1rem' }}>
                    Here’s your personalized dashboard.
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 36 }}>
                {/* Dietary Preferences Section */}
                <div style={{
                  background: 'linear-gradient(120deg, #232b33 0%, #1a232a 100%)',
                  borderRadius: 14,
                  padding: '1.2rem 1.5rem',
                  color: '#e0f7f1',
                  boxShadow: '0 2px 8px rgba(0,200,150,0.07)',
                  fontSize: '1.08rem',
                  fontWeight: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  maxWidth: 500,
                  border: '1px solid #222',
                }}>
                  <span role="img" aria-label="preferences" style={{ fontSize: '1.7rem', marginBottom: 6 }}>🥗</span>
                  <span style={{ fontWeight: 600, color: '#00e6a2', marginBottom: 6 }}>Your Dietary Preferences</span>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      localStorage.setItem('dietaryPreferences', JSON.stringify(preferences));
                      setPrefSaved(true);
                      setTimeout(() => setPrefSaved(false), 2000);
                    }}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}
                  >
                    {DIETARY_OPTIONS.map(opt => (
                      <label key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 120 }}>
                        <input
                          type="checkbox"
                          checked={preferences[opt.key]}
                          onChange={e => setPreferences(p => ({ ...p, [opt.key]: e.target.checked }))}
                        />
                        {opt.label}
                      </label>
                    ))}
                    <button type="submit" className="btn green" style={{ marginLeft: 12, padding: '6px 18px', fontSize: '1em' }}>Save</button>
                    {prefSaved && <span style={{ color: '#00e6a2', marginLeft: 10 }}>Preferences saved!</span>}
                  </form>
                  <span style={{ fontSize: '0.98em', color: '#b0b8c1', marginTop: 4 }}>
                    (These will be used to filter recipes and suggestions in the future.)
                  </span>
                </div>
                {/* My Recipes Section */}
                <div style={{
                  background: 'linear-gradient(120deg, #232b33 0%, #1a232a 100%)',
                  borderRadius: 14,
                  padding: '1.2rem 1.5rem',
                  color: '#e0f7f1',
                  boxShadow: '0 2px 8px rgba(0,200,150,0.07)',
                  fontSize: '1.08rem',
                  fontWeight: 500,
                  maxWidth: 700,
                  border: '1px solid #222',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, color: '#00e6a2', fontSize: '1.15em' }}>🍳 My Recipes</span>
                    <button className="btn green" style={{ padding: '6px 18px', fontSize: '1em' }} onClick={() => { setShowRecipeForm(true); setEditRecipeIdx(null); setRecipeForm({ title: '', ingredients: '', instructions: '' }); }}>Add Recipe</button>
                  </div>
                  {myRecipes.length === 0 && <div style={{ color: '#888', margin: '8px 0' }}>No recipes yet. Add your first recipe!</div>}
                  {myRecipes.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {myRecipes.map((rec, idx) => (
                        <li key={idx} style={{ background: '#232b33', borderRadius: 10, marginBottom: 12, padding: '1rem', boxShadow: '0 1px 6px rgba(0,200,150,0.07)', color: '#e0f7f1' }}>
                          <div style={{ fontWeight: 600, color: '#00e6a2', fontSize: '1.08em', marginBottom: 4 }}>{rec.title}</div>
                          <div style={{ fontSize: '0.98em', color: '#b0b8c1', marginBottom: 4 }}><b>Ingredients:</b> {rec.ingredients}</div>
                          <div style={{ fontSize: '0.98em', color: '#b0b8c1', marginBottom: 4 }}><b>Instructions:</b> {rec.instructions}</div>
                          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                            <button className="btn yellow" style={{ padding: '4px 14px', fontSize: '0.95em' }} onClick={() => handleEditRecipe(idx)}>Edit</button>
                            <button className="btn red" style={{ padding: '4px 14px', fontSize: '0.95em' }} onClick={() => handleDeleteRecipe(idx)}>Delete</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Recipe Form Modal */}
                  {showRecipeForm && (
                    <div style={{
                      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 3000,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <form onSubmit={handleRecipeFormSubmit} style={{ background: '#232b33', borderRadius: 16, padding: '2rem 2.5rem', minWidth: 320, maxWidth: '90vw', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', color: '#e0f7f1', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', border: '1px solid #222' }}>
                        <button type="button" onClick={() => setShowRecipeForm(false)} style={{ position: 'absolute', top: 10, right: 18, background: 'none', border: 'none', fontSize: '1.5rem', color: '#00e6a2', cursor: 'pointer' }}>&times;</button>
                        <h3 style={{ color: '#00e6a2', marginBottom: 8 }}>{editRecipeIdx !== null ? 'Edit Recipe' : 'Add Recipe'}</h3>
                        <input type="text" placeholder="Title" value={recipeForm.title} onChange={e => setRecipeForm(f => ({ ...f, title: e.target.value }))} required style={{ padding: '10px', borderRadius: 8, border: '1px solid #222', fontSize: '1em', background: '#1a232a', color: '#e0f7f1' }} />
                        <textarea placeholder="Ingredients" value={recipeForm.ingredients} onChange={e => setRecipeForm(f => ({ ...f, ingredients: e.target.value }))} rows={3} required style={{ padding: '10px', borderRadius: 8, border: '1px solid #222', fontSize: '1em', background: '#1a232a', color: '#e0f7f1' }} />
                        <textarea placeholder="Instructions" value={recipeForm.instructions} onChange={e => setRecipeForm(f => ({ ...f, instructions: e.target.value }))} rows={4} required style={{ padding: '10px', borderRadius: 8, border: '1px solid #222', fontSize: '1em', background: '#1a232a', color: '#e0f7f1' }} />
                        <button type="submit" className="btn green" style={{ fontSize: '1em' }}>{editRecipeIdx !== null ? 'Save Changes' : 'Add Recipe'}</button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              <hr style={{ border: 'none', borderTop: '2px solid #222', margin: '36px 0 32px 0', opacity: 0.18 }} />
              {/* Activity Summary Placeholder */}
              <div style={{
                background: 'linear-gradient(120deg, #232b33 0%, #1a232a 100%)',
                borderRadius: 14,
                padding: '1.2rem 1.5rem',
                marginBottom: 32,
                color: '#e0f7f1',
                boxShadow: '0 2px 8px rgba(0,200,150,0.07)',
                fontSize: '1.08rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                border: '1px solid #222',
              }}>
                <span role="img" aria-label="activity" style={{ fontSize: '1.7rem' }}>📊</span>
                <span>Recent activity: <span style={{ color: '#00e6a2' }}>Coming soon — your saved recipes, ingredient swaps, and more will appear here!</span></span>
              </div>
              <hr style={{ border: 'none', borderTop: '2px solid #222', margin: '0 0 32px 0', opacity: 0.18 }} />
              {/* Summary Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 32,
                  marginBottom: 40,
                }}
              >
                <div className="card teal" style={{ ...cardStyle, background: '#232b33', color: '#e0f7f1', border: '1px solid #222' }}>
                  <span style={iconStyle}>{cardIcons[0]}</span>
                  <h3>Total Recipes</h3>
                  <p style={countStyle}>{metricsLoading ? '...' : metrics?.totalRecipes ?? '-'}</p>
                </div>
                <div className="card yellow" style={{ ...cardStyle, background: '#232b33', color: '#e0f7f1', border: '1px solid #222' }}>
                  <span style={iconStyle}>{cardIcons[1]}</span>
                  <h3>Mood Meals</h3>
                  <p style={countStyle}>{metricsLoading ? '...' : metrics?.moodMeals ?? '-'}</p>
                </div>
                <div className="card blue" style={{ ...cardStyle, background: '#232b33', color: '#e0f7f1', border: '1px solid #222' }}>
                  <span style={iconStyle}>{cardIcons[2]}</span>
                  <h3>Users</h3>
                  <p style={countStyle}>{metricsLoading ? '...' : metrics?.totalUsers ?? '-'}</p>
                </div>
                <div className="card red" style={{ ...cardStyle, background: '#232b33', color: '#e0f7f1', border: '1px solid #222' }}>
                  <span style={iconStyle}>{cardIcons[3]}</span>
                  <h3>Suggestions</h3>
                  <p style={countStyle}>{metricsLoading ? '...' : metrics?.suggestions ?? '-'}</p>
                </div>
              </div>
              {/* AI Suggestion of the Day, Recent Activity, Mini Calendar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, paddingBottom: 32 }}>
                {/* AI Suggestion of the Day */}
                <div className="suggestions-box" style={{ ...boxStyle, background: 'linear-gradient(120deg, #00c896 0%, #00e6a2 100%)', color: '#fff', boxShadow: '0 4px 24px rgba(0,200,150,0.13)', border: '1px solid #00e6a2' }}>
                  <h4 style={{ ...sectionTitleStyle, color: '#fff' }}>🤖 AI Suggestion of the Day</h4>
                  <p style={{ fontSize: '1.15rem', fontWeight: 500 }}>
                    {metricsLoading ? 'Loading...' : metrics?.aiSuggestion ?? 'No suggestions yet.'}
                  </p>
                </div>
                {/* Recent Activity */}
                <div className="activity-box" style={{ ...boxStyle, background: 'linear-gradient(120deg, #232b33 0%, #1a232a 100%)', color: '#e0f7f1', border: '1px solid #222' }}>
                  <h4 style={sectionTitleStyle}>📋 Recent Activity</h4>
                  <ul style={{ color: '#e0f7f1', fontSize: '1.05rem', margin: 0, paddingLeft: 18 }}>
                    {metricsLoading ? <li>Loading...</li> :
                      (metrics?.recentActivity?.length ? metrics.recentActivity.map((log, idx) => (
                        <li key={idx}>
                          <b>{log.type}:</b> {log.details} {log.user ? `by ${log.user.fullName}` : ''}
                        </li>
                      )) : <li>No recent activity yet.</li>)}
                  </ul>
                </div>
                {/* Mini Calendar Placeholder */}
                <div className="calendar-box" style={{ ...boxStyle, background: 'linear-gradient(120deg, #232b33 0%, #1a232a 100%)', color: '#e0f7f1', border: '1px solid #222' }}>
                  <h4 style={sectionTitleStyle}>📅 Mini Calendar</h4>
                  <div className="calendar-placeholder" style={{ color: '#e0f7f1', opacity: 0.7 }}>
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
