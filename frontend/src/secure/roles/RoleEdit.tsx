import React, { Component, PropsWithRef, SyntheticEvent } from 'react';
import Wrapper from '../Wrapper';
import axios from 'axios'
import { Permission } from '../../classes/permisson';
import { Redirect } from 'react-router-dom';
import { Role } from '../../classes/role';


class RoleEdit extends Component<{match: PropsWithRef<any>}> {
    name = '';
    selected:number[] = [];
    id=0;

    state = {
        permissions: [],
        redirect: false,
        name: '',
        selected: []
    }

    componentDidMount = async ()=>{
        this.id = this.props.match.params.id;
        try {
            const permissionsResponse =await axios.get('permissions')
            const roleResponse =await axios.get(`roles/${this.id}`)
            const role:Role = roleResponse.data.data;

            this.selected = role.permissions.map((item)=> item.id);

            this.setState({permissions:permissionsResponse.data.data, name:role.name, selected: this.selected})
        } catch (error) {
            console.log(error)
        }
    }




    check = (id: number)=>{
        if(this.isChecked(id)){
            this.selected = this.selected.filter(item=> item !== id);
        }else{
            this.selected.push(id)
        }
    }
    isChecked =(id: number)=>{
        return this.selected.includes(id);
    }
     submit = async (e:SyntheticEvent)=>{
         e.preventDefault()

         try {
             const response = await axios.put(`roles/${this.id}`,{
                 name:this.name,
                 permissions: this.selected
             })
             this.setState({redirect: true})
         } catch (error) {
             console.log(error)
         }

    }
    render() {
        if(this.state.redirect){
            return <Redirect to={'/roles'}/>
        }
        return (
            <Wrapper>
            <form className="" onSubmit={this.submit}>
              <h1 className="h3 mb-2 font-weight-normal text-center">
                Create Role
              </h1>

              <div className="form-group row">
                <label htmlFor="first_name"  className="col-form-label col-sm-2">
                  Name
                </label>
                <div className="col-sm-10">
                <input
                    type="text"
                    id="first_name"
                    className="form-control"
                    placeholder="First Name"
                    required
                    autoFocus
                    onChange={(e)=> this.name = e.target.value}
                    defaultValue={this.name = this.state.name}
                    />

                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="permissions" className="col-form-label col-sm-2">
                  Permissions
                </label>

                <div className="col-sm-10">

                    {this.state.permissions.map((permission:Permission)=>{
                        return (
                            <div className="form-check form-check-inline col-3" key={permission.id}>
                                <input type="checkbox" className="form-check-input" value={permission.id}
                                    onChange={(e) => this.check(permission.id)}
                                    defaultChecked={this.isChecked(permission.id)}/>
                                <label htmlFor="" className="form-check-label">{permission.name}</label>
                            </div>
                        )
                    })}


                </div>
              </div>


              <button className="btn btn-lg btn-primary btn-block" type="submit">
                Update
              </button>
            </form>
          </Wrapper>

        );
    }
}

export default RoleEdit;
