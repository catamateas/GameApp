import React, { Component } from 'react';
import { variables } from './Variables';

export class Clans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clans: [],
            modalTitle: "",
            ClanId: 0,
            ClanName: "",
            MemberCount: 0
        };
    }

    refreshList() {
        fetch(variables.API_URL + 'clans')
            .then(response => response.json())
            .then(data => {
                this.setState({ clans: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeClanName = (e) => {
        this.setState({ ClanName: e.target.value });
    }

    changeMemberCount = (e) => {
        this.setState({ MemberCount: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Clan",
            ClanId: 0,
            ClanName: "",
            MemberCount: 0
        });
    }

    editClick(clan) {
        this.setState({
            modalTitle: "Edit Clan",
            ClanId: clan.ClanId,
            ClanName: clan.ClanName,
            MemberCount: clan.MemberCount
        });
    }

    createClick() {
        fetch(variables.API_URL + 'clans', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ClanName: this.state.ClanName,
                MemberCount: this.state.MemberCount
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'clans', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ClanId: this.state.ClanId,
                ClanName: this.state.ClanName,
                MemberCount: this.state.MemberCount
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'clans/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            clans,
            modalTitle,
            ClanId,
            ClanName,
            MemberCount
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Clan
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ClanId
                            </th>
                            <th>
                                ClanName
                            </th>
                            <th>
                                MemberCount
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clans.map(clan =>
                            <tr key={clan.ClanId}>
                                <td>{clan.ClanId}</td>
                                <td>{clan.ClanName}</td>
                                <td>{clan.MemberCount}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(clan)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5.5 0 0 0-0.5.5z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(clan.ClanId)}>
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
                                    <span className="input-group-text">ClanName</span>
                                    <input type="text" className="form-control"
                                        value={ClanName}
                                        onChange={this.changeClanName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">MemberCount</span>
                                    <input type="number" className="form-control"
                                        value={MemberCount}
                                        onChange={this.changeMemberCount} />
                                </div>

                                {ClanId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {ClanId != 0 ?
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
