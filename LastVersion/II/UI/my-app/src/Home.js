import React, { Component } from 'react';
import { variables } from './Variables';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            loading: false,
            error: null
        };
    }

    refreshList() {
        this.setState({ loading: true, error: null });
        fetch(variables.API_URL + 'user')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ user: data, loading: false });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                this.setState({ error: error.message, loading: false });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const { user, loading, error } = this.state;

        return (
            <div className="row">
                <div className="col-md-8">
                    <h3>Server Map</h3>
                    <img src="https://bluepanel.bugged.ro/storage/online_small.jpeg?dontCache=2014" alt="Server Map" className="img-fluid" />
                </div>
                <div className="col-md-4">
                    <h3>Friends List</h3>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    <ul className="list-group">
                        {user.map(user => (
                            <li key={user.userId} className="list-group-item">
                                <div className="d-inline-block ml-2">
                                    <p className="mb-0"><strong>userName:</strong> {user.userName}</p>
                                    <p className="mb-0"><strong>Email:</strong> {user.email}</p>
                                    <p className="mb-0"><strong>Level:</strong> {user.level}</p>
                                    <p className="mb-0"><strong>Faction:</strong> {user.faction ? user.faction.factionName : 'None'}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
