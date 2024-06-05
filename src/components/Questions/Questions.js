import React from "react";
import "./questions.scss";
import parse from "html-react-parser";
import {QuestionCheck} from "./questionCheck";
import {QuestionRadio} from "./questionRadio";
import {QuestionSubjective} from "./questionSubjective";
import {QuestionComprehension} from "./questionComprehension";
import {useSelector} from "react-redux";
import Flag from "../../assets/images/flag.png";
import Flag2 from "../../assets/images/flag2.png";

export const Questions = ({ question,currentIndex,examAnswers,setChecked
                              ,isComp,mainIndex,setFlagged}) => {
    const examTypes = useSelector((state) => state.exam.examTypes);

    const handleClicked = (e) => {
        setFlagged(currentIndex);
    };

    return (
    <div className={`col-md-12 ${isComp ? "mag-left-comp" : ""}`}>
      <div className={`title-div ${isComp ? "mag-top-comp" : ""}`}>
       <div className={'question-report'}>
           <h6>Question {question.questionNum}</h6>
           {isComp?"":(
           <button className={`${examAnswers[currentIndex]['flagged']?'flagged':''}`} onClick={(e) =>
           {handleClicked(e)}} title="Flag question"><img className={`logo`} src={examAnswers[currentIndex]['flagged']?Flag2:Flag} alt="Scholar" /></button>)}
       </div>
            {parse(question.question)}
      </div>
      <div>
          {(question.option_type_id === examTypes.singleAnswer &&
              <QuestionRadio mainIndex={isComp?mainIndex:''}  options={question.options}
                             currentIndex={currentIndex}
                             examAnswers={examAnswers}
                             setChecked={setChecked} />)
          || (question.option_type_id === examTypes.multipleAnswer &&
              <QuestionCheck mainIndex={isComp?mainIndex:''} options={question.options} currentIndex={currentIndex}
                             examAnswers={examAnswers}
                             setChecked={setChecked} />)
          || (question.option_type_id === examTypes.subjective &&
              <QuestionSubjective options={question.options} currentIndex={currentIndex}
                                  examAnswers={examAnswers}
                                  setChecked={setChecked} />)
          || (question.option_type_id === examTypes.comprehension &&
              <QuestionComprehension question={question} currentIndex={currentIndex}
                                     examAnswers={examAnswers}
                                     setChecked={setChecked} />)
          }
      </div>
    </div>
  );
};
