/**
 * Created by Fabian Schöndorff on 13.02.17.
 */
import React, {Component} from 'react'
import { PageHeader, Grid, Row, Col, Table } from 'react-bootstrap';
import config from '../config.json';
import LoadJson from './services/LoadJson';

export default class SelectMode extends Component {

  constructor() {
    super();

    this.state = { users : [] };

    this.apiCall = this.apiCall.bind(this);
  }

  componentDidMount() {
    this.apiCall('users');
  }

  async apiCall(endpoint) {
    const url = `${config.mock_api_url}/${endpoint}`;
    const users = await LoadJson(url);
    this.setState({users})
  }

  render() {
    const userList = this.state.users.map((user) =>
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.auth_level}</td>
      </tr>
    );
    return (
      <div>
        <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Game Configuration</small></PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {userList}
                </tbody>
              </Table>
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
