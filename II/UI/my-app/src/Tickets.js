import React, { Component } from 'react';
import { variables } from './Variables';

export class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            message: ""
        };
    }

    refreshList() {
        fetch(variables.API_URL + 'tickets')
            .then(response => response.json())
            .then(data => {
                this.setState({ tickets: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changemessage = (e) => {
        this.setState({ message: e.target.value });
    }

    addTicket = () => {
        fetch(variables.API_URL + 'tickets', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: this.state.message
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    render() {
        const { tickets, message } = this.state;

        return (
            <div className="container">
                <h3>Tickets</h3>
                <div className="mb-3">
                    <textarea className="form-control" value={message} onChange={this.changemessage} placeholder="Add your ticket"></textarea>
                    <button className="btn btn-primary mt-2" onClick={this.addTicket}>Add Ticket</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ticketId
                            </th>
                            <th>
                                userId
                            </th>
                            <th>
                                createdAt
                            </th>
                            <th>
                                message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket =>
                            <tr key={ticket.ticketId}>
                                <td>{ticket.ticketId}</td>
                                <td>{ticket.userId}</td>
                                <td>{ticket.createdAt}</td>
                                <td>{ticket.message}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
