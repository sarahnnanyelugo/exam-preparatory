import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../../components/Badge/Badge";
import "./questions.scss";
import parse from "html-react-parser";
import {QuestionRadio} from "../../../components/Questions/questionRadio";
import {QuestionCheck} from "../../../components/Questions/questionCheck";
import {QuestionSubjective} from "../../../components/Questions/questionSubjective";
import {QuestionComprehension} from "../../../components/Questions/questionComprehension";
import {useSelector} from "react-redux";

export const ReviewedQuestions = ({ question,examAnswers,IsAnswered,IsAnsweredCls,setChecked,keyIndex,isComp,mainIndex}) => {
    const examTypes = useSelector((state) => state.exam.examTypes);
    const handleSelected = (e) => {
    }
    const handleSelectedMain = (e) => {
    return setChecked(keyIndex);
  };

  return (
    <div className="col-md-12 ">
      <div className="title-div ">
        {" "}
        <div className="flexy flexyM">
          <h6 style={{ flexGrow: "1" }}>Question {question.questionNum}</h6>
          <Badge text={IsAnswered} cls={IsAnsweredCls} />
        </div>
        <hr />
      </div>
      <div className="flexy div-img">
        <div style={{ height: "auto", flexGrow: "1" }} className="col-md-9">
          {" "}
          {parse(question.question)}
          {(question.option_type_id === examTypes.singleAnswer &&
              <QuestionRadio mainIndex={isComp?mainIndex:''}
                             options={question.options}
                             currentIndex={keyIndex}
                             examAnswers={examAnswers}
                             setChecked={handleSelected} />)
          || (question.option_type_id  === examTypes.multipleAnswer &&
              <QuestionCheck mainIndex={isComp?mainIndex:''} options={question.options} currentIndex={keyIndex}
                             examAnswers={examAnswers}
                             setChecked={handleSelected} />)
          || (question.option_type_id  === examTypes.subjective &&
              <QuestionSubjective options={question.options} currentIndex={keyIndex}
                                  examAnswers={examAnswers}
                                  setChecked={handleSelected} />)
          || (question.option_type_id  === examTypes.comprehension &&
              <QuestionComprehension question={question}  currentIndex={keyIndex}
                                     examAnswers={examAnswers}
                                     setChecked={handleSelected} />)
          }
        </div>
        <div className="mt offset-md-1 ">
                <Badge handleSelected={handleSelectedMain}   text="Go to question" cls="plain" />
        </div>
      </div>
      <hr />
    </div>
  );
};
