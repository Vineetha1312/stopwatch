import {Component} from 'react'

import './index.css'

const initialState = {
  isTimeStart: false,
  timeInMinutes: 0,
  timeInSeconds: 0,
}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  getTimerFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 + timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes} : ${stringifiedSeconds}`
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onClickStopIcon = () => {
    this.clearTimerInterval()
  }

  incrementTimeElapsed = () => {
    this.setState(prevState => ({
      timeInSeconds: prevState.timeInSeconds + 1,
    }))
  }

  onClickStartIcon = () => {
    this.intervalId = setInterval(this.incrementTimeElapsed, 1000)
    this.setState(prevState => ({
      isTimeStart: !prevState.isTimeStart,
    }))
  }

  render() {
    const time = this.getTimerFormat()
    return (
      <div className="bg-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="stopwatch-container">
          <div className="timer-icon-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              className="icon"
              alt="stopwatch"
            />
            <p className="timer-text">Timer</p>
          </div>
          <h1 className="time">{time}</h1>
          <div className="buttons-container">
            <button
              className="green-btn"
              type="button"
              onClick={this.onClickStartIcon}
            >
              Start
            </button>
            <button
              className="red-btn"
              type="button"
              onClick={this.onClickStopIcon}
            >
              Stop
            </button>
            <button className="yellow-btn" type="button" onClick={this.onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
