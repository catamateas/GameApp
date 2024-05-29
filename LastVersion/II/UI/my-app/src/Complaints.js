import React, { Component } from 'react';
import { variables } from './Variables';

export class Complaints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        };
    }

    refreshList() {
        fetch(variables.API_URL + 'ticket')
            .then(response => response.json())
            .then(data => {
                this.setState({ tickets: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const { tickets } = this.state;

        return (
            <div className="container">
                <h3>Tickets</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Created At</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.ticketId}>
                                <td>{ticket.ticketId}</td>
                                <td>{ticket.userId}</td>
                                <td>{ticket.userName}</td>
                                <td>{ticket.createdAt}</td>
                                <td>{ticket.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
