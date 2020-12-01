import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from 'axios'
import { Role } from "../../classes/role";
import { Redirect } from "react-router-dom";

class UserCreate extends Component {

    first_name = '';
    last_name = '';
    email= '';
    role_id= 0;

    state = {
        roles: [],
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const user = await axios.post('users',{
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                role_id: this.role_id
            })
           this.setState({redirect: true})
        } catch (error) {
            console.log()
        }
    }

    componentDidMount = async ()=>{
        try {
            const response = await axios.get('roles')
            this.setState({roles: response.data.data})
        } catch (error) {
            console.log(error)
        }
    }

  render() {
      if(this.state.redirect){
          return <Redirect to={'/users'} />
      }
    return (
      <Wrapper>
        <form className="" onSubmit={this.submit}>
          <h1 className="h3 mb-2 font-weight-normal text-center">
            Create User
          </h1>

          <div className="form-group">
            <label htmlFor="first_name" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="form-control"
              placeholder="First Name"
              required
              autoFocus
              onChange={(e)=> this.first_name = e.target.value}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="form-control"
              placeholder="Last Name"
              onChange={(e)=> this.last_name = e.target.value}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              onChange={(e)=> this.email = e.target.value}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select  id="role" className="form-control" onChange={(e)=> this.role_id = parseInt( e.target.value)}>
            <option value="">Select Role</option>

            {
                this.state.roles.map((role: Role)=>{
                    return (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    )
                })
            }


            </select>
          </div>

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Register
          </button>
        </form>
      </Wrapper>
    );
  }
}

export default UserCreate;
