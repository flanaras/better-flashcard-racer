import React, {Component} from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: '',
            newPassw: '',
            reNewPassw: '',
            newRole: '',
            newUserMsg: '',
            newPassError: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    componentWillMount() {
        let defNewRole;
        if (this.props.userRole === 'superadmin')
            defNewRole = 'admin';
        else if (this.props.userRole === 'admin')
            defNewRole = 'teacher';
        this.setState({newRole: defNewRole});
    }

    async apiCall(endpoint, newUser, newPassw, newRole) {
        const url = `${config.mock_api_url}/${endpoint}`;
        const newUserAck = await LoadJson(url, 'POST', {newUser, newPassw, newRole});
        if (typeof(newUserAck.ok) !== 'undefined' && newUserAck.ok === 'userCreated') {
            this.setState({newUserMsg: 'New user created successfully!'});
        } else {
            this.setState({newUserMsg: 'New user could not be created. Try again!'});
        }
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value, newUserMsg: '', newPassError: ''});
    }

    onCreateUser(e) {
        e.preventDefault();
        if(this.state.newPassw!==this.state.reNewPassw)
            this.setState({newPassError: 'Passwords does not match!'});
        else
            this.apiCall('users', this.state.newUser, this.state.newPassw, this.state.newRole);
    }

    render() {
        return (
            this.props.auth?
                <div>
                    {
                        <h1>{this.props.username}, welcome!</h1>
                    }
                    <form onSubmit={this.onCreateUser} >
                        <select name="newRole" value={this.state.newRole} onChange={this.handleChange}>
                            {this.props.userRole === 'superadmin'?<option value="admin">Admin</option>:''}
                            {(this.props.userRole === 'superadmin'||this.props.userRole === 'admin')?<option value="teacher">Teacher</option>:''}
                            {this.props.userRole !== 'student'?<option value="student">Student</option>:''}
                        </select>
                        <input type="text" name="newUser" placeholder="Nickname" value={this.state.newUser} onInput={this.handleChange} />
                        <input type="password" ref="newUser" name="newPassw" placeholder="Password" value={this.state.newPassw} onInput={this.handleChange} />
                        <input type="password" name="reNewPassw" placeholder="Repeat Password" value={this.state.reNewPassw} onInput={this.handleChange}/>
                        <input type="submit" value="Create user"/>
                        <p>{this.state.newUserMsg}</p>
                        <p>{this.state.newPassError}</p>
                    </form>
                </div>
                :''
        )
    }
}


