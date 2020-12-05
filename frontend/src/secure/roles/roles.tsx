import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper';
import axios from 'axios';
import { Role } from '../../classes/role';
import Deletor from '../components/Deletor';
import { User } from '../../classes/user';
import { connect } from 'react-redux';


class roles extends Component<{user: User}> {
    state = {
        roles: []
    }

    handleDelete = async ()=>{
        await this.componentDidMount();
    }
    componentDidMount = async ()=>{
        try {
            const response = await axios.get('roles');
            this.setState({roles:response.data.data});
        } catch (error) {
            console.log(error)
        }
    }


    actions = (id: number)=>{
        if(this.props.user.canEdit('roles')){
            return (
                <div className="btn-group mr-2">
                    <Link to={`/roles/${id}/edit`} href="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
                    <Deletor id={id} endpoint={'roles'} handleDelete={this.handleDelete} />
                </div>
            )
        }
    }


    render() {

        let addButton = null
        if(this.props.user.canEdit('roles')){
            addButton = (
                <div className="d-flex justify-content-between pt-3 pb-2 border-bottom flex-wrap flex-md-nowrap align-items-center mb-3">
                    <div className="btn-toolbar mb-2 md-mb-0">
                        <Link to={'/roles/create'}  className="btn btn-sm btn-outline-secondary">Add</Link>
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
                                        {this.actions(role.id)}
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


// @ts-ignore
export default connect(state => ({user: state.user})) (roles);
