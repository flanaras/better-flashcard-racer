/**
 * Created by alekodu on 2017-02-14.
 */
import React, {Component} from 'react'
import {Link} from "react-router";

export default class CreateUser extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to the (better) flashcard racer!</h1>
                <form>
                    <select>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                    <input type="text" name="newuser" placeholder="Username"/>
                    <input type="password" name="newpassw" placeholder="Password"/>
                    <input type="password" name="renewpassw" placeholder="Repeat Password"/>
                    <input type="submit" value="Create user"/>
                </form>
            </div>
        )
    }
}


