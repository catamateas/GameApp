import React, { Component } from 'react';
import { variables } from './Variables';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                UserName: "",
                ProfilePicture: "",
                Level: 0,
                HoursPlayed: 0,
                PhoneNumber: "",
                WarnCount: 0,
                FactionWarnCount: 0,
                factionName: "",
                FactionRank: 0,
                clanName: "",
                ClanRank: 0
            }
        };
    }

    componentDidMount() {
        fetch(variables.API_URL + 'user/profile', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ user: data });
        });
    }

    render() {
        const { user } = this.state;

        return (
            <div className="container">
                <h3>Profile</h3>
                <div className="card p-4">
                    <img src={variables.PHOTO_URL + user.ProfilePicture} alt="Profile" width="100" height="100" className="rounded-circle mx-auto d-block" />
                    <p className="text-center mt-3"><strong>{user.UserName}</strong></p>
                    <p><strong>Level:</strong> {user.Level}</p>
                    <p><strong>Hours Played:</strong> {user.HoursPlayed}</p>
                    <p><strong>Phone Number:</strong> {user.PhoneNumber}</p>
                    <p><strong>Warnings:</strong> {user.WarnCount}/3</p>
                    <p><strong>Faction Warnings:</strong> {user.FactionWarnCount}/3</p>
                    <p><strong>Faction:</strong> {user.factionName} (Rank: {user.FactionRank})</p>
                    <p><strong>Clan:</strong> {user.clanName} (Rank: {user.ClanRank})</p>
                </div>
            </div>
        );
    }
}
