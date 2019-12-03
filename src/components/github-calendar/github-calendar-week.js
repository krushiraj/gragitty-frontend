import React from "react";

import Cell from "./cell";

export default class GithubCalendarWeek extends React.Component {
  state = {
    from: "",
    to: "",
    data: []
  };

  fakeData() {
    const data = [];
    for (let i = 0; i < 7; ++i) {
      data.push({ count: i + 0 });
    }
    this.setState({ data });
  }

  componentWillMount() {
    this.fakeData();
  }

  render() {
    return <div style={{ width: '15px', margin: '0 2px' }} className="flex flex-col">
      {this.state.data.map((day, index) => <Cell key={index} {...day}/>)}
    </div>;
  }
}
