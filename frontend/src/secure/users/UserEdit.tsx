import React, { Component, PropsWithRef, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Role } from '../../classes/role';
import Wrapper from '../Wrapper';
import axios from 'axios'
import { User } from '../../classes/user';

class UserEdit extends Component<{match: PropsWithRef<any>}> {
    id= 0;


    state = {
        roles: [],
        redirect: false,
        first_name : '',
        last_name : '',
        email : '',
        role_id : 0
    }

        redirect =false;
        first_name = '';
        last_name= '';
        email = '';
        role_id = 0;

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const user = await axios.put(`users/${this.id}`,{
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
        this.id = this.props.match.params.id;
        try {
            const userCall = await axios.get(`users/${this.id}`)
            const user: User = userCall.data.data
            const response = await axios.get('roles')
            this.setState({roles: response.data.data, first_name: user.first_name, last_name: user.last_name, email: user.email, role_id: user.role.id  })



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
              defaultValue={this.first_name = this.state.first_name}
              onBlur={(e)=> this.first_name = e.target.value}
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
              defaultValue={this.last_name = this.state.last_name}
              onBlur={(e)=> this.last_name = e.target.value}
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
              defaultValue={this.email = this.state.email}
              onBlur={(e)=> this.email = e.target.value}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select  id="role" className="form-control" onChange={(e)=> {
                 this.role_id = parseInt( e.target.value);
                 this.setState({role_id: this.role_id})
            }}  value={this.role_id = this.state.role_id} >
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
            Update
          </button>
        </form>
      </Wrapper>
    );
  }
}

export default UserEdit;
