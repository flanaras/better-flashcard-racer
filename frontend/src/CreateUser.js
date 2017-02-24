import React, {Component} from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authLevel: [],
            newUser: '',
            newPassw: '',
            reNewPassw: '',
            newRoleId: 0,
            newUserMsg: '',
            newPassError: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);
        this.apiGetCall = this.apiGetCall.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    componentWillMount() {
        this.apiGetCall('authlevel/'+this.props.userRoleId);
    }

    async apiGetCall(endpoint) {
        const url = `${config.mock_api_url}/${endpoint}`;
        const authLevel = await LoadJson(url);
        this.setState({authLevel});
    }

    async apiCall(endpoint, newUser, newPassw, newRoleId) {
        const url = `${config.mock_api_url}/${endpoint}`;
        const newUserAck = await LoadJson(url, 'POST', {username: newUser, password: newPassw, auth_level: newRoleId});
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
            this.apiCall('users', this.state.newUser, this.state.newPassw, this.state.newRoleId);
    }

    render() {
        return (
            this.props.auth?
                <div>
                    {
                        <h1>{this.props.username}, welcome!</h1>
                    }
                    <form onSubmit={this.onCreateUser} >

                        <select name="newRoleId" onChange={event => this.handleChange(event)}>
                            {
                                this.state.authLevel.map((authLevel, index) => (
                                        <option key={index} value={authLevel.id}>{authLevel.auth}</option>
                                    )
                                )
                            }
                        </select>

                        <input type="text" name="newUser" placeholder="Username" value={this.state.newUser} onChange={this.handleChange} />
                        <input type="password" ref="newUser" name="newPassw" placeholder="Password" value={this.state.newPassw} onChange={this.handleChange} />
                        <input type="password" name="reNewPassw" placeholder="Repeat Password" value={this.state.reNewPassw} onChange={this.handleChange}/>
                        <input type="submit" value="Create user"/>
                        <p>{this.state.newUserMsg}</p>
                        <p>{this.state.newPassError}</p>
                    </form>
                </div>
                :<div/>
        )
    }
}
