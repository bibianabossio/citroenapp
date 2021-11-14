import React from "react";
import "./Title.css";

const Title = ({ text }) => {
  return (
    <div >
      <label className="title-label">{text}</label>
    </div>
  );
};
export default Title;
