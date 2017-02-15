import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class TimeCounter extends Component {

  constructor(props) {
    super(props);
    this.state = { elapsed: 0, backRemProb: this.props.remProb, remTime: this.props.timePerProblem, barPerc: 100, barStyle: 'success'};

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 250);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({elapsed: this.state.elapsed+250,
      remTime: this.props.timePerProblem - Math.round(this.state.elapsed / 1000),
      barPerc: Math.round((this.state.remTime/this.props.timePerProblem) * 100)
    });

    if(this.state.backRemProb != this.props.remProb)
      this.setState({elapsed: 0, backRemProb: this.props.remProb});

    if(this.state.barPerc >= 66)
      this.setState({barStyle: 'success'});
    else if(this.state.barPerc >= 33 && this.state.barPerc < 66)
      this.setState({barStyle: 'warning'});
    else if(this.state.barPerc < 33 )
      this.setState({barStyle: 'danger'});

    if(this.state.elapsed >= this.props.timePerProblem*1000) {
      this.setState({elapsed: 0});
      if (this.props.remProb===0) {
        clearInterval(this.timer);
        this.props.disableInput();
      } else {
        this.props.completeQuestion();
      }
    }
  }

  render() {
    return (
      <div>
        <ProgressBar active bsStyle={this.state.barStyle} now={this.state.barPerc} label={this.state.remTime + ' s'} />
      </div>

    )
  }
}
