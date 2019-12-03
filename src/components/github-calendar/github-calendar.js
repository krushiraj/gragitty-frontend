import React from "react";

import GithubCalendarWeek from "./github-calendar-week";
import GithubCalendarMonthStrip from "./github-calendar-month-strip";
import GithubCalendarWeekStrip from "./github-calendar-week-strip";
import Cell from "./cell";
import Controls from "./controls";

export default class GithubCalendar extends React.Component {
  state = {
    from: '',
    to: '',
    data: []
  }

  fakeData() {
    const data = []
    for (let i = 0; i < 53; ++i) {
      data.push({ count : i + 0 })
    }
    this.setState({ data })
  }

  componentWillMount() {
    this.fakeData();
  }

  render() {
    return (
      <div className="flex flex-col m-auto">
        <div className="flex flex-row w-auto m-auto">
          <h1 className="text-xl font-semibold">Github Calendar</h1>
        </div>
        <div className="flex flex-row w-full">
          <Cell editable={false} color={"bg-transparent"} />
          <Controls />
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-auto">
            <div className="flex flex-row w-auto">
              <Cell editable={false} color={"bg-transparent"} />
            </div>
            <div className="flex flex-row w-full">
              <GithubCalendarWeekStrip />
            </div>
          </div>
          <div className="flex flex-col w-auto">
            <div className="flex flex-row w-full">
              <GithubCalendarMonthStrip />
            </div>
            <div className="flex flex-row w-full">
              {this.state.data.map((data, index) => (
                <GithubCalendarWeek key={index} data={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}