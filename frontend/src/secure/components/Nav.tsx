import React, { Component, SyntheticEvent } from "react";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

class Nav extends Component {

    state ={
        redirect: false,
    }

    handleLogout = (e: SyntheticEvent)=>{
        localStorage.clear()
        this.setState({redirect:true})
    }
  render() {
    if(this.state.redirect){
        return <Redirect to={'/login'} />
    }

    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to={'/'}>
          Company name
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#" onClick={this.handleLogout}>
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
