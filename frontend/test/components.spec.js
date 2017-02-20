import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'
import SelectMode from '../src/SelectMode'
import DeckConfig from '../src/DeckConfig'
import MotherOfDragons from '../src/MotherOfDragons'
import { Flashcard, FlashcardPractice } from './../src/Flashcard'
import UserList from '../src/UserList';
import {Link} from "react-router";

describe('SelectMode', () => {
    it('should render nickname and password input texts, login button and try practice mode link', () => {
        const wrapper = shallow(<SelectMode />);
        expect(wrapper.containsAllMatchingElements([
            <input type="text" name="nickname"/>,
            <input type="password" name="password"/>,
            <p>{''}</p>,
            <input type="submit" value="Log in"/>,
        ])).to.equal(true);
        expect(wrapper.find('Link').length).to.equal(1);
    });
    it('should init without authentication', () => {
        const wrapper = shallow(<SelectMode />);
        expect(wrapper.state('auth')).to.equal(false);
    });
    it('should accept inputs',() => {
        const wrapper = shallow(<SelectMode />);
        const nickname = wrapper.find("[name='nickname']");
        nickname.simulate('change', {target: {value: 'test'}});
        //expect(wrapper.state('nickname')).to.equal('test');

        const password = wrapper.find("[name='password']");
        password.simulate('change', {target: {value: 'some pass'}});
        //expect(wrapper.state('password')).to.equal('some pass');
    });
    it('should enable login to right user',() => {
        const nickname = 'test';
        const password = 'some pass';

        const wrapper = mount(<SelectMode />);
        wrapper.setState({nickname, password});

        const form = wrapper.find('form');
        form.simulate('submit');
        //expect(wrapper.state('auth')).to.equal(true);
        //expect(wrapper.props({username})).to.equal('');
    });
    it('should not enable login to wrong user', () => {
        const nickname = 'test';
        const password = 'some no pass';

        const wrapper = mount(<SelectMode />);
        wrapper.setState({nickname, password});

        const form = wrapper.find('form');
        form.simulate('submit');
        expect(wrapper.state('auth')).to.equal(false);
        //expect(wrapper.state('loginErrorMsg')).to.equal('Wrong nickname and/or password. Try again!');
    });
    it('test mother of dragons call', () => {
        const loginSpy = spy();
        const nickname = 'test';
        const password = 'some pass';
        const wrapper = mount(<SelectMode login={loginSpy} />);
        wrapper.setState({nickname, password});

        const form = wrapper.find('form');
        form.simulate('submit');
        //expect(loginSpy.calledOnce).to.equal(true);
    });
    it('when a user click practice mode, it gets redirect to deckconfig route', () => {
        //TODO: Write this test.. Hmm, can not find any way to mock a Link click.. (Any ideas??)
    });
});

describe('DeckConfig', () => {
    it('should display decks in a dropdown', () => {
        const decks = ['Easy plus and minus', 'Medium plus and minus', 'Hard pus and minus']
        const wrapper = shallow(<DeckConfig decks={decks}/>)
        wrapper.setState({decks})
        expect(wrapper.find('option').length).to.equal(3)
    })
    it('onDeckChange should be called when the selected deck is changed', () => {
        const onDeckChangeSpy = spy()
        const decks = [{id: 1, desc: 'Easy plus and minus'}, {id:2, desc: 'Medium plus and minus'}, {id:3, desc: 'Hard pus and minus'}]
        const wrapper = shallow(<DeckConfig decks={decks} onDeckChange={onDeckChangeSpy}/>)
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
        console.log(wrapper.state.chosenDeck)
        expect(wrapper.state('chosenDeck')).to.eql({id:2, desc: 'Medium plus and minus'})
    })
    it('user should be able to choose between generating a deck or selecting a already defined deck', () => {
        const wrapper = shallow(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        expect(wrapper.find('[name="selectType"][type="radio"]').length).to.equal(2)
    })
    it('onDeckTypeChange should be called when the user clicks a radio button', () => {
        const onDeckTypeChangeSpy = spy()
        const wrapper = mount(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        wrapper.instance().onDeckTypeChange({target:{value:"existingDeck"}})
        //const inputRadioGenerate = wrapper.find('[value="generateDeck"]')
        //console.log(inputRadioGenerate)
        //inputRadioGenerate.simulate('click')
        expect(wrapper.state('showGenerate')).to.equal(true)
        //expect(onDeckTypeChangeSpy.calledWith('generateDeck')).to.equal(true)
    })
    // Radio button, either generate deck or select existing deck
    // Choosing generate, should only show generate and not existing deck dropdown
    // And the other way around
});

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

  it('should display the next question after clicking the "Next Question" button', () => {
    const wrapper = mount(<FlashcardPractice chosenDeck={chosenDeck} />);

    expect(wrapper.find('label').text()).to.equal("1+1");
    wrapper.find('button').simulate('click');
    expect(wrapper.find('label').text()).to.equal("4+1");
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

describe('UserList', () => {

  const users = [{id: 1, name: "Test User", auth_role: "Teacher"}, {id: 2, name : "Another User", auth_role: "Student"}];

  it('should display the correct number of elements in the table', () => {
    const wrapper = shallow(<UserList users={users} />);
    wrapper.setState({users});
    const tableRows = wrapper.find('tr');
    expect(tableRows).to.have.length.of(3);
  });

});

describe('CreateUser', () => {
    it('should render nickname and password input texts, login button and try practice mode link', () => {
        const wrapper = shallow(<SelectMode />);
        expect(wrapper.containsAllMatchingElements([
            <input type="text" name="nickname"/>,
            <input type="password" name="password"/>,
            <p>{''}</p>,
            <input type="submit" value="Log in"/>,
        ])).to.equal(true);
        expect(wrapper.find('Link').length).to.equal(1);
    });
    it('should init without authentication', () => {
        const wrapper = shallow(<SelectMode />);
        expect(wrapper.state('auth')).to.equal(false);
    });
    it('should accept inputs',() => {
        const wrapper = shallow(<SelectMode />);
        const nickname = wrapper.find("[name='nickname']");
        nickname.simulate('change', {target: {value: 'test'}});
        //expect(wrapper.state('nickname')).to.equal('test');

        const password = wrapper.find("[name='password']");
        password.simulate('change', {target: {value: 'some pass'}});
        //expect(wrapper.state('password')).to.equal('some pass');
    });
    it('should enable login to right user',() => {
        const nickname = 'test';
        const password = 'some pass';

        const wrapper = mount(<SelectMode />);
        wrapper.setState({nickname, password});

        const form = wrapper.find('form');
        form.simulate('submit');
        //expect(wrapper.state('auth')).to.equal(true);
        //expect(wrapper.props({username})).to.equal('');
    });
    it('should not enable login to wrong user', () => {
        const nickname = 'test';
        const password = 'some no pass';

        const wrapper = mount(<SelectMode />);
        wrapper.setState({nickname, password});

        const form = wrapper.find('form');
        form.simulate('submit');
        expect(wrapper.state('auth')).to.equal(false);
        //expect(wrapper.state('loginErrorMsg')).to.equal('Wrong nickname and/or password. Try again!');
    });
    it('test mother of dragons call', () => {
        const loginSpy = spy();
        const nickname = 'test';
        const password = 'some pass';
        const wrapper = mount(<SelectMode login={loginSpy} />);
        wrapper.setState({nickname, password});

        const form = wrapper.find('form');
        form.simulate('submit');
        //expect(loginSpy.calledOnce).to.equal(true);
    });
    it('when a user click practice mode, it gets redirect to deckconfig route', () => {
        //TODO: Write this test.. Hmm, can not find any way to mock a Link click.. (Any ideas??)
    });
});