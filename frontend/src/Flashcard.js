import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import TimeCounter from './TimeCounter';

export default class Flashcard extends Component {

    constructor(props) {
        super(props);
        this.state = { solution : '', inputState: false };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.disableInput = this.disableInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
      ReactDOM.findDOMNode(this.refs.solutionInput).focus();
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.flashcard !== this.props.flashcard) {
        this.setState({solution : '' });
      }
    }

    handleInputChange(event) {
        this.setState({solution: event.target.value});
        this.props.sendAnswer(event.target.value);
    }

    isSolutionCorrect(solution) {
        return this.props.flashcard.solution === parseInt(solution);
    }

    disableInput() {
        this.setState({inputState: true});
    }

    handleKeyPress(event) {
        if(event.key === 'Enter') {
            this.props.submitAnswer(event.target.value);
        }
    }

    render() {
        var opts = {};
        if (this.state.inputState)
            opts['disabled'] = 'disabled';
        return (
            <div>
                <FormGroup controlId="flashcard">
                    <ControlLabel>{this.props.flashcard.problem}</ControlLabel>
                    <FormControl type="text" {...opts} style={{textAlign: "center"}}
                                 placeholder="Your solution" value={this.state.solution}
                                 ref="solutionInput"
                                 onKeyPress={this.handleKeyPress}
                                 onChange={this.handleInputChange} />
                    <TimeCounter disableInput={this.disableInput} timePerProblem={this.props.timePerProblem} remProb={this.props.remProb} completeQuestion={this.props.completeQuestion} />
                </FormGroup>
            </div>
        )
    }
}

