import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { order } from "../../classes/order";
import { OrderItem } from "../../classes/order_item";

class OrderItems extends Component<{ match: any }> {
    id = 0;
    state = {
        order_items: [],
    };

    componentDidMount = async () => {
        this.id = this.props.match.params.id;
        const response = await axios.get(`orders/${this.id}`);
        const order: order = response.data.data;
        this.setState({ order_items: order.order_items });
    };


    render() {
        return (
            <Wrapper>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.order_items.map((item: OrderItem) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.product_title} </td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        );
    }
}

export default OrderItems;
