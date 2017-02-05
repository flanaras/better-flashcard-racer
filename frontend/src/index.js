import React from 'react';
import ReactDOM from 'react-dom';
import SelectMode from './SelectMode'
import DeckConfig from './DeckConfig'
import MotherOfDragons from './MotherOfDragons'
import { FlashcardPractice } from './Flashcard'
import Solutions from './Solutions'
import { Router, Route, browserHistory, hashHistory} from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MotherOfDragons}>
            <Route path="/" component={SelectMode} />
            <Route path="deckconfig" component={DeckConfig} />
            <Route path="playgame" component={FlashcardPractice} />
            <Route path="solutions" component={Solutions} />
        </Route>
    </Router>
), document.getElementById('root'));
