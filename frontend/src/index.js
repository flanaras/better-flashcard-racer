import React from 'react';
import ReactDOM from 'react-dom';
import {FlashcardPractice} from './components';

let Hello = () => <span>Hi</span>

var flashcards = [
  {
    "id":141,
    "problem":"1+1",
    "solution":2
  },
  {
    "id":2,
    "problem":"4+1",
    "solution":5
  }
];

ReactDOM.render(<FlashcardPractice flashcards={flashcards} />, document.querySelector('#root'));