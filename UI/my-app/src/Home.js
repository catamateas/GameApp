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
                    <img src="https://bluepanel.bugged.ro/storage/online_small.jpeg?dontCache=1945" alt="Server Map" className="img-fluid" />
                </div>
                <div className="col-md-4">
                    <h3>Friends List</h3>
                    <ul className="list-group">
                        {users.map(user => (
                            <li key={user.UserId} className="list-group-item">
                                <img src={variables.PHOTO_URL + user.ProfilePicture} alt="Profile" width="30" height="30" className="rounded-circle" />
                                {user.UserName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
