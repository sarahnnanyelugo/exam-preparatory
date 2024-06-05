import React, { useContext, useEffect, useState } from "react";

import parse from "html-react-parser";
import {Questions} from "./Questions";

export const QuestionComprehension = ({  question,currentIndex,examAnswers,setChecked }) => {
  return (
    <>
      {question.sub_questions.map((SubQuestion, index) => {
        return (
            <React.Fragment key={SubQuestion.id}>
            <Questions mainIndex={currentIndex} isComp={true} question={SubQuestion}
                       setChecked={setChecked}
                       currentIndex={SubQuestion.id}
                       examAnswers={examAnswers[currentIndex]['answers']} />
            </React.Fragment>
        );
      })}
    </>
  );
};
