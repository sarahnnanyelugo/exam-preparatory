import React, { useContext, useEffect, useState } from "react";

import parse from "html-react-parser";

export const QuestionSubjective = ({  options,currentIndex,examAnswers,setChecked }) => {
  const handleSelected = (e) => {
    return setChecked(currentIndex, e.target.value);
  };

  return (
    <>

    </>
  );
};
