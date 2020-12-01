import React, { Component, SyntheticEvent } from 'react';
import Wrapper from '../Wrapper';
import axios from 'axios'
import { Permission } from '../../classes/permisson';
import { Redirect } from 'react-router-dom';


class RoleCreate extends Component {

    state = {
        permissions: [],
        redirect: false,
    }

    componentDidMount = async ()=>{
        try {
            const response =await axios.get('permissions')
            this.setState({permissions:response.data.data})
        } catch (error) {
            console.log(error)
        }
    }

    name = '';
    selected:number[] = []
    check = (id: number)=>{
        if(this.selected.includes(id)){
            this.selected = this.selected.filter(item=> item !== id);
        }else{
            this.selected.push(id)
        }
    }
     submit = async (e:SyntheticEvent)=>{
         e.preventDefault()

         try {
             const response = await axios.post('roles',{
                 name:this.name,
                 permissions: this.selected
             })
             console.log(response.data)
            //  this.setState({redirect: true})1
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
                                <input type="checkbox" className="form-check-input" value={permission.id} onChange={(e) => this.check(permission.id)}/>
                                <label htmlFor="" className="form-check-label">{permission.name}</label>
                            </div>
                        )
                    })}


                </div>
              </div>


              <button className="btn btn-lg btn-primary btn-block" type="submit">
                Register
              </button>
            </form>
          </Wrapper>

        );
    }
}

export default RoleCreate;
