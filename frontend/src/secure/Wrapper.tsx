import React, { Component } from 'react';
import Nav from '../secure/components/Nav';
import Sidebar from '../secure/components/Sidebar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Wrapper extends Component {

    state = {redirect:false}

    componentDidMount =  async ()=>{
        try {
            const user = await axios.get('user');
        } catch (error) {
            this.setState({redirect:true})
        }
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={'/login'} />
        }

        return (
            <>
                <Nav />

                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>
        );
    }
}

export default Wrapper;
