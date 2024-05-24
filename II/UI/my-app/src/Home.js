import React, { Component } from 'react';
import { variables } from './Variables';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    refreshList() {
        fetch(variables.API_URL + 'users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        this.setState({ users: data });
    })
    .catch(error => console.error('Error fetching data: ', error));
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const { users } = this.state;

        return (
            <div className="row">
                <div className="col-md-8">
                    <h3>Server Map</h3>
                    <img src="https://bluepanel.bugged.ro/storage/online_small.jpeg?dontCache=2014" alt="Server Map" className="img-fluid" />
                </div>
                <div className="col-md-4">
                    <h3>Friends List</h3>
                    <ul className="list-group">
                        {users.map(users => (
                            <li key={users.userId} className="list-group-item">
                                <div className="d-inline-block ml-2">
                                    <p className="mb-0"><strong>Username:</strong> {users.userName}</p>
                                    <p className="mb-0"><strong>Email:</strong> {users.email}</p>
                                    <p className="mb-0"><strong>Level:</strong> {users.level}</p>
                                    <p className="mb-0"><strong>Faction:</strong> {users.faction}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
