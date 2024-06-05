import React from "react";
import "./question-num.scss";
export const QuestionNum = ({ questionAnswer, bg, callBack }) => {
  const handleClick = (e) => {
    return callBack(questionAnswer.index);
  };
  return (
    <div className="col">
        <button className={`question-btn ${bg}`} onClick={handleClick} >
        {questionAnswer.index+1}
      </button>
    </div>
  );
};
