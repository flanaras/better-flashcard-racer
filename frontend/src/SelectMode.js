import React, {Component} from 'react'
import {Link} from "react-router";

export default class SelectMode extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to the (better) flashcard racer!</h1>
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


