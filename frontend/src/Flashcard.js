import React, { Component } from 'react';

export class Flashcard extends Component {

    constructor(props) {
        super(props);
        this.state = { solution : '' };

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        this.setState({solution: event.target.value});
        this.props.sendAnswer(event.target.value);
    }

    isSolutionCorrect(solution) {
        return this.props.flashcard.solution === parseInt(solution);
    }

    render() {
        return (
            <div>
                <p>{this.props.flashcard.problem}</p>
                <input type="text" placeholder="Your solution" value={this.state.solution} onChange={this.handleInputChange}/>
                <TimeCounter start={Date.now()}  timePerProblem={this.props.timePerProblem} remProb={this.props.remProb} completeQuestion={this.props.completeQuestion} />
                <p>Remaining problems: {this.props.remProb}</p>
            </div>
        )
    }
}

export class TimeCounter extends Component {

    constructor(props) {
        super(props);
        this.state = { elapsed: 0 };

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({elapsed: new Date() - this.props.start});
        if(this.state.elapsed >= this.props.timePerProblem*1000) {
            if (this.props.remProb===0)
                clearInterval(this.timer);
            this.props.completeQuestion();
        }
    }

    render() {
        return <p>Remaining time: {this.props.timePerProblem - Math.round(this.state.elapsed / 1000)} seconds</p>;
    }
}

export class FlashcardPractice extends Component {

    constructor(props) {
        super(props);

        this.state = { questionsAnswered : 0, answers : [], currentAnswer : '' };

        this.updateAnswer = this.updateAnswer.bind(this);
        this.completeQuestion = this.completeQuestion.bind(this);
    }

    completeQuestion() {
        let flashcard = this.props.chosenDeck.flashcards[this.state.questionsAnswered];
        flashcard.answer = this.state.currentAnswer;

        flashcard.check = parseInt(flashcard.answer) === flashcard.solution? true: false;

        this.state.answers.push(flashcard);

        if(this.state.questionsAnswered < this.props.chosenDeck.flashcards.length - 1) {
            this.setState({ questionsAnswered : this.state.questionsAnswered + 1 });
        }
        else {
            this.props.submitAnswers(this.state.answers);
        }
    }

    updateAnswer(answer) {
        this.setState({currentAnswer : answer});
    }

    render() {
        return (
            <div>
                <Flashcard flashcard={this.props.chosenDeck.flashcards[this.state.questionsAnswered]} sendAnswer={this.updateAnswer} remProb={this.props.gameLengthProblems-this.state.questionsAnswered-1} timePerProblem={this.props.timePerProblem}  completeQuestion={this.completeQuestion}/>
                <button onClick={this.completeQuestion}>{(this.state.questionsAnswered !== this.props.chosenDeck.flashcards.length - 1) ? 'Next Question' : 'Complete Session'}</button>
            </div>
        )
    }
}