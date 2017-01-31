import React from 'react';
import ReactDOM from 'react-dom';
import SelectMode from './SelectMode'
import DeckConfig from './DeckConfig'
import MotherOfDragons from './MotherOfDragons'
import { Router, Route, browserHistory} from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MotherOfDragons}>
            <Route path="/" component={SelectMode} />
            <Route path="deckconfig" component={DeckConfig} />
        </Route>
    </Router>
), document.getElementById('root'));
