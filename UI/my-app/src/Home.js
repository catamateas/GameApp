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
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
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
                        {users.map(user => (
                            <li key={user.UserId} className="list-group-item">
                                <img src={variables.PHOTO_URL + user.ProfilePicture} alt="Profile" width="30" height="30" className="rounded-circle" />
                                <div className="d-inline-block ml-2">
                                    <p className="mb-0"><strong>Username:</strong> {user.UserName}</p>
                                    <p className="mb-0"><strong>Level:</strong> {user.Level}</p>
                                    <p className="mb-0"><strong>Hours Played:</strong> {user.HoursPlayed}</p>
                                    <p className="mb-0"><strong>Phone Number:</strong> {user.PhoneNumber}</p>
                                    <p className="mb-0"><strong>Warn Count:</strong> {user.WarnCount}</p>
                                    <p className="mb-0"><strong>Faction Warn Count:</strong> {user.FactionWarnCount}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}