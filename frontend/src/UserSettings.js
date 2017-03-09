import React, {Component} from 'react';
import config from './../config.json';
import LoadJson from "./services/LoadJson";
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onLogout = this.onLogout.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    async apiCall(endpoint, userid) {
        const url = `${config.mock_api_url}/${endpoint}/${userid}`;
        const logoutAck = await LoadJson(url, 'POST');
        if (logoutAck === 'ok') {
            this.props.logout();
        }
    }

    onLogout() {
        this.apiCall('logout', this.props.userid);
    }

    render() {
        return (
            this.props.auth?
                <div>
                    <DropdownButton bsStyle={'info'} title={this.props.username} >
                        <MenuItem eventKey="1" onClick={this.onLogout}>Sign out</MenuItem>
                    </DropdownButton>
                </div>
            :<div/>
        )
    }
}
