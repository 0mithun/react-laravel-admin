import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper';
import axios from 'axios';
import { Role } from '../../classes/role';


class roles extends Component {
    state = {
        roles: []
    }

     delete = async (id: number)=>{
        if(window.confirm('Are you sure to delete this record?')){
            try {
                await axios.delete(`/roles/${id}`)
                await this.componentDidMount();
            } catch (error) {
                console.log(error)
            }
        }
    }

    componentDidMount = async ()=>{
        try {
            const response = await axios.get('roles');
            this.setState({roles:response.data.data});
        } catch (error) {
            console.log(error)
        }
    }



    render() {
        return (
            <Wrapper>
            <div className="d-flex justify-content-between pt-3 pb-2 border-bottom flex-wrap flex-md-nowrap align-items-center mb-3">
                <div className="btn-toolbar mb-2 md-mb-0">
                    <Link to={'/roles/create'}  className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.roles.map((role: Role) => {
                            return (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to={`/role/${role.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a className="btn btn-sm btn-outline-secondary" onClick={()=> this.delete(role.id)}>Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
        );
    }
}

export default roles;
