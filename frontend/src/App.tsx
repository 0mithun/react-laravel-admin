import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './public/Login'
import Dashboard from './secure/dashboard/Dashboard';
import RedirectToDashboard from './secure/RedirectToDashboard';
import Register from './public/Register';
import Users from './secure/users/Users';
import UserCreate from './secure/users/UserCreate';
import UserEdit from './secure/users/UserEdit';
import Roles from './secure/roles/roles';
import RoleCreate from './secure/roles/RoleCreate';
import RoleEdit from './secure/roles/RoleEdit';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Route path={'/login'} component={Login}></Route>
            <Route path={'/register'} component={Register}></Route>
            <Route path={'/'} exact component={RedirectToDashboard}></Route>
            <Route path={'/dashboard'} exact component={Dashboard}></Route>
            <Route path={'/users'} exact component={Users}></Route>
            <Route path={'/users/create'} component={UserCreate}></Route>
            <Route path={'/users/:id/edit'} component={UserEdit} ></Route>

            <Route path={'/roles'} exact component={Roles} />
            <Route path={'/roles/create'} component={RoleCreate} />
            <Route path={'/roles/:id/edit'} component={RoleEdit} />
        </BrowserRouter>
    </div>
  );
}

export default App;
