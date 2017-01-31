import React, { Component } from 'react';

export class Flashcard extends Component {

  constructor(props) {
    super(props);
    this.state = { solution : '' };

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    console.log('In the change handler ', event.target.value);
    this.setState({solution: event.target.value});
  }

  isSolutionCorrect(solution) {
    return this.props.flashcard.solution === parseInt(solution);
  }

  render() {
    return (
      <div>
        <p>{this.props.flashcard.problem}</p>
        <input type="text" placeholder="Your solution" value={this.state.solution} onChange={this.handleInputChange}/>
      </div>
    )
  }
}
