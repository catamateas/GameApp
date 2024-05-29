import React, { Component } from 'react';
import { variables } from './Variables';

export class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            message: "",
            currentUser: null,
            loading: true,
            error: null
        };

        this.changemessage = this.changemessage.bind(this);
        this.addTicket = this.addTicket.bind(this);
    }

    refreshList(userId) {
        fetch(`${variables.API_URL}ticket/user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ tickets: data, loading: false });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                this.setState({ tickets: [], loading: false, error: error.message });
            });
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            this.setState({ currentUser });
            this.refreshList(currentUser.userId);
        } else {
            this.setState({ loading: false, error: 'User not found. Please log in again.' });
        }
    }

    changemessage(e) {
        this.setState({ message: e.target.value });
    }

    addTicket() {
        const { message, currentUser } = this.state;
        if (!currentUser || !currentUser.userId) {
            alert('User not found. Please log in again.');
            return;
        }

        fetch(variables.API_URL + 'ticket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                userId: currentUser.userId
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((result) => {
            alert(result.message || 'Ticket created successfully');
            this.refreshList(currentUser.userId);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to create ticket: ' + error.message);
        });
    }

    render() {
        const { tickets, message, loading, error } = this.state;

        return (
            <div className="container">
                <h3>Tickets</h3>
                <div className="mb-3">
                    <textarea className="form-control" value={message} onChange={this.changemessage} placeholder="Add your ticket"></textarea>
                    <button className="btn btn-primary mt-2" onClick={this.addTicket}>Add Ticket</button>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>User ID</th>
                                <th>Created At</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket =>
                                <tr key={ticket.ticketId}>
                                    <td>{ticket.ticketId}</td>
                                    <td>{ticket.userId}</td>
                                    <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                                    <td>{ticket.message}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}
