import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { Factions } from './Factions';
import { Clans } from './Clans';
import { Complaints } from './Complaints';
import { Tickets } from './Tickets';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className='d-flex justify-content-center m-3'>
          React JS FrontEnd
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/factions">
                Factions
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/clans">
                Clans
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/complaints">
                Complaints
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/tickets">
                Tickets
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/factions' element={<Factions />} />
          <Route path='/clans' element={<Clans />} />
          <Route path='/complaints' element={<Complaints />} />
          <Route path='/tickets' element={<Tickets />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
