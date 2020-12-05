import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { User } from "../../classes/user";

class Sidebar extends Component<{user: User}> {
    menuItems =[
        {
            name: 'Dashboard',
            link: '/dashboard'
        },
        {
            name: 'Users',
            link: '/users'
        },
        {
            name: 'Roles',
            link: '/roles'
        },
        {
            name: 'Products',
            link: '/products'
        },
        {
            name: 'Orders',
            link: '/orders'
        },
    ]


    render() {
        let menu:JSX.Element[] = [];

        this.menuItems.forEach(item=>{
            if(this.props.user.canView(item.name.toLowerCase())){
                menu.push (
                    <li className="nav-item">
                        <NavLink
                            to={item.link}
                            className="nav-link"
                            exact
                        >
                            {item.name}
                        </NavLink>
                    </li>
                )
            }
        })

        return (
            <nav
                id="sidebarMenu"
                className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink
                            to={'/dashboard'}
                            className="nav-link"
                            exact
                        >
                           Dashboard
                        </NavLink>
                    </li>
                       {menu}
                    </ul>
                </div>
            </nav>
        );
    }
}

// @ts-ignore

export default connect(state=> ({user: state.user}))(Sidebar);
