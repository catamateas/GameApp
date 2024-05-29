import React, { Component } from 'react';
import { variables } from './Variables';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            faction: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.userId) {
            fetch(`${variables.API_URL}user/${user.userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.setState({ user: data });
                    if (data.factionId) {
                        return fetch(`${variables.API_URL}faction/${data.factionId}`);
                    } else {
                        this.setState({ loading: false });
                    }
                })
                .then(response => {
                    if (response && !response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response ? response.json() : null;
                })
                .then(factionData => {
                    if (factionData) {
                        this.setState({ faction: factionData, loading: false });
                    }
                })
                .catch(error => {
                    this.setState({ error: error.message, loading: false });
                });
        } else {
            this.setState({ error: 'User not found', loading: false });
        }
    }

    render() {
        const { user, faction, loading, error } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <div className="container">
                <h3>Profile</h3>
                <div className="card p-4">
                    {user && (
                        <>
                            <img src={variables.PHOTO_URL + user.profilePicture} alt="Profile" width="100" height="100" className="rounded-circle mx-auto d-block" />
                            <p className="text-center mt-3"><strong>{user.userName}</strong></p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Level:</strong> {user.level}</p>
                            <p><strong>Faction:</strong> {faction ? faction.factionName : 'None'}</p>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
