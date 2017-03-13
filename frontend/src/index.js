import React from 'react';
import ReactDOM from 'react-dom';
import SelectMode from './SelectMode'
import DeckConfigView from './DeckConfigView'
import MotherOfDragons from './MotherOfDragons'
import FlashcardPractice  from './FlashcardPractice'
import Solutions from './Solutions'
import UserList from './UserList';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import Dashboard from './Dashboard';
import { Router, Route, browserHistory } from 'react-router'
import CreateRoom from './CreateRoom'
import RoomList from './RoomList'
import Lobby from './Lobby';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MotherOfDragons}>
            <Route name="Welcome" path="/" component={SelectMode} />
            <Route name="Dashboard" path="dashboard" component={Dashboard} >
                <Route name="User Management" path="users" component={UserList} >
                    <Route name="Create User" path="createuser" component={CreateUser} />
                    <Route name="Edit User" path="edituser" component={EditUser} />
                </Route>
            </Route>
            <Route name="Deck Configuration" path="deckconfig" component={DeckConfigView} />
            <Route name="Play Game" path="playgame" component={FlashcardPractice} />
            <Route name="Solutions" path="solutions" component={Solutions} />
            <Route path="createroom" component={CreateRoom} />
            <Route path="roomlist" component={RoomList} />
            <Route path="lobby" component={Lobby} />
        </Route>
    </Router>
), document.getElementById('root'));

