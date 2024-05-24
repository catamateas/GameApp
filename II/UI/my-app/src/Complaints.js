import React, { Component } from 'react';
import { variables } from './Variables';

export class Complaints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complaints: []
        };
    }

    refreshList() {
        fetch(variables.API_URL + 'complaints')
            .then(response => response.json())
            .then(data => {
                this.setState({ complaints: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const { complaints } = this.state;

        return (
            <div className="container">
                <h3>Complaints</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                complaintId
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
                        {complaints.map(complaint =>
                            <tr key={complaint.complaintId}>
                                <td>{complaint.complaintId}</td>
                                <td>{complaint.userId}</td>
                                <td>{complaint.createdAt}</td>
                                <td>{complaint.message}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
