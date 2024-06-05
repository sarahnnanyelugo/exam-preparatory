import React from "react";
import "./exams.scss";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable }
    from "@tanstack/react-table";
import { columnDef } from "./columns";
import {columnAnalysisDef} from "./columnsAnalysis";
import {ErrorView} from "../../pages/Helpers/errorView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Time from "../../assets/images/time.svg";
import Question from "../../assets/images/question.svg";
import Tick from "../../assets/images/tick.svg";
import {TestModal} from "../TestModal/TestModal";
import {ExportButton} from "../ExportButton/ExportButton";
import Icon from "../../assets/images/analyse.svg";
import {Link} from "react-router-dom";

export const ExamCardAnalysis= ({ globalFilter,
                                   onGlobalFilterChange, data,
                                 meta,currentPage,handleGotoNext,
                                  handleGotoPrevious}) => {
  const pageCount = Math.ceil(meta.totalItems / +meta.pageSize);
  const handleButtonClick = (id) => {

  };

  return (

    <>
        { pageCount ? (
     <>
       <Row xs={1} md={1} className="div-row questions-div">
         {data.map((test, idx) => (
             <Col key={idx} className="g-2">
               <Card onClick={() => {handleButtonClick(test.id)}}>
                 <Card.Body className="card-exam" style={{ padding: '1rem' }}>
                   <Stack direction="horizontal" style={{ marginBottom: '1rem' }} gap={3}>
                     {/*<b>{test.sn}</b>*/}
                     <img src={test.examLogo} alt="logo" width="50px" height="50px" className="examlogo"/>
                     <div>
                       {/*    <Card.Body>*/}
                       <small><b>{test.subject}</b></small><br/>
                       <small>{test.session}</small>
                       {/*    </Card.Body>*/}
                     </div>
                   </Stack>
                   <Row>
                     <Col>
                       <div className="flexy" style={{marginBottom: "7px"}}>
                         <small><b>Date Attempted:</b> {" "}{test.attemptDate.date}</small>
                       </div>
                     </Col>
                   </Row>
                   <Row>
                     <Col>
                       <div className="flexy" style={{marginBottom: "7px"}}>
                         <small><b>Time Used:</b> {" "}{test.attemptDate.time}</small>
                       </div>
                     </Col>
                   </Row>
                   <Row>
                     <Col>
                       <div className="flexy" style={{marginBottom: "7px"}}>
                          <small><b>Total Score</b>: {" "}{test.score}</small>
                       </div>
                     </Col>
                   </Row>
                   <Stack direction="horizontal" gap={0}>
                     <div className="p-2 ms-auto">
                       <Link to={`/analysis-dashboard/${test.action}`}>
                         <button className="no-mag">
                           <img src={Icon} alt="icon" />
                           Details
                         </button>
                       </Link>
                     </div>
                     <div className="p-2">
                       {/*<TestModal openTest={openTest} handle={handle} isContinue={test.action} rowData={test}/>*/}
                       <ExportButton setOpenTest={handleButtonClick} className="exp-btn no-mag" id={test.action} />
                     </div>
                   </Stack>
                 </Card.Body>
                 {/*<Card.Footer>*/}

                 {/*</Card.Footer>*/}
               </Card>
             </Col>
         ))}
       </Row>
       <Row xs={3} md={3} className="div-roww">
         <Col  className="g-2">
           <button onClick={handleGotoPrevious} disabled={currentPage === 1}  type="button" className="button left pag-btn">
             {"<"}
           </button>
         </Col>
         <Col  className="g-2">
           <div>
             Page {currentPage} of {pageCount}
           </div>
         </Col>
         <Col  className="g-2 text-right">
           <button onClick={handleGotoNext} disabled={currentPage === pageCount}   type="button" className="button pag-btn">
             {">"}
           </button>
         </Col>

       </Row>
     </>
            ):(<ErrorView  />)}
    </>

  );
};
