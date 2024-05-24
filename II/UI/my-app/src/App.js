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
  const isLoggedIn = false; // Update this with actual login status check

  return (
    <BrowserRouter>
      <div className="App container">
        <nav className="navbar navbar-expand-sm">
          <ul className="navbar-nav">
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
            {isLoggedIn ? (
              <li className="nav-item m-1 dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="profile_picture_url" alt="Profile" width="30" height="30" className="rounded-circle" /> PlayerName
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                  <li><a className="dropdown-item" href="/logout">Logout</a></li>
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
          <Route path='/home' element={<Home />} />
          <Route path='/factions' element={<Factions />} />
          <Route path='/clans' element={<Clans />} />
          <Route path='/complaints' element={<Complaints />} />
          <Route path='/tickets' element={<Tickets />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
