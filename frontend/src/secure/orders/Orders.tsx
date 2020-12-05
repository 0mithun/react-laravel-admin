import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import axios from "axios";
import Paginator from "../components/Paginator";
import { order } from "../../classes/order";

class Orders extends Component {
    state = {
        orders: [],
    };

    last_page = 0;
    page = 1;

    componentDidMount = async () => {
        try {
            const response = await axios.get(`orders?page=${this.page}`);
            this.setState({ orders: response.data.data });
            this.last_page = response.data.meta.last_page;
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async () => {
        await this.componentDidMount();
    };

    handlePageChange = async (page: number) => {
        this.page = page;
        await this.componentDidMount();
    };



    export = async () => {
        const response = await axios.get("export", { responseType: "blob" });
        const blob = new Blob([response.data], {
            type: "text/csv",
        });

        const downloadURL = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = downloadURL;
        link.download = "orders.csv";
        link.click();
    };

    render() {
        return (
            <Wrapper>
                <div className="d-flex justify-content-between pt-3 pb-2 border-bottom flex-wrap flex-md-nowrap align-items-center mb-3">
                    <div className="btn-toolbar mb-2 md-mb-0">
                        <a
                            onClick={this.export}
                            className="btn btn-sm btn-outline-secondary"
                        >
                            Export
                        </a>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map((order: order) => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{`${order.first_name} ${order.last_name}`}</td>
                                        <td>{order.email}</td>
                                        <td>{order.total}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <Link
                                                    to={`/orders/${order.id}`}
                                                    href="#"
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <Paginator
                    lastPage={this.last_page}
                    handlePageChange={this.handlePageChange}
                ></Paginator>
            </Wrapper>
        );
    }
}

export default Orders;
