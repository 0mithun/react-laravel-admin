import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from 'axios'
import { Redirect } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

class ProductCreate extends Component {

    title = '';
    image = '';
    description= '';
    price = 0;

    state = {
        image: '',
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post('products',{
                title: this.title,
                image: this.image,
                description:  this.description,
                price: this.price,
            })
           this.setState({redirect: true})
        } catch (error) {
            console.log()
        }
    }

    imageChanged = (image: string)=>{
        this.setState({image:image})
        this.image = image;
    }

  render() {
      if(this.state.redirect){
          return <Redirect to={'/products'} />
      }
    return (
      <Wrapper>
        <form className="" onSubmit={this.submit}>
          <h1 className="h3 mb-2 font-weight-normal text-center">
            Create Product
          </h1>

          <div className="form-group">
            <label htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Product Title"
              required
              autoFocus
              onChange={(e)=> this.title = e.target.value}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product_description" >
              Last Name
            </label>
            <textarea
              id="product_description"
              className="form-control"
              placeholder="Product Description"
              onChange={(e)=> this.description = e.target.value}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="price" >
              Price
            </label>
            <input
              type="text"
              id="price"
              className="form-control"
              placeholder="Price"
              onChange={(e)=> this.price = parseFloat(e.target.value)}
            />
          </div>

            <ImageUpload value={this.image = this.state.image} imageChanged={this.imageChanged}  />



          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Create
          </button>
        </form>
      </Wrapper>
    );
  }
}

export default ProductCreate;
