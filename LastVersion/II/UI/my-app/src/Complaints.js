import React, { Component } from 'react';
import { variables } from './Variables';

export class Complaints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: []
        };
    }

    refreshList() {
        fetch(variables.API_URL + 'ticket')
            .then(response => response.json())
            .then(data => {
                this.setState({ ticket: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const { ticket } = this.state;

        return (
            <div className="container">
                <h3>ticket</h3>
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
                        {ticket.map(ticket =>
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
