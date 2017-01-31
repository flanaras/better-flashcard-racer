import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'
import { Flashcard, FlashcardPractice } from './../src/components'

describe('Flashcards', () => {
  it('should display the problem statement and an input field to enter the solution', () => {
    const flashcard = { problem : '1 + 1', solution : 2};

    const wrapper = shallow(<Flashcard flashcard={flashcard} />);
    expect(wrapper.containsAllMatchingElements([
      <p>1 + 1</p>,
      <input type="text" placeholder="Your solution" />
    ])).to.equal(true);
  });

  it('should check the user\'s solution', () => {
    const flashcard = { problem : '1 + 1', solution : 2};

    const wrapper = shallow(<Flashcard flashcard={flashcard} />);
    expect(wrapper.instance().isSolutionCorrect("2")).to.be.true;
    expect(wrapper.instance().isSolutionCorrect("3")).to.be.false;
    expect(wrapper.instance().isSolutionCorrect("-1")).to.be.false;
  })
});

describe('FlashcardPractice', () => {

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

  it('should display a flashcard and a "Next Question" button', () => {
    const wrapper = shallow(<FlashcardPractice flashcards={flashcards}/>);
    expect(wrapper.containsAllMatchingElements([
      <Flashcard />,
      <button>Next Question</button>
    ])).to.be.true;
  });

  it('should increase the count of answered questions upon button click', () => {
    const wrapper = shallow(<FlashcardPractice flashcards={flashcards}/>);

    expect(wrapper.state('questionsAnswered')).to.equal(0);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('questionsAnswered')).to.equal(1);
  });

  it('should display the next question after clicking the "Next Question" button', () => {
    const wrapper = mount(<FlashcardPractice flashcards={flashcards} />);

    expect(wrapper.find('p').text()).to.equal("1+1");
    wrapper.find('button').simulate('click');
    expect(wrapper.find('p').text()).to.equal("4+1");
  });

  it('should update the "currentAnswer" state when the answer is changed in the flashcard', () => {
    const wrapper = mount(<FlashcardPractice flashcards={flashcards} />);

    wrapper.find('input').simulate('change', { target : { value : "2" }});
    expect(wrapper.state('currentAnswer')).to.equal('2');
  });

  it('should save an answer on clicking "Next Question"', () => {
    const wrapper = mount(<FlashcardPractice flashcards={flashcards} />);

    wrapper.find('input').simulate('change', { target : { value : "2" }});
    wrapper.find('button').simulate('click');
    expect(wrapper.state('answers')[0].answer).to.equal("2");
  });
});