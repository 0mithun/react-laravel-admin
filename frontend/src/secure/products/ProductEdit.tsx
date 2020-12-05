import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from 'axios'
import { Redirect } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import { Product } from "../../classes/product";

class ProductEdit extends Component<{match:any}> {
    id = 0;
    image = '';

    state = {
        image: '',
        redirect: false,
        title: '',
        description: '',
        price: 0,

    }

    componentDidMount = async ()=>{
        this.id = this.props.match.params.id;
        try {
            const response = await axios.get(`products/${this.id}`)
            const product: Product = response.data;
            this.setState({
                title: product.title,
                description: product.description,
                price : product.price,
                image: product.image
            })
        } catch (error) {
            console.log(error)
        }
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.put(`products/${this.id}`,{
                title: this.state.title,
                image: this.state.image,
                description:  this.state.description,
                price: this.state.price,
            })
           this.setState({redirect: true})
        } catch (error) {
            console.log(error)
        }
    }

    imageChanged = (image: string)=>{
        this.setState({image:image})
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
              defaultValue={this.state.title}
              onChange={(e)=> this.setState({title: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product_description" >
              Last Name
            </label>
            <textarea
                rows={5}
              id="product_description"
              className="form-control"
              placeholder="Product Description"
              defaultValue={this.state.description}
              onChange={(e)=> this.setState({description: e.target.value})}
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
              value={this.state.price}
              onChange={(e)=> this.setState({price:  e.target.value})}
            />
          </div>

            <ImageUpload value={ this.state.image} imageChanged={this.imageChanged}  />



            <button className="btn btn-lg btn-primary btn-block" type="submit">
            Update
          </button>
        </form>
      </Wrapper>
    );
  }
}


export default ProductEdit;
