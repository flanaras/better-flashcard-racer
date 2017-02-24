import React, {Component} from 'react';
import {browserHistory} from "react-router";

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decks:
                [{
                    "id":1,
                    "numProblems":30,
                    "desc": "Easy plus and minus",
                    "flashcards":[
                        {
                            "id":141,
                            "problem":"1+1",
                            "solution":2
                        },
                        {
                            "id":2,
                            "problem":"4+1",
                            "solution":5
                        },
                        {
                            "id":5,
                            "problem":"6+0",
                            "solution":9
                        },
                        {
                            "id":8,
                            "problem":"2+7",
                            "solution":9
                        },
                        {
                            "id":9,
                            "problem":"0+0",
                            "solution":0
                        },
                        {
                            "id":12,
                            "problem":"3+6",
                            "solution":9
                        },
                        {
                            "id":15,
                            "problem":"1+3",
                            "solution":2
                        }
                    ]
                },
                    {
                        "id":3,
                        "desc": "Medium plus and minus",
                        "numProblems":30,
                        "flashcards":[
                            {
                                "id":141,
                                "problem":"1+1",
                                "solution":2
                            },
                            {
                                "id":2,
                                "problem":"4+1",
                                "solution":5
                            },
                            {
                                "id":5,
                                "problem":"6+0",
                                "solution":9
                            },
                            {
                                "id":8,
                                "problem":"2+7",
                                "solution":9
                            },
                            {
                                "id":9,
                                "problem":"0+0",
                                "solution":0
                            },
                            {
                                "id":12,
                                "problem":"3+6",
                                "solution":9
                            },
                            {
                                "id":15,
                                "problem":"1+3",
                                "solution":2
                            }
                        ]
                    }
                ]
            ,
            chosenDeck: {
                "id":1,
                "numProblems":30,
                "desc": "Easy plus and minus",
                "flashcards":[
                    {
                        "id":141,
                        "problem":"1+1",
                        "solution":2
                    },
                    {
                        "id":2,
                        "problem":"4+1",
                        "solution":5
                    },
                    {
                        "id":5,
                        "problem":"6+0",
                        "solution":9
                    },
                    {
                        "id":8,
                        "problem":"2+7",
                        "solution":9
                    },
                    {
                        "id":9,
                        "problem":"0+0",
                        "solution":0
                    },
                    {
                        "id":12,
                        "problem":"3+6",
                        "solution":9
                    },
                    {
                        "id":15,
                        "problem":"1+3",
                        "solution":2
                    }
                ]
            }};

        this.onDeckChange = this.onDeckChange.bind(this)
        this.login = this.login.bind(this)
        this.editUser = this.editUser.bind(this)
    }

    onDeckChange(deckId) {
        const decks = this.state.decks
        const chosenDeck = decks.find(deck => parseInt(deck.id) === parseInt(deckId))
        this.setState({chosenDeck})
    }

    login(username, userRole, userRoleId, auth) {
        this.setState({username, userRole, userRoleId, auth});
        browserHistory.push('deckconfig');
    }

    editUser(newUserId, newUser, newUserRoleId) {
        this.setState({newUserId, newUser, newUserRoleId});
        browserHistory.push('edituser');
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, {
                    decks: this.state.decks,
                    onDeckChange: this.onDeckChange,
                    chosenDeck: this.state.chosenDeck,
                    login: this.login,
                    username: this.state.username,
                    userRole: this.state.userRole,
                    userRoleId: this.state.userRoleId,
                    auth: this.state.auth,
                    editUser: this.editUser,
                    newUserId: this.state.newUserId,
                    newUser: this.state.newUser,
                    newUserRoleId: this.state.newUserRoleId
                })}
            </div>
        )
    }
}

