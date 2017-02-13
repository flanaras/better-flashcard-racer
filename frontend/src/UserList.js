/**
 * Created by Fabian Schöndorff on 13.02.17.
 */
import React, {Component} from 'react'
import { PageHeader, Grid, Row, Col, Table } from 'react-bootstrap';

export default class SelectMode extends Component {

  render() {
    const users = this.props.users;
    const userList = users.map((user) =>
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.auth_role}</td>
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
