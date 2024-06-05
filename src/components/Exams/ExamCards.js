import React, {useState} from "react";
import "./exams.scss";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { columnDef } from "./columns";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Time from "../../assets/images/time.svg";
import Question from "../../assets/images/question.svg";
import Tick from "../../assets/images/tick.svg";
import {TestModal} from "../TestModal/TestModal";

export const ExamCards = ({ data, handle,handleGotoPrevious,
                              handleGotoNext,meta,currentPage}) => {
    const [ openTest, setOpenTest] = useState("");
    const handleButtonClick = (id) => setOpenTest((s) => id);

    const pageCount = Math.ceil(meta.totalItems / +meta.pageSize);
  return (
    <>
        <Row xs={1} md={1} className="div-row questions-div">
            {data.map((test, idx) => (
                <Col key={idx} className="g-2">
                    <Card onClick={() => {handleButtonClick(test.id)}}>
                        <Card.Body className="card-exam" style={{ padding: '1rem' }}>
                            <Stack direction="horizontal" style={{ marginBottom: '1rem' }} gap={3}>
                                <b>{test.sn}</b>
                                <img src={test.examType.image} alt="logo" width="50px" height="50px" className="examlogo"/>
                                <div>
                                {/*    <Card.Body>*/}
                                        <small><b>{test.examDetails.subject}</b></small><br/>
                                        <small>{test.examDetails.session}</small>
                                {/*    </Card.Body>*/}
                                </div>
                            </Stack>

                            <Row>
                                <Col className="firstc"><div className="flexy" style={{marginBottom: "7px"}}>
                                    <img src={Time} alt="logo" width="15px" height="15px" style={{marginRight: "2px"}}/>
                                    <small>{test.examAttr.duration} mins</small>
                                </div></Col>
                                <Col>
                                    <div className="flexy" style={{marginBottom: "7px"}}>
                                        <img src={Question} alt="logo" width="15px" height="15px" style={{marginRight: "2px"}}/>
                                        <small>{test.examAttr.number} questions</small>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="flexy" style={{marginBottom: "7px"}}>
                                        <img src={Tick} alt="logo" width="15px" height="15px" style={{marginRight: "2px"}}/>
                                        <small>{test.examMarks} marks</small>
                                    </div>
                                </Col>
                            </Row>
                            <Stack direction="horizontal" gap={0}>
                                <div className="p-2"> <small>{test.unitNum === 0 ? "Free" : `${test.unitNum} Units`}</small></div>
                                <div className="p-2 ms-auto">
                                    <TestModal setOpenTest={handleButtonClick} openTest={openTest} handle={handle} isContinue={test.action}
                                               isProfileNotComplete={test.isProfileNotComplete} rowData={test}/>

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
  );
};
