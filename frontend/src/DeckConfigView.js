import React, { Component } from 'react'
import { PageHeader } from 'react-bootstrap';
import DeckConfig from './DeckConfig'

export default class DeckConfigView extends Component {
    render() {
        return (
            <div>
                <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Game Configuration</small></PageHeader>
                <DeckConfig onSubmitGameConfig={this.props.onSubmitGameConfig}/>
            </div>
        )
    }
}
