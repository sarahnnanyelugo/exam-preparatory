import React, { useEffect, useState } from "react";
import "./review.scss";
import { ReviewedQuestions } from "./ReviewedQuestions/Questions";
import { useDispatch, useSelector } from "react-redux";
import {prepareReview, setExamQuestions} from "../../store/slices/examSlice";

export const ReviewPage = (gotoQuestion) => {
  const reviewQuestions = useSelector((state) => state.exam.reviewQuestions);
  const examQuestions = useSelector((state) => state.exam.questions);
  const examAnswers = useSelector((state) => state.exam.questionAnswers);
    const dispatch = useDispatch();

  const setChecked = (id, index) => {
    dispatch(prepareReview({ index: id,flag: 2 }));
  };

  return (
    <>
          <div className="col-md-8 offset-md-2 review-board">
            <div className="row ">
              {reviewQuestions?.questionAttended.map((key, index) => (
                <ReviewedQuestions keyIndex={key} examAnswers={examAnswers} IsAnswered={'Answered'} IsAnsweredCls={'correct'} question={examQuestions[key]} key={key} setChecked={setChecked} />
              ))}
              {reviewQuestions?.questionNotAttended.map((key, index) => (
                  <ReviewedQuestions keyIndex={key} examAnswers={examAnswers} IsAnswered={'Unanswered'} IsAnsweredCls={'unanswered'} question={examQuestions[key]} key={key} setChecked={setChecked} />
              ))}
            </div>
          </div>
    </>
  );
};
