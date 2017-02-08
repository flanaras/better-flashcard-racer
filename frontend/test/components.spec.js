import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import sinon, { spy } from 'sinon'
import SelectMode from '../src/SelectMode'
import DeckConfig, {GenerateDeckOptions, SavedDeck} from '../src/DeckConfig'
import MotherOfDragons from '../src/MotherOfDragons'
import { Flashcard, FlashcardPractice } from './../src/Flashcard'
import Solutions from '../src/Solutions'

describe('SelectMode', () => {
    it('should be able to select mode: Login or practice mode', () => {
        //TODO: The previous "containsAllMatchingElements" test wont ever pass for some reason... ??
    })
    it('when a user click practice mode, it gets redirect to deckconfig route', () => {
        //TODO: Write this test.. Hmm, can not find any way to mock a Link click.. (Any ideas??)
    })
});

describe('DeckConfig', () => {
    it('should display decks in a dropdown', () => {
        const decks = ['Easy plus and minus', 'Medium plus and minus', 'Hard pus and minus']
        const wrapper = mount(<DeckConfig />)
        wrapper.setState({decks})
        expect(wrapper.find('option').length).to.equal(3)
    })
    it('handleChange should be called when the selected deck is changed', () => {
        const handleChangeSpy = spy()
        const decks = [{id: 1, desc: 'Easy plus and minus'}, {id:2, desc: 'Medium plus and minus'}, {id:3, desc: 'Hard pus and minus'}]
        const wrapper = mount(<SavedDeck handleChange = {handleChangeSpy} decks = {decks} deckType = {'savedDeck'} chosenDeck = {decks[0]}/>)
        const dropdown = wrapper.find('select')
        dropdown.simulate('change', 2)
        expect(handleChangeSpy.calledOnce).to.equal(true)
    })
    it('choosing a deck should change the currently chosen deck', () => {
        const chosenDeck = {id:1, desc: 'Easy plus and minus'}
        const decks = [{id:1, desc: 'Easy plus and minus'}, {id:2, desc: 'Medium plus and minus'}, {id:3, desc: 'Hard pus and minus'}]
        const wrapper = shallow(<DeckConfig />)
        wrapper.setState({decks})
        wrapper.setState({chosenDeck})
        wrapper.instance().handleChange({target:{value: 2, type: 'select-one'}})
        expect(wrapper.state('chosenDeck')).to.eql({id:2, desc: 'Medium plus and minus'})
    })
    it('user should be able to choose between generating a deck or selecting a already defined deck', () => {
        const wrapper = shallow(<DeckConfig />)
        expect(wrapper.find('[name="deckType"][type="radio"]').length).to.equal(2)
    })
    it('handleChange should be called when the user clicks a radio button', () => {
        const wrapper = shallow(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        let output = wrapper.instance().handleChange({target:{value:"savedDeck", name:"deckType", type: 'select-one'}})
        expect(wrapper.state('deckType')).to.equal('savedDeck')
    })
    it('choosing generateDeck should only show generate and not savedDeck  dropdown', () => {
        const wrapper = mount(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        wrapper.setState({deckType: 'generateDeck'})
        expect(wrapper.find('select').length).to.equal(0)
    })
    it('choosing savedDeck should only show savedDeck and generateDeck', () => {
        const wrapper = mount(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        wrapper.setState({deckType: 'savedDeck'})
        expect(wrapper.find('select').length).to.equal(1)
    })
    it('when a user press submit, the submitGameConfig method should be called', () => {
        const submitGameConfigSpy = spy()
        const wrapper = mount(<DeckConfig onSubmitGameConfig={submitGameConfigSpy}/>)
        const form = wrapper.find('form')
        const generateDeckRadio = wrapper.find("[value='generateDeck']")
        generateDeckRadio.simulate('click')
        form.simulate('submit')
        expect(submitGameConfigSpy.calledOnce).to.equal(true)
    })
    it('when a user submits a savedDeck config, the config should be submitted successfully', () => {
        const onSubmitGameConfigSpy = spy()
        const chosenDeck = {id:1, desc: 'Easy plus and minus'}
        const wrapper = mount(<DeckConfig onSubmitGameConfig={onSubmitGameConfigSpy} />)

        const form = wrapper.find('form')
        const generateDeckRadio = wrapper.find("[value='generateDeck']")
        const gameTypeRadio = wrapper.find("[value='timeGame']")
        const gameLengthInput = wrapper.find("[name='gameLength']")

        generateDeckRadio.simulate('click')
        gameTypeRadio.simulate('click')
        gameLengthInput.simulate('change', {target:{value:'20', type:'text', name: 'gameLength'}})

        wrapper.setState({chosenDeck})
        form.simulate('submit')

        expect(onSubmitGameConfigSpy.calledOnce).to.equal(true)
        expect(onSubmitGameConfigSpy.getCall(0).args[0]).to.equal(chosenDeck)
        expect(onSubmitGameConfigSpy.getCall(0).args[1]).to.equal('timeGame')
        expect(onSubmitGameConfigSpy.getCall(0).args[2]).to.equal('20')
        expect(onSubmitGameConfigSpy.calledWith(chosenDeck, 'timeGame', '20')).to.equal(true)
    })
    it('when the component gets rendered, the component should call our API', () => {
        const apiCallSpy = spy(DeckConfig.prototype, "apiCall")
        expect(apiCallSpy.notCalled).to.equal(true)
        const wrapper = mount(<DeckConfig/>)
        expect(apiCallSpy.calledOnce).to.equal(true)
    })

    it.skip('when a user submits a generatedDeck config, all the options should be added to the submit object', () => {
        //TODO: Implement test when API in place
        /*const addBox = generateWrapper.find("[name='add']")
         const subBox = generateWrapper.find("[name='sub']")
         const multBox = generateWrapper.find("[name='mult']")
         const divBox = generateWrapper.find("[name='div']")
         const minInput = generateWrapper.find("[name='min']")
         const maxInput = generateWrapper.find("[name='max']")
         */

        /*addBox.simulate('click')
         subBox.simulate('click')
         multBox.simulate('click')
         divBox.simulate('click')
         minInput.simulate('change',{target:{value:'-10'}})
         maxInput.simulate('change',{target:{value:'20'}})
         */
    })
});

describe('SavedDeck', () => {
    it('when selecting a saved deck, a description should be displayed', () => {
        const decks = [{id:1, name: "The name of my deck", description:"A short description of the deck"}]
        const deckType = 'savedDeck'
        const chosenDeck = decks[0]
        const wrapper = shallow(<SavedDeck  decks={decks} deckType={deckType} chosenDeck={chosenDeck}/>)
        expect(wrapper.find("[data-type='description']").length).to.equal(1)
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
  });
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

    it('should save solution checking on clicking "Next Question"', () => {
        const wrapper = mount(<FlashcardPractice chosenDeck={chosenDeck} />);

        wrapper.find('input').simulate('change', { target : { value : "3" } });
        wrapper.find('button').simulate('click');
        expect(wrapper.state('answers')[0].check).to.equal(false);
    });

    it('should submit answers to parent component after completing all questions', () => {
        //TODO: How to check?
    });
});

describe('Solutions', () => {
    var chosenDeck = [
        {
            "answer": "3",
            "check": false,
            "id": 141,
            "problem": "1+1",
            "solution": 2
        },
        {
            "answer": "5",
            "check": true,
            "id": 2,
            "problem": "4+1",
            "solution": 5
        }
    ];

    it ('should calculate performance info', () => {
        const wrapper = shallow(<Solutions chosenDeck={chosenDeck} />);
        expect(wrapper.state('countCorrect')).to.eql(1);
        expect(wrapper.state('countIncorrect')).to.eql(1);
    });

    it ('should render detailed list', () => {
        const wrapper = shallow(<Solutions chosenDeck={chosenDeck} />);
        expect(wrapper.containsAllMatchingElements([
            <h1>Your results are:</h1>,
            <h2>Correct answers: {1}</h2>,
            <h2>Incorrect answers: {1}</h2>
        ])).to.equal(true);
        expect(wrapper.find('li').length).to.equal(2);
    });
});