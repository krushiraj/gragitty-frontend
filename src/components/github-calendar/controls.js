import React from "react";

export default class Controls extends React.Component {
  state = {
    from: '',
    to: ''
  }

  render() {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-auto text-right">
          (discard) (update)
        </div>
        <div className="flex flex-row w-auto text-right">
          (prev week) Controls come here (from dropdown) - (to dropdown) (nextweek)
        </div>
      </div>
    );
  }
}