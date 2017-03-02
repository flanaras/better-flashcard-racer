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
import UserSettings from './UserSettings';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MotherOfDragons}>
            <Route path="/" component={SelectMode} />
            <Route path="deckconfig" component={DeckConfig} />
            <Route path="playgame" component={FlashcardPractice} />
            <Route path="solutions" component={Solutions} />
            <Route path="users" component={UserList} />
            <Route path="createuser" component={CreateUser} />
            <Route path="edituser" component={EditUser} />
            <Route path="dashboard" component={Dashboard} />
            <Route path="usersettings" component={UserSettings} />
        </Route>
    </Router>
), document.getElementById('root'));

