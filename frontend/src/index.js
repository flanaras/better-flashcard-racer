import React from 'react';
import ReactDOM from 'react-dom';
import {SelectMode, DeckConfig} from './components'
import { Router, Route, browserHistory} from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={SelectMode} />
        <Route path="deckconfig" component={DeckConfig} />
    </Router>
), document.getElementById('root'));
