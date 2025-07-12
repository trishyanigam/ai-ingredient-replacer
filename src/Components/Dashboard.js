import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>FoodFitAI</h2>
        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Recipes</a>
          <a href="#">MoodMeals</a>
          <a href="#">Users</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="header">
          <div className="user-welcome">
            <img src="" alt="User" />
            <div>
              <h3>Welcome back, User!</h3>
              <p>Here's what’s happening today:</p>
            </div>
          </div>
          <div className="Notification-bell">🔔</div>
        </div>

        {/* Summary Cards */}
        <div className="card-container">
          <div className="card teal">
            <h3>Total Recipes</h3>
            <p>128</p>
          </div>
          <div className="card yellow">
            <h3>Mood Meals</h3>
            <p>52</p>
          </div>
          <div className="card blue">
            <h3>Users</h3>
            <p>312</p>
          </div>
          <div className="card red">
            <h3>Suggestions</h3>
            <p>89</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          {/* Suggestions of the Day */}
          <div className="suggestions-box">
            <h4>🤖 AI Suggestion of the Day</h4>
            <p>“Swap coconut cream for cashew paste in curries for a nutty vegan twist!”</p>
          </div>

          {/* Activity Feed */}
          <div className="activity-box">
            <h4>📋 Recent Activity</h4>
            <ul>
              <li>✅ MoodMeal ‘Post-Gym’ added</li>
              <li>👤 New user joined: <b>Sam</b></li>
              <li>📝 AI suggested 3 ingredient swaps</li>
              <li>📤 Community post uploaded</li>
            </ul>
          </div>

          {/* Calendar Placeholder */}
          <div className="calendar-box">
            <h4>📅 Mini Calendar</h4>
            <div className="calendar-placeholder">Coming Soon</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
