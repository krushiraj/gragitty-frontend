import React from "react";

const Cell = ({ color, count }) => (
  <div
    style={{ height: "15px", margin: "2px 0" }}
    className={`w-full ${color || "bg-gray-300"}`}
  ></div>
);

export default Cell;