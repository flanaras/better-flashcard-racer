import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import sinon, { spy } from 'sinon'
import SelectMode from '../src/SelectMode'
import DeckConfig, {GenerateDeckOptions, SavedDeck} from '../src/DeckConfig'
import Solutions from '../src/Solutions'
import {ControlLabel, FormControl, Button, ListGroup, Form, DropdownButton, MenuItem} from 'react-bootstrap'
import Flashcard from './../src/Flashcard'
import FlashcardPractice from './../src/FlashcardPractice'
import UserList from '../src/UserList';
import CreateUser from '../src/CreateUser';
import EditUser from '../src/EditUser';
import Dashboard from '../src/Dashboard';
import UserSettings from '../src/UserSettings';
import {Link} from "react-router";

import sampleDataLobby from '../../sockets/docs/Lobby.json';

describe('SelectMode', () => {
    it('should render username and password input texts, login button and try practice mode link', () => {
        const wrapper = shallow(<SelectMode route={{name: 'Welcome'}} />);
        expect(wrapper.containsAllMatchingElements([
            <FormControl type="text" name="username"/>
        ])).to.equal(true);
        expect(wrapper.containsAllMatchingElements([
            <FormControl type="password" name="password"/>
        ])).to.equal(true);
        expect(wrapper.containsAllMatchingElements([
            <Button bsStyle="info" type="submit">
                Sign in
            </Button>
        ])).to.equal(true);
        expect(wrapper.find('Link').length).to.equal(1);
    });
    it('should init without authentication', () => {
        const wrapper = shallow(<SelectMode route={{name: 'Welcome'}} />);
        expect(wrapper.state(['userInfo']).auth).to.equal(false);
    });
    it('should accept inputs', () => {
        const wrapper = shallow(<SelectMode route={{name: 'Welcome'}} />);
        const username = wrapper.find("[name='username']");
        username.simulate('change', {target: {name: 'username', value: 'test'}});
        expect(wrapper.state('userInfo').username).to.equal('test');

        const password = wrapper.find("[name='password']");
        password.simulate('change', {target: {name: 'password', value: 'some pass'}});
        expect(wrapper.state('userInfo').password).to.equal('some pass');
    });
    it('should call apiCall when login form is submitted', () => {
        const apiCallSpy = spy(SelectMode.prototype, "apiCall");
        expect(apiCallSpy.notCalled).to.equal(true);
        const wrapper = mount(<SelectMode route={{name: 'Welcome'}} />);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(apiCallSpy.calledOnce).to.equal(true);
    });
});

describe('Dashboard', () => {
    it('Dashboard should be available only if the user is authenticated', () => {
        let userInfo = {
            username: '',
            password: '',
            userid: NaN,
            userRole: 'admin',
            userRoleId: NaN,
            auth: true,
            loginErrorMsg: ''
        };

        let wrapper = shallow(<Dashboard route={{name: 'Dashboard'}} loadUserInfo={spy()} userInfo={userInfo} />);
        expect(wrapper.containsAllMatchingElements([
            <Link style={{color: "#ffffff"}} to="deckconfig" >Try practice mode</Link>
        ])).to.equal(true);
        expect(wrapper.containsAllMatchingElements([
            <Link style={{color: "#ffffff"}} to="dashboard/users">User management</Link>
        ])).to.equal(true);

        userInfo = {
            username: '',
            password: '',
            userid: NaN,
            userRole: 'student',
            userRoleId: NaN,
            auth: false,
            loginErrorMsg: ''
        };

        wrapper = shallow(<Dashboard route={{name: 'Dashboard'}} loadUserInfo={spy()} userInfo={userInfo} />);
        expect(wrapper.containsAllMatchingElements([
            <Link style={{color: "#ffffff"}} to="deckconfig" >Try practice mode</Link>
        ])).to.equal(false);
        expect(wrapper.containsAllMatchingElements([
            <Link style={{color: "#ffffff"}} to="users">User management</Link>
        ])).to.equal(false);
    });
});

describe('DeckConfig', () => {
    it('should display decks in a dropdown', () => {
        const decks = [{id:1, name: "The name of my deck", description:"A short description of the deck",
            flashcards:[{problem: 1+1, solution: 2}]}, {id:2, name: "The name of my deck", description:"A short description of the deck",
            flashcards:[{problem: 1+1, solution: 2}]}]
        const wrapper = mount(<DeckConfig />)
        wrapper.setState({decks})
        wrapper.setState({deckType: 'savedDeck'})
        wrapper.setState({chosenDeck: decks[0]})
        console.log(wrapper.find('option').length)
        expect(wrapper.find('option').length).to.equal(2)
    })
    it('handleChange should be called when the selected deck is changed', () => {
        const handleChangeSpy = spy()
        const decks = [{id:1, name: "The name of my deck", description:"A short description of the deck",
            flashcards:[{problem: 1+1, solution: 2}]}, {id:2, name: "The name of my deck", description:"A short description of the deck",
            flashcards:[{problem: 1+1, solution: 2}]}]
        const wrapper = mount(<SavedDeck handleChange = {handleChangeSpy} decks = {decks} deckType = {'savedDeck'} chosenDeck = {decks[0]}/>)
        const dropdown = wrapper.find('select')
        dropdown.simulate('change', 2)
        expect(handleChangeSpy.calledOnce).to.equal(true)
    })
    it('choosing a deck should change the currently chosen deck', () => {
        const chosenDeck = {id:1, desc: 'Easy plus and minus'}

        const decks = [{id:1, desc: 'Easy plus and minus'}, {id:2, desc: 'Medium plus and minus'}, {id:3, desc: 'Hard pus and minus'}]
        const wrapper = mount(<DeckConfig/>)
        wrapper.setState({decks})
        wrapper.setState({chosenDeck})
        wrapper.instance().savedDeckDropdownChange({target:{value: 2, type: 'select-one'}})
        expect(wrapper.state('chosenDeck')).to.eql({id:2, desc: 'Medium plus and minus'})
    })
    it('user should be able to choose between generating a deck or selecting a already defined deck', () => {
        const wrapper = shallow(<DeckConfig />)
        expect(wrapper.find('[name="deckType"][type="radio"]').length).to.equal(2)
    })
    it('handleChange should be called when the user clicks a radio button', () => {
        const decks = [{id:1, name: "The name of my deck", description:"A short description of the deck",
            flashcards:[{problem: 1+1, solution: 2}]}]
        const chosenDeck = decks[0]
        const wrapper = shallow(<DeckConfig />)
        wrapper.setState({decks})
        wrapper.setState({chosenDeck})
        let output = wrapper.instance().handleChange({target:{value:"savedDeck", name:"deckType", type: 'radio'}})
        expect(wrapper.state('deckType')).to.equal('savedDeck')
    })
    it('choosing generateDeck should only show generate and not savedDeck dropdown', () => {
        const wrapper = mount(<DeckConfig decks={[{id:1, desc: 'Easy plus and minus'}]}/>)
        wrapper.setState({deckType: 'generateDeck'})
        expect(wrapper.find('select').length).to.equal(0)
    })
    it('choosing savedDeck should only show savedDeck and not generateDeck', () => {
        const decks = [{id:1, name: "The name of my deck", description:"A short description of the deck",
            flashcards:[{problem: 1+1, solution: 2}]}]
        const chosenDeck = decks[0]
        const wrapper = mount(<DeckConfig />)
        wrapper.setState({deckType: 'savedDeck'})
        wrapper.setState({decks})
        wrapper.setState({chosenDeck})
        expect(wrapper.find('select').length).to.equal(1)
    })
    it('when a user press submit, the submitGameConfig method should be called', () => {
        const submitGameConfigSpy = spy(DeckConfig.prototype, "submitGameConfig")
        const wrapper = mount(<DeckConfig />)
        const form = wrapper.find(Form)
        const generateDeckRadio = wrapper.find("[value='generateDeck']")
        generateDeckRadio.simulate('click')
        form.simulate('submit')
        expect(submitGameConfigSpy.calledOnce).to.equal(true)
        submitGameConfigSpy.restore()
    })
    it('when a user submits a savedDeck config, the config should be submitted successfully', () => {
        const submitGameConfigSpy = spy(DeckConfig.prototype, "submitGameConfig")
        const chosenDeck = {id:1, name: "The name of my deck", description:"A short description of the deck",
            flashcards:[{problem: 1+1, solution: 2}]}
        const wrapper = mount(<DeckConfig />)
        wrapper.setState({chosenDeck})

        const form = wrapper.find('form')
        const generateDeckRadio = wrapper.find("[value='generateDeck']")
        const gameLengthInput = wrapper.find("[name='gameLengthProblems']")

        generateDeckRadio.simulate('click')
        gameLengthInput.simulate('change', {target:{value:'20', type:'text', name: 'gameLengthProblems'}})

        wrapper.setState({chosenDeck})
        form.simulate('submit')

        expect(submitGameConfigSpy.calledOnce).to.equal(true)
        submitGameConfigSpy.restore()
    })
    it('when the component gets rendered, the component should call our API', () => {
        const apiCallSpy = spy(DeckConfig.prototype, "apiCall")
        expect(apiCallSpy.notCalled).to.equal(true)
        const wrapper = mount(<DeckConfig/>)
        expect(apiCallSpy.calledOnce).to.equal(true)

    })
});

describe('SavedDeck', () => {
    it('when selecting a saved deck, a description should be displayed', () => {
        const decks = [{id:1, name: "The name of my deck", description:"A short description of the deck",
            flashcards:[{problem: 1+1, solution: 2}]}]
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
        <ControlLabel>1 + 1</ControlLabel>,
        <FormControl type="text" placeholder="Your solution" />
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
    const wrapper = shallow(<FlashcardPractice route={{name: 'Play Game'}} chosenDeck={chosenDeck} loadUserInfo={spy()} />);
    expect(wrapper.containsAllMatchingElements([
      <Flashcard />,
      <Button bsStyle="info" >Next Question</Button>
    ])).to.be.true;
  });

  it('should increase the count of answered questions upon button click', () => {
    const wrapper = shallow(<FlashcardPractice route={{name: 'Play Game'}} chosenDeck={chosenDeck} loadUserInfo={spy()} />);

    expect(wrapper.state('questionsAnswered')).to.equal(0);
    wrapper.find('Button').simulate('click');
    expect(wrapper.state('questionsAnswered')).to.equal(1);
  });

  it('should display the next question after clicking the "Next Question" button', () => {
    const wrapper = mount(<FlashcardPractice userInfo={[]} route={{name: 'Play Game'}} chosenDeck={chosenDeck} loadUserInfo={spy()} />);

    expect(wrapper.find('label').text()).to.equal("1+1");
    wrapper.find('button').simulate('click');
    expect(wrapper.find('label').text()).to.equal("4+1");
  });

  it('should update the "currentAnswer" state when the answer is changed in the flashcard', () => {
    const wrapper = mount(<FlashcardPractice userInfo={[]} route={{name: 'Play Game'}} chosenDeck={chosenDeck} loadUserInfo={spy()} />);

    wrapper.find('#flashcard').simulate('change', { target : { value : "2" }});
    expect(wrapper.state('currentAnswer')).to.equal('2');
  });

  it('should save an answer on clicking "Next Question"', () => {
    const wrapper = mount(<FlashcardPractice userInfo={[]} route={{name: 'Play Game'}} chosenDeck={chosenDeck} loadUserInfo={spy()} />);

    wrapper.find('#flashcard').simulate('change', { target : { value : "2" }});
    wrapper.find('Button').simulate('click');
    expect(wrapper.state('answers')[0].answer).to.equal("2");
  });

    it('should save solution checking on clicking "Next Question"', () => {
        const wrapper = mount(<FlashcardPractice userInfo={[]} route={{name: 'Play Game'}} chosenDeck={chosenDeck} loadUserInfo={spy()} />);

        wrapper.find('#flashcard').simulate('change', { target : { value : "3" } });
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
        const wrapper = shallow(<Solutions route={{name: 'Results'}}  chosenDeck={chosenDeck} />);
        expect(wrapper.state('countCorrect')).to.eql(1);
        expect(wrapper.state('countIncorrect')).to.eql(1);
    });

    it ('should render detailed list', () => {
        const wrapper = shallow(<Solutions route={{name: 'Results'}} chosenDeck={chosenDeck} />);
        expect(wrapper.containsAllMatchingElements([
            <h4>Correct answers: {1}</h4>,
            <h4>Incorrect answers: {1}</h4>
        ])).to.equal(true);
        expect(wrapper.find('ListGroupItem').length).to.equal(2);
    });
});

describe('Room', () => {

  //TODO: is there a good way to mock the socket connection?
  var userList = [
    {
      id: 1,
      username : 'Test'
    },
    {
      id : 2,
      username : 'Test'
    }
  ];

  /*
    TODO: include those tests again when the Room component is implemented
   */

  xit('should display the correct number of users in the list', () => {
    const wrapper = shallow(<Room />);
    wrapper.setState({userList});

    const tableRows = wrapper.find('tr');
    expect(tableRows).to.have.length.of(2+1);
  });

  xit('should be able to add a user to the list', () => {
    const wrapper = shallow(<Room />);
    wrapper.setState({userList});

    wrapper.instance().addUserToList({id : 3, username : 'Test'});

    expect(wrapper.state('userList').length).to.equal(3);
    const tableRows = wrapper.find('tr');
    expect(tableRows).to.have.length.of(3+1);
  });

  xit('should be able to remove a user from the list', () => {
    const wrapper = shallow(<Room />);
    wrapper.setState({userList});

    wrapper.instance().removeUserFromList({id : 1, username : 'Test'});

    expect(wrapper.state('userList').length).to.equal(1);
    const tableRows = wrapper.find('tr');
    expect(tableRows).to.have.length.of(1+1);
  })

});

describe('Lobby', () => {

  it('should display the correct number of rooms in the list', () => {
    const wrapper = shallow(<Lobby/>);
    wrapper.setState({roomList: sampleDataLobby.rooms});

    const tableRows = wrapper.find('tr');
    expect(tableRows).to.have.length.of(1+1);
  });
});

describe('UserList', () => {

    const users = [{id: 1, username: "Test User", auth_level: "Teacher", auth_id: 1},
                {id: 2, username : "Another User", auth_level: "Student", auth_id: 0}];

    var userInfo = {
        username: 'admin',
        password: '',
        userid: NaN,
        userRole: 'admin',
        userRoleId: 2,
        auth: true,
        loginErrorMsg: ''
    };

    it('should display the correct number of elements in the table', () => {
        const wrapper = shallow(<UserList route={{name: 'User Management'}} userInfo={userInfo} users={users} />);
        wrapper.setState({users});
        const tableRows = wrapper.find('tr');
        expect(tableRows).to.have.length.of(3+1);
    });
    it('should call apiGetUsersCall to get user list', () => {
        const apiGetUsersCallSpy = spy(UserList.prototype, "apiGetUsersCall");
        const loadUserInfoSpy = spy();
        const wrapper = mount(<UserList routes={[]} route={{name: 'User Management'}} userInfo={userInfo} loadUserInfo={loadUserInfoSpy} />);
        expect(apiGetUsersCallSpy.calledOnce).to.equal(true);
    });
    it('should call apiDeleteUserCall to delete user', () => {
        const apiDeleteUserCallSpy = spy(UserList.prototype, "apiDeleteUserCall");
        const loadUserInfoSpy = spy();
        const wrapper = mount(<UserList routes={[]} route={{name: 'User Management'}} userInfo={userInfo} loadUserInfo={loadUserInfoSpy} />);
        wrapper.setState({users});
        wrapper.find('[name="deleteButton0"]').simulate('click');
        expect(apiDeleteUserCallSpy.calledOnce).to.equal(true);
    });
    it('should not render if user is not authenticated', () => {

        userInfo = {
            username: '',
            password: '',
            userid: NaN,
            userRole: '',
            userRoleId: NaN,
            auth: false,
            loginErrorMsg: ''
        };

        const wrapper = shallow(<UserList userInfo={userInfo}/>);

        expect(wrapper.containsAllMatchingElements()).to.equal(false);
    });
});

describe('CreateUser', () => {
    var userInfo = {
        username: '',
        password: '',
        userid: NaN,
        userRole: '',
        userRoleId: NaN,
        auth: false,
        loginErrorMsg: ''
    };

    it('should not render if user is not authenticated', () => {
        const wrapper = shallow(<CreateUser route={{name: 'Create User'}} userInfo={userInfo} />);
        expect(wrapper.containsAllMatchingElements()).to.equal(false);
    });
    it('for an authenticated user should render role dropdown, username and password input texts also create user button', () => {

        const authLevel = [{
            "id": 0,
            "auth": "Student"
        }];

        userInfo = {
            username: 'Aron',
            password: 'teacher',
            userid: NaN,
            userRole: '',
            userRoleId: NaN,
            auth: true,
            loginErrorMsg: ''
        };

        const wrapper = shallow(<CreateUser routes={[]} route={{name: 'Create User'}} userInfo={userInfo} />);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(1);
        expect(wrapper.containsAllMatchingElements([
            <FormControl type="text" name="newUser"/>
        ])).to.equal(true);
        expect(wrapper.containsAllMatchingElements([
            <FormControl type="password" name="newPassw"/>
        ])).to.equal(true);
        expect(wrapper.containsAllMatchingElements([
            <FormControl type="password" name="reNewPassw"/>
        ])).to.equal(true);
        expect(wrapper.containsAllMatchingElements([
            <Button bsStyle="info" type="submit">
                Create user
            </Button>
        ])).to.equal(true);
    });
    it('dropdown options should be consistent with the user authentication level', () => {
        userInfo = {
            username: 'Aron',
            password: 'teacher',
            userid: NaN,
            userRole: 'admin',
            userRoleId: 2,
            auth: true,
            loginErrorMsg: ''
        };
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
        const apiGetAuthLevelsCallSpy = spy(CreateUser.prototype, "apiGetAuthLevelsCall");
        let wrapper = mount(<CreateUser routes={[]} route={{name: 'Create User'}} userInfo={userInfo} />);
        expect(apiGetAuthLevelsCallSpy.calledOnce).to.equal(true);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(3);

        userInfo = {
            username: 'Aron',
            password: 'teacher',
            userid: NaN,
            userRole: 'teacher',
            userRoleId: 1,
            auth: true,
            loginErrorMsg: ''
        };
        authLevel = [{
            "id": 0,
            "auth": "Student"
        }];
        wrapper = mount(<CreateUser routes={[]} route={{name: 'Create User'}} userInfo={userInfo} />);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(1);
    });
    it('should accept inputs and changes in dropdown', () => {
        userInfo = {
            username: 'Aron',
            password: 'teacher',
            userid: NaN,
            userRole: 'admin',
            userRoleId: 2,
            auth: true,
            loginErrorMsg: ''
        };

        const wrapper = mount(<CreateUser addEditUser={spy()} routes={[]} route={{name: 'Create User'}} userInfo={userInfo} />);
        const newUser = wrapper.find("[name='newUser']");
        newUser.simulate('change', {target: {name: 'newUser', value: 'sara10'}});
        expect(wrapper.state(['newUserInfo']).newUser).to.equal('sara10');

        const newPassw = wrapper.find("[name='newPassw']");
        newPassw.simulate('change', {target: {name: 'newPassw', value: 'some pass'}});
        expect(wrapper.state(['newUserInfo']).newPassw).to.equal('some pass');

        const reNewPassw = wrapper.find("[name='reNewPassw']");
        reNewPassw.simulate('change', {target: {name: 'reNewPassw', value: 'some pass'}});
        expect(wrapper.state(['newUserInfo']).reNewPassw).to.equal('some pass');

        const newRoleId = wrapper.find("[name='newUserRoleId']");
        newRoleId.simulate('change', {target: {name: 'newUserRoleId', value: 0}});
        expect(wrapper.state(['newUserInfo']).newUserRoleId).to.equal(0);
    });
    it('should show password unmatched in case they are different', () => {
        const  newUserInfo = {
            newUser: '',
            newPassw: '123456',
            reNewPassw: '654321',
            newUserRoleId: 0,
            newUserMsg: '',
            newPassError: ''
        }

        const wrapper = mount(<CreateUser routes={[]} route={{name: 'Create User'}} userInfo={userInfo} />);
        expect(wrapper.state(['newUserInfo']).newPassError).to.equal('');
        wrapper.setState({newUserInfo});
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(wrapper.state(['newUserInfo']).newPassError).to.equal('Passwords does not match!');
    });
    it('should call apiCreateUserCall when create user form is submitted', () => {
        const apiCreateUserCallSpy = spy(CreateUser.prototype, "apiCreateUserCall");
        expect(apiCreateUserCallSpy.notCalled).to.equal(true);
        const wrapper = mount(<CreateUser routes={[]} route={{name: 'Create User'}} userInfo={userInfo} />);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(apiCreateUserCallSpy.calledOnce).to.equal(true);
    });
});

describe('EditUser', () => {
    var userInfo = {
        username: '',
        password: '',
        userid: NaN,
        userRole: '',
        userRoleId: NaN,
        auth: false,
        loginErrorMsg: ''
    };

    it('should not render if user is not authenticated', () => {
        const wrapper = shallow(<EditUser routes={[]} route={{name: 'Edit User'}} userInfo={userInfo} />);
        expect(wrapper.containsAllMatchingElements()).to.equal(false);
    });
    it('for an authenticated user should render role dropdown and username input texts also update user button', () => {
        userInfo = {
            username: 'Aron',
            password: '',
            userid: NaN,
            userRole: 'teacher',
            userRoleId: 1,
            auth: true,
            loginErrorMsg: ''
        };

        const authLevel = [{
            "id": 0,
            "auth": "Student"
        }];
        const wrapper = mount(<EditUser routes={[]} newUserInfo={[]} route={{name: 'Edit User'}} userInfo={userInfo} />);
        wrapper.setState({authLevel})
        expect(wrapper.find('option').length).to.equal(1);
        expect(wrapper.containsAllMatchingElements([
            <FormControl type="text" name="newUser"/>
        ])).to.equal(true);
        expect(wrapper.containsAllMatchingElements([
            <Button bsStyle="info" type="submit">
                Update user
            </Button>
        ])).to.equal(true);
    });
    it('dropdown options should be consistent with the user authentication level', () => {
        userInfo = {
            username: 'Aron',
            password: '',
            userid: NaN,
            userRole: 'admin',
            userRoleId: 2,
            auth: true,
            loginErrorMsg: ''
        };
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
        const apiGetAuthLevelsCallSpy = spy(EditUser.prototype, "apiGetAuthLevelsCall");
        let wrapper = mount(<EditUser routes={[]} newUserInfo={[]} route={{name: 'Edit User'}} userInfo={userInfo} />);
        expect(apiGetAuthLevelsCallSpy.calledOnce).to.equal(true);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(3);

        userInfo = {
            username: 'Aron',
            password: '',
            userid: NaN,
            userRole: 'teacher',
            userRoleId: 1,
            auth: true,
            loginErrorMsg: ''
        };
        authLevel = [{
            "id": 0,
            "auth": "Student"
        }];
        wrapper = mount(<EditUser routes={[]} newUserInfo={[]} route={{name: 'Edit User'}} userInfo={userInfo} />);
        wrapper.setState({authLevel});
        expect(wrapper.find('option').length).to.equal(1);
    });
    it('should accept inputs and changes in dropdown', () => {
        userInfo = {
            username: 'Aron',
            password: '',
            userid: NaN,
            userRole: 'admin',
            userRoleId: 2,
            auth: true,
            loginErrorMsg: ''
        };

        const wrapper = mount(<EditUser routes={[]} newUserInfo={{newUserId: 0, newUser: 'sara', newUserRoleId: 0}} route={{name: 'Edit User'}}  userInfo={userInfo} />);
        const newUser = wrapper.find("[name='newUser']");
        newUser.simulate('change', {target: {name: 'newUser', value: 'sara10'}});
        expect(wrapper.state(['newUserInfo']).newUser).to.equal('sara10');

        const newRoleId = wrapper.find("[name='newUserRoleId']");
        newRoleId.simulate('change', {target: {name: 'newUserRoleId', value: 2}});
        expect(wrapper.state(['newUserInfo']).newUserRoleId).to.equal(2);
    });
    it('should call apiEditUserCall when update user form is submitted', () => {
        const apiEditUserCallSpy = spy(EditUser.prototype, "apiEditUserCall");
        expect(apiEditUserCallSpy.notCalled).to.equal(true);
        const wrapper = mount(<EditUser routes={[]} newUserInfo={[]} route={{name: 'Edit User'}} userInfo={userInfo} />);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(apiEditUserCallSpy.calledOnce).to.equal(true);
    });
});

describe('UserSettings', () => {
    let userInfo = {
        username: 'admin',
        password: '',
        userid: NaN,
        userRole: 'admin',
        userRoleId: NaN,
        auth: true,
        loginErrorMsg: ''
    };

    it('should be a drop-down button with Sign Out option', () => {
        const wrapper = shallow(<UserSettings userInfo={userInfo} />);
        expect(wrapper.containsAllMatchingElements([
            <DropdownButton bsStyle='info' title="admin">
                <MenuItem eventKey="1">Sign out</MenuItem>
            </DropdownButton>
        ])).to.equal(true);
    });
    it('onSignOut should be called after clicking Sign out option', () => {
        const onLogoutSpy = spy(UserSettings.prototype, "onLogout");
        const wrapper = shallow(<UserSettings userInfo={userInfo} logout={spy()}/>);
        wrapper.find('MenuItem').simulate('click');
        expect(onLogoutSpy.calledOnce).to.equal(true);
    });
});
