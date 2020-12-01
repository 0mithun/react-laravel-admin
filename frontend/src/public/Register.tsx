import React, { Component, SyntheticEvent } from 'react';
import './login.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    first_name = '';
    last_name = '';
    email='';
    password='';
    password_confirm ='';

    state = {
        redirect: false,
    }

     submit = async (e:SyntheticEvent)=>{
        e.preventDefault();
        const url = 'register';
        try {
            await axios.post(url,
                {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password,
                    password_confirm: this.password_confirm
                }
            );
            this.setState({redirect:true})
        } catch (error) {
            console.log(error)
        }

    }

    render() {

        if(this.state.redirect){
          return <Redirect to={'/login'} />
        }


        return (
            <form className="form-signin" onSubmit={this.submit}>
                <h1 className="h3 mb-2 font-weight-normal text-center">Plese Register</h1>

                <div className="form-group">
                    <label htmlFor="first_name" className="sr-only">First Name</label>
                    <input type="text" id="first_name" className="form-control" placeholder="First Name" required autoFocus
                        onChange={e=> this.first_name = e.target.value}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name" className="sr-only">Last Name</label>
                    <input type="text" id="last_name" className="form-control" placeholder="Last Name"
                    onChange={e=> this.last_name = e.target.value}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input type="email" id="email" className="form-control" placeholder="Email address"
                        onChange={e=> this.email = e.target.value}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Password"
                        onChange={e=> this.password = e.target.value}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password_confirm" className="sr-only">Confirm Password</label>
                    <input type="password" id="password_confirm" className="form-control" placeholder="Confirm Password"
                        onChange={e=> this.password_confirm = e.target.value}
                    />
                </div>



                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
        );
    }
}

export default Register;
