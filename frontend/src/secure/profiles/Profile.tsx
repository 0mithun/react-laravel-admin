import React, { Component, SyntheticEvent } from 'react';
import Wrapper from '../Wrapper';
import axios from 'axios';
import { connect } from 'react-redux';
import { User } from '../../classes/user';
import setUser from '../../redux/actions/setUserAction';

class Profile extends Component<any> {

    first_name = '';
    last_name = '';
    password = '';
    password_confirm = '';

    updatePassword = async (e:SyntheticEvent)=>{
        e.preventDefault();
        try {
            await axios.put('user/password',{
                password: this.password,
                password_confirm: this.password_confirm
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateInformation = async (e:SyntheticEvent) =>{
        e.preventDefault();
        try {
            const response =  await axios.put('user/info',{
                first_name: this.first_name,
                last_name: this.last_name,
            })

            const user: User = response.data;
            this.props.setUser(new User(
                user.id,
                user.first_name,
                user.last_name,
                user.email,
                user.role,
                user.permissions
            ));

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <Wrapper>
                <h2>Account Information</h2>
                <hr/>

                <form onSubmit={this.updateInformation}>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" className="form-control" onChange={e=> this.first_name = e.target.value} defaultValue={this.first_name = this.props.user.first_name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" className="form-control" onChange={e=> this.last_name = e.target.value} defaultValue={this.last_name = this.props.user.last_name} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-outline-secondary">Save</button>
                    </div>
                </form>

                <h2 className="mt-4">Change Password</h2>
                <hr/>

                <form onSubmit={this.updatePassword}>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" onChange={e=> this.password = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_confirm">Password Confirm</label>
                        <input type="password" id="password_confirm" className="form-control" onChange={e=> this.password_confirm = e.target.value} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-outline-secondary">Update Password</button>
                    </div>
                </form>
            </Wrapper>
        );
    }
}

//@ts-ignore
export default connect(state=>({user: state.user}), dispatch => ({setUser: user=> dispatch(setUser(user))}))(Profile);
