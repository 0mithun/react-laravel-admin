import React, { Component } from 'react';
import Wrapper from '../Wrapper';
import axios from 'axios';
import { User } from '../../classes/user';
import { Link } from 'react-router-dom';
import Paginator from '../components/Paginator';
import Deletor from '../components/Deletor';
import { connect } from 'react-redux';

class Users extends Component<{user: User}> {
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

    handlePageChange = async (page: number)=>{
        this.page = page;
        await this.componentDidMount();
    }
    handleDelete = async ()=>{
        await this.componentDidMount();
    }

    actions = (id: number)=>{

        if(this.props.user.canEdit('users')){
            return (
                <div className="btn-group mr-2">
                    <Link to={`/users/${id}/edit`} href="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
                    <Deletor id={id} endpoint={'users'} handleDelete={this.handleDelete} />
                </div>
            )
        }
    }

    render() {
        let addButton = null
        if(this.props.user.canEdit('users')){
            addButton = (
                <div className="d-flex justify-content-between pt-3 pb-2 border-bottom flex-wrap flex-md-nowrap align-items-center mb-3">
                    <div className="btn-toolbar mb-2 md-mb-0">
                        <Link to={'/users/create'}  className="btn btn-sm btn-outline-secondary">Add</Link>
                    </div>
                </div>
            )
        }

        return (
            <Wrapper>
                {addButton}
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
                                           {this.actions(user.id)}
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                <Paginator lastPage={this.last_page} handlePageChange={this.handlePageChange}></Paginator>
            </Wrapper>
        );
    }
}

// @ts-ignore

export default connect(state => ({user: state.user})) (Users);
