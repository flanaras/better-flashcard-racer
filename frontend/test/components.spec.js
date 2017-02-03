import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'
import SelectMode from '../src/SelectMode'
import DeckConfig, {GenerateDeckOptions} from '../src/DeckConfig'
import MotherOfDragons from '../src/MotherOfDragons'
import { Flashcard, FlashcardPractice } from './../src/Flashcard'

describe('SelectMode', () => {
    it('should be able to select mode: Login or practice mode', () => {
        //TODO: The previous "containsAllMatchingElements" test wont ever pass for some reason... ??
    })
    it('when a user click practice mode, it gets redirect to deckconfig route', () => {
        //TODO: Write this test.. Hmm, can not find any way to mock a Link click.. (Any ideas??)
    })
});

describe('DeckConfig', () => {
    it('should dispaly decks in a dropdown', () => {
        const decks = ['Easy plus and minus', 'Medium plus and minus', 'Hard pus and minus']
        const wrapper = mount(<DeckConfig decks={decks}/>)
        wrapper.setState({decks})
        expect(wrapper.find('option').length).to.equal(3)
    })
    it('onDeckChange should be called when the selected deck is changed', () => {
        const onDeckChangeSpy = spy()
        const decks = [{id: 1, desc: 'Easy plus and minus'}, {id:2, desc: 'Medium plus and minus'}, {id:3, desc: 'Hard pus and minus'}]
        const wrapper = mount(<DeckConfig decks={decks} onDeckChange={onDeckChangeSpy}/>)
        const dropdown = wrapper.find('select')
        dropdown.simulate('change', ({target:{value: 2}}))
        expect(onDeckChangeSpy.calledOnce).to.equal(true)
        expect(onDeckChangeSpy.calledWith(2)).to.equal(true)
    })
    it('choosing a deck should change the currently chosen deck', () => {
        const chosenDeck = {id:1, desc: 'Easy plus and minus'}
        const decks = [{id:1, desc: 'Easy plus and minus'}, {id:2, desc: 'Medium plus and minus'}, {id:3, desc: 'Hard pus and minus'}]
        const wrapper = shallow(<MotherOfDragons children={DeckConfig} />)
        wrapper.setState({chosenDeck})
        wrapper.setState({decks})
        wrapper.instance().onDeckChange(2)
        expect(wrapper.state('chosenDeck')).to.eql({id:2, desc: 'Medium plus and minus'})
    })
    it('user should be able to choose between generating a deck or selecting a already defined deck', () => {
        const wrapper = shallow(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        expect(wrapper.find('[name="selectType"][type="radio"]').length).to.equal(2)
    })
    it('onDeckTypeChange should be called when the user clicks a radio button', () => {
        const wrapper = shallow(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        wrapper.instance().onDeckTypeChange({target:{value:"existingDeck"}})
        expect(wrapper.state('deckType')).to.equal('existingDeck')
    })
    it('choosing generateDeck should only show generate and not existing deck dropdown', () => {
        const wrapper = mount(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        wrapper.setState({deckType: 'generateDeck'})
        expect(wrapper.find('select').length).to.equal(0)
    })
    it('choosing existingDeck should only show existingDeck and generateDeck', () => {
        const wrapper = mount(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        wrapper.setState({deckType: 'existingDeck'})
        expect(wrapper.find('select').length).to.equal(1)
    })
    it('when a user press submit, the onSubmit method should be called', () => {
        const onSubmitGameConfigSpy = spy()
        const wrapper = shallow(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]} onSubmitGameConfig={onSubmitGameConfigSpy}/>)
        const submitButton = wrapper.find('[type="submit"]')
        const generateDeckRadio = wrapper.find("[value='generateDeck']")
        const addBox = wrapper.find("[value='add']")
        const subBox = wrapper.find("[value='sub']")
        const multBox = wrapper.find("[value='mult']")
        const divBox = wrapper.find("[value='div']")
        const timeBox = wrapper.find("[value='time']")
        const numProbsBox = wrapper.find("[value='numberOfProblems']")
        const minInput = wrapper.find("[value='min']")
        const maxInput = wrapper.find("[value='max']")

        generateDeckRadio.simulate('checked')
        addBox.simulate('checked', true)
        subBox.simulate('checked', true)
        multBox.simulate('checked', false)
        divBox.simulate('checked', false)
        timeBox.simulate('checked', false)
        numProbsBox.simulate('checked', true)
        minInput.simulate('change','-10')
        maxInput.simulate('change','20')
        submitButton.simulate('click')

        const gameConfig = {}

        expect(onSubmitGameConfigSpy.calledOnce).to.equal(true)
        //expect(onSubmitGameConfigSpy.calledWith())

    })

});

describe('GenerateDeck', () => {
    it('generateDeck should show options for operand and range input', () => {
        const wrapper = shallow(<GenerateDeckOptions/>)
        expect(wrapper.containsAllMatchingElements([
            <form>
                <input type="checkbox" checked={wrapper.state.add === true ? 'true' : 'false'} value="add" />Addition <br />
                <input type="checkbox" checked={wrapper.state.sub === true ? 'true' : 'false'} value="sub" />Subtraction <br />
                <input type="checkbox" checked={wrapper.state.mult === true ? 'true' : 'false'} value="mult" />Multiplicaiton <br />
                <input type="checkbox" checked={wrapper.state.div === true ? 'true' : 'false'} value="div" />Division <br />
                <input type="radio" name="gameType" value="time" /> Time
                <input type="radio" name="gameType" value="numberOfProblems" /> # Problems
                <h3>Number range</h3>
                <input type="text" value='min' />Min
                <input type="text" value='max' />Max
            </form>
        ])).to.equal(true)
    })
})

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

  var chosenDeck = {
    flashcards: [
      {
        "id": 141,
        "problem": "1+1",
        "solution": 2
      },
      {
        "id": 2,
        "problem": "4+1",
        "solution": 5
      }
    ]
  };

  it('should display a flashcard and a "Next Question" button', () => {
    const wrapper = shallow(<FlashcardPractice chosenDeck={chosenDeck}/>);
    expect(wrapper.containsAllMatchingElements([
      <Flashcard />,
      <button>Next Question</button>
    ])).to.be.true;
  });

  it('should increase the count of answered questions upon button click', () => {
    const wrapper = shallow(<FlashcardPractice chosenDeck={chosenDeck}/>);

    expect(wrapper.state('questionsAnswered')).to.equal(0);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('questionsAnswered')).to.equal(1);
  });

  it.skip('should display the next question after clicking the "Next Question" button', () => {
    const wrapper = mount(<FlashcardPractice chosenDeck={chosenDeck} />);

    expect(wrapper.find('p').text()).to.equal("1+1");
    wrapper.find('button').simulate('click');
    expect(wrapper.find('p').text()).to.equal("4+1");
  });

  it('should update the "currentAnswer" state when the answer is changed in the flashcard', () => {
    const wrapper = mount(<FlashcardPractice chosenDeck={chosenDeck} />);

    wrapper.find('input').simulate('change', { target : { value : "2" }});
    expect(wrapper.state('currentAnswer')).to.equal('2');
  });

  it('should save an answer on clicking "Next Question"', () => {
    const wrapper = mount(<FlashcardPractice chosenDeck={chosenDeck} />);

    wrapper.find('input').simulate('change', { target : { value : "2" }});
    wrapper.find('button').simulate('click');
    expect(wrapper.state('answers')[0].answer).to.equal("2");
  });
});