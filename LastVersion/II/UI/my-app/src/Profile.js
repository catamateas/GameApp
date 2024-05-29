import React, { Component } from 'react';
import { variables } from './Variables';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.currentUser
        };
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
                    <p><strong>Faction:</strong> {user.Faction ? user.Faction.FactionName : 'None'} (Rank: {user.FactionRank})</p>
                    <p><strong>Clan:</strong> {user.Clan ? user.Clan.ClanName : 'None'} (Rank: {user.ClanRank})</p>
                </div>
            </div>
        );
    }
}
