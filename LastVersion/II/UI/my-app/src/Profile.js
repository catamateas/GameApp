import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { variables } from './Variables';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            faction: null,
            loading: true,
            error: null,
            newPassword: "",
            showModal: false,
            redirectToLogin: false
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handlePasswordChange(e) {
        this.setState({ newPassword: e.target.value });
    }

    handleSubmit() {
        const { user, newPassword } = this.state;
        if (newPassword.trim() === "") {
            alert("Please enter a new password.");
            return;
        }

        fetch(`${variables.API_URL}user/${user.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...user,
                password: newPassword
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(() => {
            alert('Password changed successfully');
            this.setState({ showModal: false, newPassword: "" });
        })
        .catch(error => {
            alert('Failed to change password: ' + error.message);
        });
    }

    handleChange() {
        this.setState({ showModal: true });
    }

    handleDelete() {
        const { user } = this.state;
        fetch(`${variables.API_URL}user/${user.userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(() => {
            localStorage.removeItem('user');
            alert('Delete completed');
            this.setState({ redirectToLogin: true });
        })
        .catch(error => {
            alert('Failed to delete user: ' + error.message);
        });
    }

    render() {
        const { user, faction, loading, error, showModal, newPassword, redirectToLogin } = this.state;

        if (redirectToLogin) {
            return <Navigate to="/login" />;
        }

        if (loading) {
            return (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            );
        }

        return (
            <div className="container my-5">
                <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                    <div className="card-body text-center">
                        {user && (
                            <>
                                <img src={variables.PHOTO_URL + user.profilePicture} alt="Profile" className="rounded-circle mb-3" style={{ width: '150px', height: '150px' }} />
                                <h3 className="card-title">{user.userName}</h3>
                                <p className="text-muted" style={{ color: '#6c757d' }}>{user.email}</p>
                                <p><strong>Level:</strong> {user.level}</p>
                                <p><strong>Faction:</strong> {faction ? faction.factionName : 'None'}</p>
                                <button className="btn btn-primary mt-3" onClick={this.handleChange}>Change Password</button>
                                <button className="btn btn-danger mt-3 ms-2" onClick={this.handleDelete}>Delete Account</button>
                            </>
                        )}
                    </div>
                </div>

                {/* Password Change Modal */}
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change Password</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => this.setState({ showModal: false })}></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" className="form-control" value={newPassword} onChange={this.handlePasswordChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => this.setState({ showModal: false })}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
