import React, {Component} from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
                newUser: '',
                newPassw: '',
                newRole: 'admin' // should it be string also?
        };
        this.handleChange = this.handleChange.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    async apiCall(endpoint, newUser, newPassw, newRole) {
        const url = `${config.mock_api_url}/${endpoint}`;
        const newUserConf = await LoadJson(url, 'POST', {newUser, newPassw, newRole});
        console.log(newUserConf);
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
        // TODO: Add password matching validation
    }

    onCreateUser(e) {
        e.preventDefault();
        this.apiCall('users', this.state.newUser, this.state.newPassw, this.state.newRole);
    }

    render() {
        return (
            <div>
                {
                    <h1>{this.props.auth?this.props.username+', w':'W'}elcome!</h1>
                }
                <form onSubmit={this.onCreateUser} >
                    <select name="newRole" value={this.state.newRole} onChange={this.handleChange}>
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                    <input type="text" name="newUser" placeholder="Username" value={this.state.newUser} onChange={this.handleChange} />
                    <input type="password" name="newPassw" placeholder="Password" value={this.state.newPassw} onChange={this.handleChange} />
                    <input type="password" name="reNewPassw" placeholder="Repeat Password"/>
                    <input type="submit" value="Create user"/>
                </form>
            </div>
        )
    }
}


