import React, { Component } from 'react';
import Wrapper from '../Wrapper';
import axios from 'axios';
import { User } from '../../classes/user';
import { Link } from 'react-router-dom';

class Users extends Component {
    state  = {
        users: []
    }
    page =1;
    last_page = 0;
    componentDidMount = async ()=>{
        try {
            const response = await axios.get(`users?page=${this.page}`)
           this.setState({users:response.data.data})
           this.last_page = response.data.meta.last_page;
        } catch (error) {
            console.log(error)
        }
    }

    next = async ()=>{
        if(this.page === this.last_page) return;
        this.page = this.page + 1;
        await this.componentDidMount()

    }

    previous = async ()=>{
        if(this.page === 1) return;
        this.page = this.page - 1;
        await this.componentDidMount()
    }

    deleteUser = async (id: number)=>{
        if(window.confirm("Are you sure to delete this record ?")){
            try {
                await axios.delete(`users/${id}`)
               await this.componentDidMount();
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        return (
            <Wrapper>
                <div className="d-flex justify-content-between pt-3 pb-2 border-bottom flex-wrap flex-md-nowrap align-items-center mb-3">
                    <div className="btn-toolbar mb-2 md-mb-0">
                        <Link to={'/users/create'}  className="btn btn-sm btn-outline-secondary">Add</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>deleteUser
                            <th>Roll</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user: User)=>{
                                return(
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{`${user.first_name} ${user.last_name}`}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <Link to={`/users/${user.id}/edit`} href="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
                                                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={()=> this.deleteUser(user.id)}>Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul className="pagination">
                        <li className="page-item">

                            <a href="#" className="page-link" onClick={this.previous}>Previous</a>
                        </li>

                        <li className="page-item">
                            <a href="#" className="page-link" onClick={this.next}>Next </a>
                        </li>
                    </ul>
                </nav>
            </Wrapper>
        );
    }
}

export default Users;
