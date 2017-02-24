import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'
import SelectMode from '../src/SelectMode'
import DeckConfig from '../src/DeckConfig'
import MotherOfDragons from '../src/MotherOfDragons'
import { Flashcard, FlashcardPractice } from './../src/Flashcard'
import UserList from '../src/UserList';
import CreateUser from '../src/CreateUser';
import EditUser from '../src/EditUser';
import {Link} from "react-router";

describe('SelectMode', () => {
    it('should render username and password input texts, login button and try practice mode link', () => {
        const wrapper = shallow(<SelectMode />);
        expect(wrapper.containsAllMatchingElements([
            <input type="text" name="username"/>,
            <input type="password" name="password"/>,
            <p>{''}</p>,
            <input type="submit" value="Log in"/>
        ])).to.equal(true);
        expect(wrapper.find('Link').length).to.equal(1);
    });
    it('should init without authentication', () => {
        const wrapper = shallow(<SelectMode />);
        expect(wrapper.state('auth')).to.equal(false);
    });
    it('should accept inputs', () => {
        const wrapper = shallow(<SelectMode />);
        const username = wrapper.find("[name='username']");
        username.simulate('change', {target: {name: 'username', value: 'test'}});
        expect(wrapper.state('username')).to.equal('test');

        const password = wrapper.find("[name='password']");
        password.simulate('change', {target: {name: 'password', value: 'some pass'}});
        expect(wrapper.state('password')).to.equal('some pass');
    });
    it('should call apiCall when login form is submitted', () => {
        const apiCallSpy = spy(SelectMode.prototype, "apiCall");
        expect(apiCallSpy.notCalled).to.equal(true);
        const wrapper = mount(<SelectMode />);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(apiCallSpy.calledOnce).to.equal(true);
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
    it('links to create user and list users should be available only if the user is authenticated and his userRole is admin or teacher', () => {
        const decks = ['Easy plus and minus', 'Medium plus and minus', 'Hard pus and minus'];

        let wrapper = shallow(<DeckConfig decks={decks} auth={true} userRole='admin'/>);
        expect(wrapper.containsAllMatchingElements([
            <Link name="listUsersLink" to="users">List users</Link>
        ])).to.equal(true);

        wrapper = shallow(<DeckConfig decks={decks} auth={false} userRole=''/>);
        expect(wrapper.containsAllMatchingElements([
            <Link name="listUsersLink" to="users">List users</Link>
        ])).to.equal(false);
    });
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

    const users = [{id: 1, username: "Test User", auth_level: "Teacher", auth_id: 1},
                {id: 2, username : "Another User", auth_level: "Student", auth_id: 0}];

    it('should display the correct number of elements in the table', () => {
        const wrapper = shallow(<UserList auth={true} users={users} />);
        wrapper.setState({users});
        const tableRows = wrapper.find('tr');
        expect(tableRows).to.have.length.of(3+1);
    });
    it('should call apiCall to get user list', () => {
        const apiCallSpy = spy(UserList.prototype, "apiCall");
        const wrapper = mount(<UserList />);
        expect(apiCallSpy.calledOnce).to.equal(true);
    });
    it('should not render if user is not authenticated', () => {
        const wrapper = shallow(<UserList auth={false}/>);
        expect(wrapper.containsAllMatchingElements()).to.equal(false);
    });
    it('should call apiDeleteCall to delete user', () => {
        const apiDeleteCall = spy(UserList.prototype, "apiDeleteCall");
        const wrapper = mount(<UserList auth={true} />);
        wrapper.setState({users});
        wrapper.find('[name="deleteButton0"]').simulate('click');
        expect(apiDeleteCall.calledOnce).to.equal(true);
    });
});

describe('CreateUser', () => {
    it('should not render if user is not authenticated', () => {
        const wrapper = shallow(<CreateUser username='' userRole='' auth={false}/>);
        expect(wrapper.containsAllMatchingElements()).to.equal(false);
    });
    it('for an authenticated user should render role dropdown, username and password input texts and also create user button', () => {
        const username = 'Aron';
        const userRole = 'teacher';
        const auth = true;
        const authLevel = [{
            "id": 0,
            "auth": "Student"
        }];
        const wrapper = mount(<CreateUser username={username} userRole={userRole} auth={auth}/>);
        wrapper.setState({authLevel})
        expect(wrapper.containsAllMatchingElements([
            <h1>{"Aron"}
                {", welcome!"}</h1>
        ])).to.equal(true);
        expect(wrapper.find('option').length).to.equal(1);
        expect(wrapper.containsAllMatchingElements([
            <input type="text" name="newUser"/>,
            <input type="password" name="newPassw"/>,
            <input type="password" name="reNewPassw"/>,
            <input type="submit" value="Create user"/>,
            <p>{''}</p>,
            <p>{''}</p>
        ])).to.equal(true);
    });
    it('dropdown options should be consistent with the user authentication level', () => {
        const username = 'Aron';
        const auth = true;

        let userRole = 'admin';
        let authLevel = [{
            "id": 0,
            "auth": "Student"
        },
            {
                "id": 1,
                "auth": "Teacher"
            },
            {
                "id": 2,
                "auth": "Admin"
            }];
        const apiGetCallSpy = spy(CreateUser.prototype, "apiGetCall");
        let wrapper = mount(<CreateUser username={username} userRole={userRole} auth={auth}/>);
        expect(apiGetCallSpy.calledOnce).to.equal(true);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(3);

        userRole = 'teacher';
        authLevel = [{
            "id": 0,
            "auth": "Student"
        }];
        wrapper = mount(<CreateUser username={username} userRole={userRole} auth={auth}/>);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(1);
    });
    it('should accept inputs and changes in dropdown', () => {

        const wrapper = mount(<CreateUser username='Aron' userRole='admin' auth={true}/>);
        const newUser = wrapper.find("[name='newUser']");
        newUser.simulate('change', {target: {name: 'newUser', value: 'sara10'}});
        expect(wrapper.state('newUser')).to.equal('sara10');

        const newPassw = wrapper.find("[name='newPassw']");
        newPassw.simulate('change', {target: {name: 'newPassw', value: 'some pass'}});
        expect(wrapper.state('newPassw')).to.equal('some pass');

        const reNewPassw = wrapper.find("[name='reNewPassw']");
        reNewPassw.simulate('change', {target: {name: 'reNewPassw', value: 'some pass'}});
        expect(wrapper.state('reNewPassw')).to.equal('some pass');

        const newRoleId = wrapper.find("[name='newRoleId']");
        newRoleId.simulate('change', {target: {name: 'newRoleId', value: 'student'}});
        expect(wrapper.state('newRoleId')).to.equal('student');
    });
    it('should show password unmatched in case they are different', () => {
        const username = 'Aron';
        const userRole = 'admin';
        const auth = true;
        const newPassw = '123456';
        const reNewPassw = '654321';

        const wrapper = mount(<CreateUser username={username} userRole={userRole} auth={auth}/>);
        expect(wrapper.state('newPassError')).to.equal('');
        wrapper.setState({newPassw, reNewPassw});
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(wrapper.state('newPassError')).to.equal('Passwords does not match!');
    });
    it('should call apiCall when create user form is submitted', () => {
        const username = 'Aron';
        let userRole = 'admin';
        const auth = true;

        const apiCallSpy = spy(CreateUser.prototype, "apiCall");
        expect(apiCallSpy.notCalled).to.equal(true);
        const wrapper = mount(<CreateUser username={username} userRole={userRole} auth={auth}/>);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(apiCallSpy.calledOnce).to.equal(true);
    });
});

describe('EditUser', () => {
    it('should not render if user is not authenticated', () => {
        const wrapper = shallow(<EditUser auth={false}/>);
        expect(wrapper.containsAllMatchingElements()).to.equal(false);
    });
    it('for an authenticated user should render role dropdown, username and password input texts and also update user button', () => {
        const username = 'Aron';
        const userRole = 'teacher';
        const userRoleId = 1;
        const auth = true;
        const authLevel = [{
            "id": 0,
            "auth": "Student"
        }];
        const wrapper = mount(<EditUser username={username} userRole={userRole} userRoleId={userRoleId} auth={auth}/>);
        wrapper.setState({authLevel})
        expect(wrapper.containsAllMatchingElements([
            <h1>{"Aron"}
                {", welcome!"}</h1>
        ])).to.equal(true);
        expect(wrapper.find('option').length).to.equal(1);
        expect(wrapper.containsAllMatchingElements([
            <input type="text" name="newUser"/>,
            <input type="submit" value="Update user"/>,
            <p>{''}</p>
        ])).to.equal(true);
    });
    it('dropdown options should be consistent with the user authentication level', () => {
        const username = 'Aron';
        const auth = true;

        let userRole = 'admin';
        let userRoleId = 2;
        let authLevel = [{
            "id": 0,
            "auth": "Student"
        },
            {
                "id": 1,
                "auth": "Teacher"
            },
            {
                "id": 2,
                "auth": "Admin"
            }];
        const apiGetCallSpy = spy(EditUser.prototype, "apiGetCall");
        let wrapper = mount(<EditUser username={username} userRole={userRole} userRoleId={userRoleId} auth={auth}/>);
        expect(apiGetCallSpy.calledOnce).to.equal(true);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(3);

        userRole = 'teacher';
        userRoleId = 1;
        authLevel = [{
            "id": 0,
            "auth": "Student"
        }];
        wrapper = mount(<EditUser username={username} userRole={userRole} userRoleId={userRoleId} auth={auth}/>);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(1);
    });
    it('should accept inputs and changes in dropdown', () => {

        const wrapper = mount(<EditUser username='Aron' userRole='admin' userRoleId={2} auth={true}/>);
        const newUser = wrapper.find("[name='newUser']");
        newUser.simulate('change', {target: {name: 'newUser', value: 'sara10'}});
        expect(wrapper.state('newUser')).to.equal('sara10');

        const newRoleId = wrapper.find("[name='newRoleId']");
        newRoleId.simulate('change', {target: {name: 'newRoleId', value: 'student'}});
        expect(wrapper.state('newRoleId')).to.equal('student');
    });
    it('should call apiCall when update user form is submitted', () => {
        const username = 'Aron';
        const userRole = 'admin';
        const userRoleId = 2;
        const auth = true;

        const apiCallSpy = spy(EditUser.prototype, "apiCall");
        expect(apiCallSpy.notCalled).to.equal(true);
        const wrapper = mount(<EditUser username={username} userRole={userRole} userRoleId={userRoleId} auth={auth}/>);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(apiCallSpy.calledOnce).to.equal(true);
    });
});
