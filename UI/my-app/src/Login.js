import React, { Component } from 'react';
import { variables } from './Variables';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            UserName: "",
            Password: "",
            errorMessage: "",
            signupUserName: "",
            signupPassword: "",
            signupPhoto: null,
            signupErrorMessage: ""
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (e) => {
        this.setState({ signupPhoto: e.target.files[0] });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(variables.API_URL + 'user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: this.state.UserName,
                Password: this.state.Password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to profile or home page
            } else {
                this.setState({ errorMessage: data.message });
            }
        });
    }

    handleSignupSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('UserName', this.state.signupUserName);
        formData.append('Password', this.state.signupPassword);
        formData.append('ProfilePicture', this.state.signupPhoto);

        fetch(variables.API_URL + 'users', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Handle successful signup (e.g., close modal and show success message)
            } else {
                this.setState({ signupErrorMessage: data.message });
            }
        });
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4">
                    <h3>Login</h3>
                    {this.state.errorMessage && <p className="text-danger">{this.state.errorMessage}</p>}
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
                                    {this.state.signupErrorMessage && <p className="text-danger">{this.state.signupErrorMessage}</p>}
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
                                            <label className="form-label">Profile Picture</label>
                                            <input type="file" className="form-control" name="signupPhoto" onChange={this.handleFileChange} required />
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
