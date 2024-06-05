import React, { useState } from "react";
import EducareNavBar from "../../components/EducareNavBar/EducareNavBar";
import { Exams } from "../../components/Exams/Exams";
import { exams } from "../../TestData";

export const DemoPage = () => {
  const [state, setState] = useState({
    query: "",
    list: exams.slice(0, 4),
  });
  return (
    <>
      <EducareNavBar />

      <div className="mt col-md-10 offset-md-1">
        <h3>Please select a question</h3>
        <div className="row ">
          {state.list.map((data, index) => (
            <Exams data={data} />
          ))}
        </div>
      </div>
    </>
  );
};
