import React, { Component } from 'react';
import { variables } from './Variables';

export class Factions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            factions: [],
            modalTitle: "",
            factionName: "",
            factionId: 0,
            memberCount: 0,
            RequiredLevel: 1
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'factions')
            .then(response => response.json())
            .then(data => {
                this.setState({ factions: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changefactionName = (e) => {
        this.setState({ factionName: e.target.value });
    }

    changememberCount = (e) => {
        this.setState({ memberCount: e.target.value });
    }

    changeRequiredLevel = (e) => {
        this.setState({ RequiredLevel: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Faction",
            factionId: 0,
            factionName: "",
            memberCount: 0,
            RequiredLevel: 1
        });
    }

    editClick(fac) {
        this.setState({
            modalTitle: "Edit Faction",
            factionId: fac.factionId,
            factionName: fac.factionName,
            memberCount: fac.memberCount,
            RequiredLevel: fac.requiredLevel
        });
    }

    createClick() {
        fetch(variables.API_URL + 'factions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                factionName: this.state.factionName,
                memberCount: this.state.memberCount,
                RequiredLevel: this.state.RequiredLevel
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result.message || "Faction created successfully!");
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'factions/' + this.state.factionId, { // Corrected URL
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                factionId: this.state.factionId,
                factionName: this.state.factionName,
                memberCount: this.state.memberCount,
                RequiredLevel: this.state.RequiredLevel
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                // Handle empty response
                if (res.status === 204) {
                    return;
                }
                return res.json();
            })
            .then((result) => {
                alert(result ? (result.message || "Faction updated successfully!") : "Faction updated successfully!");
                this.refreshList();
            })
            .catch((error) => {
                console.error('There was a problem with the update request:', error);
                alert('Failed: ' + error.message);
            });
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'factions/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Handle empty response
                    if (res.status === 204) {
                        return;
                    }
                    return res.json();
                })
                .then((result) => {
                    alert(result ? (result.message || "Faction deleted successfully!") : "Faction deleted successfully!");
                    this.refreshList();
                })
                .catch((error) => {
                    console.error('There was a problem with the delete request:', error);
                    alert('Failed: ' + error.message);
                });
        }
    }


    render() {
        const {
            factions,
            modalTitle,
            factionId,
            factionName,
            memberCount,
            RequiredLevel
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Faction
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                factionId
                            </th>
                            <th>
                                factionName
                            </th>
                            <th>
                                memberCount
                            </th>
                            <th>
                                RequiredLevel
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {factions.map(fac =>
                            <tr key={fac.factionId}>
                                <td>{fac.factionId}</td>
                                <td>{fac.factionName}</td>
                                <td>{fac.memberCount}</td>
                                <td>{fac.requiredLevel}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(fac)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5.5 0 0 0-0.5.5z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(fac.factionId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5.5 0 0 0-0.5.5zM4.5.5v1a.5.5 0 1 1-.5-.5zM6.5 0v1h4v-1a.5.5 0 0 1-.5-.5h-3a.5.5 0 0 1-.5.5M4.5.5v1a.5.5 0 0 1-.998.06M4.5-.528a.5.5 0 0 1-.528-.47l-.5.5a.5.5 0 0 1 .998.058M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">factionName</span>
                                    <input type="text" className="form-control"
                                        value={factionName}
                                        onChange={this.changefactionName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">memberCount</span>
                                    <input type="number" className="form-control"
                                        value={memberCount}
                                        onChange={this.changememberCount} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">RequiredLevel</span>
                                    <input type="number" className="form-control"
                                        value={RequiredLevel}
                                        onChange={this.changeRequiredLevel} />
                                </div>

                                {factionId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {factionId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
