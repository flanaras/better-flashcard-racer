import React from 'react';
import ReactDOM from 'react-dom';
import SelectMode from './SelectMode'
import DeckConfigView from './DeckConfigView'
import MotherOfDragons from './MotherOfDragons'
import FlashcardPractice  from './FlashcardPractice'
import Solutions from './Solutions'
import { Router, Route, browserHistory } from 'react-router'
import CreateRoom from './CreateRoom'
import RoomList from './RoomList'
import Lobby from './Lobby';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MotherOfDragons}>
            <Route path="/" component={SelectMode} />
            <Route path="deckconfig" component={DeckConfigView} />
            <Route path="playgame" component={FlashcardPractice} />
            <Route path="solutions" component={Solutions} />
            <Route path="createroom" component={CreateRoom} />
            <Route path="roomlist" component={RoomList} />
            <Route path="room" component={Lobby} />
        </Route>
    </Router>
), document.getElementById('root'));
