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
            <div>
                <h3>Complaints</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ComplaintId
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
                        {complaints.map(complaint =>
                            <tr key={complaint.ComplaintId}>
                                <td>{complaint.ComplaintId}</td>
                                <td>{complaint.UserId}</td>
                                <td>{complaint.CreatedAt}</td>
                                <td>{complaint.Message}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
