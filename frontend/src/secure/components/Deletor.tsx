import React, { Component } from 'react';
import axios from 'axios'


class Deletor extends Component<{id:number, endpoint: string, handleDelete: any}> {
    delete = async ()=>{
        if(window.confirm("Are you sure to delete this record ?")){
            try {
                await axios.delete(`${this.props.endpoint}/${this.props.id}`)
                this.props.handleDelete();
            } catch (error) {
                console.log(error)
            }
        }
    }
    render() {
        return (
            <a href="#" className="btn btn-sm btn-outline-secondary" onClick={()=> this.delete()}>Delete</a>
        );
    }
}

export default Deletor;
