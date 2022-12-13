import React, { Component } from 'react'

class TeamsService extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    const url =
      `https://localhost:3000/teams/${id}`

    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result,
        })
      })
  }

  render() {
    const { data } = this.state

    const result = data.map((entry, index) => {
      return <li key={index}>{entry}</li>
    })

    return <ul>{result}</ul>
  }
}

export default TeamsService