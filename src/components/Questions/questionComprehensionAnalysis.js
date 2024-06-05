import React, { useContext, useEffect, useState } from "react";
import {AnswerSummary} from "../../pages/AnalysisDashboard/AnswerSummary";


export const QuestionComprehensionAnalysis = ({  question }) => {
  return (
    <>
      <AnswerSummary isComp={true}  data={question}
      />
      {question.subs.map((SubQuestion, index) => {
        return (
            <React.Fragment key={SubQuestion.id}>
            <AnswerSummary  isCompSub={true} data={SubQuestion}
                       />
            </React.Fragment>
        );
      })}
    </>
  );
};
