import React, {Component} from 'react'
import {Link} from "react-router";

export default class DeckConfig extends Component {

    render() {
        return (
            <div>
                {
                    <h1>{this.props.auth?this.props.username+', w':'W'}elcome!</h1>
                }

                <h1>Deck configuration</h1>
                <select onChange={event => this.props.onDeckChange(event.target.value)}>
                    {
                        this.props.decks.map((deck, index) => (
                                <option key={index} value={deck.id}>{deck.desc}</option>
                            )
                        )
                    }
                </select>
                <div>
                    <Link to="playgame" >Play game</Link>
                </div>
                <div>
                    {
                        this.props.auth?<Link to="createuser">Create new user</Link>:''
                    }
                </div>

            </div>
        )
    }
}