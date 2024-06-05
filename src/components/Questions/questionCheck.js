import React, { useContext, useEffect, useState } from "react";

import parse from "html-react-parser";

export const QuestionCheck = ({ options,currentIndex,examAnswers,setChecked,mainIndex }) => {
  const handleSelected = (e) => {
    return handleClicked(currentIndex, e.target.value);
  };
  const handleClicked = (e,id) => {
    if(!mainIndex)
      return setChecked(currentIndex, id);
    else
      return setChecked(mainIndex, id,currentIndex);
  };
  return (
    <>
      {options.map((item, index) => {
        return (
            <div className="label-hover label-hover-answer"
                 onClick={(e)=>{handleClicked(e,item.text.id)}}
                 key={index}>
              <span> {item.label}</span>
              <input type="checkbox" checked={examAnswers[currentIndex]['answer'][item.text.id] === item.text.id}
                     id={`answer-${item.text.id}`}
                     value={item.text.id} onChange={handleSelected}/>
              {/*<label htmlFor={`answer-${item.label}`}>*/}
               {parse(item.text.value)}
              {/*</label>*/}
            </div>
        );
      })}
    </>
  );
};
