import "./GhostExamListLoader.scss";

export const GhostExamListLoader = () => {
  return (
    <div className="gcontainer">
      <div className="ghostlogo ganimate"></div>
      <div className="gsession_subject">
        <div className="gsubject ganimate"></div>
        <div className="gsession ganimate"></div>
      </div>
      <div className="gduration_questions">
        <div className="gduration ganimate"></div>
        <div className="gquestions ganimate"></div>
      </div>
      <div className="gmarks ganimate"></div>
      <div className="gunit ganimate"></div>
      <div className="gactionbtn ganimate"></div>
    </div>
  );
};
