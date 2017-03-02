import React, {Component} from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
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
