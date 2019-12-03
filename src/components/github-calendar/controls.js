import React from "react";

export default class Controls extends React.Component {
  state = {
    from: '',
    to: ''
  }

  render() {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-row-reverse w-auto text-right">
          <button className="mx-2 bg-transparent text-green-400 hover:bg-green-400 hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded">
            Update
          </button>
          <button className="mx-2 bg-transparent text-red-400 hover:bg-red-400 hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded">
            Discard
          </button>
        </div>
        <div className="flex flex-row w-auto text-right">
          (prev week) Controls come here (from dropdown) - (to dropdown)
          (nextweek)
        </div>
      </div>
    );
  }
}