import React from "react";
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

export const ExamCardEmpty = ({ }) => {

  return (
    <>
        {/*<Row>*/}
        {/*    <Col  >*/}
        {/*        <Card>*/}
        {/*            <Card.Body >*/}
        {/*                No Data Found*/}
        {/*            </Card.Body>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}
        {/*</Row>*/}
        <p>No results found</p>
    </>
  );
};
