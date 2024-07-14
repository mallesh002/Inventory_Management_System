import React, { useEffect, useState } from 'react';

function UserProfile() {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const userId = 1; // Replace this with the actual user ID from the context or props

  useEffect(() => {
    fetch(`http://localhost:8081/user-profile/${userId}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.log(err));
  }, [userId]);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: Customer1{profile.username}</p>
      <p>Email: abc@gmail.com{profile.email}</p>
    </div>
  );
}

export default UserProfile;
