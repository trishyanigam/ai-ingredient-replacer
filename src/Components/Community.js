import React from 'react';
import './Community.css';

const Community = () => {
  return (
    <div className="community-container">
      <h2>Community Discussions</h2>
      <p className="subheading">Connect, share, and learn with other health-focused foodies!</p>

      <div className="post-list">
        <div className="post-card">
          <h3>How do I substitute dairy in baking?</h3>
          <p>I’ve recently turned vegan. Any great alternatives for butter and milk in cakes?</p>
          <span className="user">@healthyBaker</span>
        </div>

        <div className="post-card">
          <h3>Nut-free snack ideas for kids?</h3>
          <p>Looking for allergy-safe snacks to pack for school.</p>
          <span className="user">@momof3</span>
        </div>

        <div className="post-card">
          <h3>Best gluten-free pasta brands?</h3>
          <p>I want to switch, but taste really matters. Suggestions?</p>
          <span className="user">@fitnessguru</span>
        </div>
      </div>
    </div>
  );
};

export default Community;
