import React, {Component} from 'react'
import {Link} from "react-router";

export class SelectMode extends Component {
    render() {
        return (
            <div>
                <h1>Select mode:</h1>
                <form>
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/>
                    <input type="submit" value="Log in"/>
                </form>
                <Link to="deckconfig" >Try practice mode</Link>
            </div>
        )
    }
}

export class DeckConfig extends Component {
    render() {
        return (
            <div>
                <h1>DECK CONFIG!</h1>
            </div>
        )
    }
}
