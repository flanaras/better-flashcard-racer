import React, { Component } from 'react'
import { PageHeader } from 'react-bootstrap';
import DeckConfig from './DeckConfig'
import UserSettings from './UserSettings';

export default class DeckConfigView extends Component {

    componentWillMount() {
        this.props.loadUserInfo();
    }

    render() {
        return (
            <div>
                <PageHeader style={{textAlign: "center", marginBottom: 0}}>
                    Flashcard Racer <small>{this.props.route.name}</small>
                </PageHeader>
                <UserSettings routes={this.props.routes} userInfo={this.props.userInfo} logout={this.props.logout}/>
                <DeckConfig onSubmitGameConfig={this.props.onSubmitGameConfig}/>
            </div>
        )
    }
}
