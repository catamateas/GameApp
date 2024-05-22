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
                FactionName: "",
                FactionRank: 0,
                ClanName: "",
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
            <div>
                <h3>Profile</h3>
                <img src={variables.PHOTO_URL + user.ProfilePicture} alt="Profile" width="100" height="100" />
                <p>Name: {user.UserName}</p>
                <p>Level: {user.Level}</p>
                <p>Hours Played: {user.HoursPlayed}</p>
                <p>Phone Number: {user.PhoneNumber}</p>
                <p>Warnings: {user.WarnCount}/3</p>
                <p>Faction Warnings: {user.FactionWarnCount}/3</p>
                <p>Faction: {user.FactionName} (Rank: {user.FactionRank})</p>
                <p>Clan: {user.ClanName} (Rank: {user.ClanRank})</p>
            </div>
        );
    }
}
