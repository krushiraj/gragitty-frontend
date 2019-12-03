import React from "react";

const Cell = ({ color, count, editable = true }) => (
  <div
    style={{ height: "15px", margin: "2px 0" }}
    className={`w-full ${color || "bg-gray-300"} ${editable && "border-2 hover:border-red-600"}`}
  ></div>
);

export default Cell;