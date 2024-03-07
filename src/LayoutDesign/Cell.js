import React, { useState } from "react";

export const Cell = ({updateValue,rowIndex,colIndex}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={isActive ? "active column" : "column"}
      key={colIndex}
      onClick={() => {
        updateValue(rowIndex, colIndex, 1);
        setIsActive(!isActive);
      }}
    ></div>
  );
};
