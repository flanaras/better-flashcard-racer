import React from 'react';
import ReactDOM from 'react-dom';
import SelectMode from './SelectMode'
import DeckConfig from './DeckConfig'
import MotherOfDragons from './MotherOfDragons'
import FlashcardPractice  from './FlashcardPractice'
import Solutions from './Solutions'
import UserList from './UserList';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import Dashboard from './Dashboard';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MotherOfDragons}>
            <Route name="Welcome" path="/" component={SelectMode} />
            <Route name="Dashboard" path="dashboard" component={Dashboard} />
            <Route name="User Management" path="users" component={UserList} />
            <Route name="Deck Configuration" path="deckconfig" component={DeckConfig} />
            <Route name="Play Game" path="playgame" component={FlashcardPractice} />
            <Route name="Solutions" path="solutions" component={Solutions} />
            <Route name="Create User" path="createuser" component={CreateUser} />
            <Route name="Edit User" path="edituser" component={EditUser} />
        </Route>
    </Router>
), document.getElementById('root'));

