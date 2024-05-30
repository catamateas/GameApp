import React, { Component } from 'react';
import { variables } from './Variables';
import { Navigate } from 'react-router-dom';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            UserName: "",
            Password: "",
            errormessage: "",
            signupUserName: "",
            signupPassword: "",
            signupEmail: "",
            signupLevel: 1,
            signupFactionId: 0,
            signupErrormessage: "",
            redirectToHome: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch(variables.API_URL + 'authentication/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: this.state.UserName,
                Password: this.state.Password
            })
        })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Invalid username or password.');
            }
            if (response.status !== 200) {
                throw new Error('An error occurred. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            console.log('User saved to localStorage:', data); //cons log
            this.props.onLogin(data);
            this.setState({ redirectToHome: true });
        })
        .catch(error => {
            this.setState({ errormessage: error.message });
        });
    }
    

    handleSignupSubmit(e) {
        e.preventDefault();
        fetch(variables.API_URL + 'authentication/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: this.state.signupUserName,
                Password: this.state.signupPassword,
                Email: this.state.signupEmail,
                Level: this.state.signupLevel,
                FactionId: this.state.signupFactionId
            })
        })
        .then(response => {
            if (response.status !== 200) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Your level is too low to join this faction.');
                });
            }
            return response.json();
        })
        .then(data => {
            this.setState({ signupErrormessage: 'User registered successfully. You can now log in.' });
        })
        .catch(error => {
            this.setState({ signupErrormessage: error.message });
        });
    }

    render() {
        if (this.state.redirectToHome) {
            return <Navigate to="/home" />;
        }

        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4">
                    <h3>Login</h3>
                    {this.state.errormessage && <p className="text-danger">{this.state.errormessage}</p>}
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" name="UserName" value={this.state.UserName} onChange={this.handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="Password" value={this.state.Password} onChange={this.handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <button type="button" className="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#signupModal">
                        Sign Up
                    </button>

                    {/* Signup Modal */}
                    <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="signupModalLabel">Sign Up</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                {this.state.signupErrormessage && <p className={this.state.signupErrormessage === 'User registered successfully. You can now log in.' ? 'success-message' : 'text-danger'}>{this.state.signupErrormessage}</p>}
                                    <form onSubmit={this.handleSignupSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control" name="signupUserName" value={this.state.signupUserName} onChange={this.handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control" name="signupPassword" value={this.state.signupPassword} onChange={this.handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" name="signupEmail" value={this.state.signupEmail} onChange={this.handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Level</label>
                                            <input type="number" className="form-control" name="signupLevel" value={this.state.signupLevel} onChange={this.handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Faction ID</label>
                                            <input type="number" className="form-control" name="signupFactionId" value={this.state.signupFactionId} onChange={this.handleChange} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Sign Up</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function getUserIdFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
        try {
            const userObj = JSON.parse(user);
            return userObj.userId; 
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            return null;
        }
    }
    return null;
}

const userId = getUserIdFromLocalStorage();
console.log('User ID:', userId);
