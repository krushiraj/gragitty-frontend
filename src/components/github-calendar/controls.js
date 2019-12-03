import React from "react";

import left from "../../static/left.svg";
import right from "../../static/right.svg";


export default class Controls extends React.Component {
  state = {
    from: '',
    to: ''
  }

  render() {
    return (
      <div className="flex flex-col w-full">
        <div className="my-2 flex flex-row-reverse w-auto text-right">
          <button className="mx-2 bg-transparent text-green-400 hover:bg-green-400 hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded">
            Update
          </button>
          <button className="mx-2 bg-transparent text-red-400 hover:bg-red-400 hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded">
            Discard
          </button>
        </div>
        <div className="h-auto my-2 flex flex-row w-auto text-right">
          <button className="h-10 mt-auto mb-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 inline-flex items-center">
            {/* <img className="m-0 p-0" src={left} /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              style={{ padding: 0, margin: 0 }}
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            Prev
          </button>{" "}
          <div className="text-left">
            <label htmlFor="from">From</label>
            <input
              className="h-10 border border-gray-700"
              type="date"
              name="from"
            ></input>
          </div>
          <div className="text-left">
            <label htmlFor="to">To</label>
            <input
              className="h-10 border border-gray-700"
              type="date"
              name="to"
            ></input>
          </div>
          <button className="h-10 mt-auto mb-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            Next
          </button>
        </div>
      </div>
    );
  }
}