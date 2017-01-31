import React from 'react';
import ReactDOM from 'react-dom';
import {Flashcard} from './components';

let Hello = () => <span>Hi</span>

ReactDOM.render(<Flashcard flashcard={{problem : '1 + 1', solution : 2}} />, document.querySelector('#root'));