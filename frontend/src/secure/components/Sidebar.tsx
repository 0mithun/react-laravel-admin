import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to={'/dashboard'} className="nav-link" exact >
              <span data-feather="home"></span>
              Dashboard <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/users'} className="nav-link">
              <span data-feather="file"></span>
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/roles'} className="nav-link">
              <span data-feather="file"></span>
              Roles
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
)

export default Sidebar;
