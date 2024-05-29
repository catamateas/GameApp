import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { Factions } from './Factions';
import { Clans } from './Clans';
import { Complaints } from './Complaints';
import { Tickets } from './Tickets';
import { Profile } from './Profile';
import { Login } from './Login';
import { BrowserRouter, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import './custom.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log('User from localStorage:', parsedUser);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser);

        const profilePictures = JSON.parse(localStorage.getItem('profilePictures')) || {};
        const userProfilePicture = profilePictures[parsedUser.userId];
        setProfilePicture(userProfilePicture ? `data:image/png;base64,${userProfilePicture}` : null);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));

    const profilePictures = JSON.parse(localStorage.getItem('profilePictures')) || {};
    const userProfilePicture = profilePictures[user.userId];
    setProfilePicture(userProfilePicture ? `data:image/png;base64,${userProfilePicture}` : null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setProfilePicture(null);
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <div className="App container">
        <nav className="navbar navbar-expand-sm">
          <ul className="navbar-nav me-auto">
            <li className="nav-item m-1">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="nav-link" to="/factions">
                Factions
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="nav-link" to="/clans">
                Clans
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <div className="dropdown">
                <button className="nav-link dropdown-toggle" type="button" id="topicsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Topics
                </button>
                <ul className="dropdown-menu" aria-labelledby="topicsDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/complaints">Complaints</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/tickets">Tickets</NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item m-1 dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" width="30" height="30" className="rounded-circle" />
                  ) : (
                    <img src="default_profile_picture_url" alt="Profile" width="30" height="30" className="rounded-circle" />
                  )}
                  {currentUser.UserName}
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item m-1">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Home currentUser={currentUser} />} />
          <Route path='/factions' element={<Factions isLoggedIn={isLoggedIn} />} />
          <Route path='/clans' element={<Clans isLoggedIn={isLoggedIn} />} />
          <Route path='/complaints' element={<Complaints />} />
          <Route path='/tickets' element={isLoggedIn ? <Tickets currentUser={currentUser} /> : <Navigate to="/login" />} />
          <Route path='/profile' element={isLoggedIn ? <Profile currentUser={currentUser} /> : <Navigate to="/login" />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/' element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
