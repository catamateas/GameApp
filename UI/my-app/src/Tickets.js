import React, { Component } from 'react';
import { variables } from './Variables';

export class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            Message: ""
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

    changeMessage = (e) => {
        this.setState({ Message: e.target.value });
    }

    addTicket = () => {
        fetch(variables.API_URL + 'tickets', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Message: this.state.Message
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
        const { tickets, Message } = this.state;

        return (
            <div className="container">
                <h3>Tickets</h3>
                <div className="mb-3">
                    <textarea className="form-control" value={Message} onChange={this.changeMessage} placeholder="Add your ticket"></textarea>
                    <button className="btn btn-primary mt-2" onClick={this.addTicket}>Add Ticket</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                TicketId
                            </th>
                            <th>
                                UserId
                            </th>
                            <th>
                                CreatedAt
                            </th>
                            <th>
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket =>
                            <tr key={ticket.TicketId}>
                                <td>{ticket.TicketId}</td>
                                <td>{ticket.UserId}</td>
                                <td>{ticket.CreatedAt}</td>
                                <td>{ticket.Message}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
