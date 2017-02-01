import React from 'react';
import ReactDOM from 'react-dom';
import SelectMode from './SelectMode'
import DeckConfig from './DeckConfig'
import MotherOfDragons from './MotherOfDragons'
import { FlashcardPractice } from './Flashcard'
import { Router, Route, browserHistory, hashHistory} from 'react-router'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route component={MotherOfDragons}>
            <Route path="/" component={SelectMode} />
            <Route path="deckconfig" component={DeckConfig} />
            <Route path="playgame" component={FlashcardPractice} />
        </Route>
    </Router>
), document.getElementById('root'));
