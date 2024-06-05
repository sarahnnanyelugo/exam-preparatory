import Time from "../../assets/images/time.svg";
import Tick from "../../assets/images/tick.svg";
import Question from "../../assets/images/question.svg";
import Jamb from "../../assets/images/jamb.png";
import {Link} from "react-router-dom";
import Icon from "../../assets/images/analyse.svg";
import {ExportButton} from "../ExportButton/ExportButton";
import parse from "html-react-parser";
import {ActionButton} from "../ActionButton/ActionButton";

export const columnFlaggedAnalysisDef = (isAdmin,isBusiness) => {
    let analysisItems = [];
    const prefix = isBusiness?"business":"admin";
    analysisItems.push(
        // {accessorKey: "sn", header: "#", cell: ({getValue}) =>
        //         <div style={{padding: "0px 15px"}}>{getValue()}
        //         </div>},
        {
            accessorKey: "question",
            header: "Question",
            cell: ({getValue}) => {
                return (
                    <div className="row3">
                        <small>{parse(getValue())}</small>
                    </div>
                )
            },
        },
        {
            accessorKey: "reason",
            header: "Reason",
            cell: ({getValue}) => {
                const value = getValue()?getValue():"";
                return (
                    <div className="row3">
                        <small>{parse(value)}</small>
                    </div>
                )
            },
        },
        {
            accessorKey: "title",
            header: "Test Title",
            cell: ({getValue}) => {
                return (
                    <div className="row4">
                        <small>{getValue()}</small>
                    </div>
                )
            },
        });
    if(isAdmin){
        analysisItems.push(
            {
                accessorKey: "examFullName",
                header: "Learner's Name",
                cell: ({getValue}) => {
                    return (
                        <div className="row1">
                            <small>{getValue()}</small>
                        </div>
                    )
                },
            });
    }
    analysisItems.push(


        {
            accessorKey: "attemptDate",
            header: "Date Attempted",
            cell: ({getValue}) => {
                const date = getValue();
                return (
                    <div className="row3">
                        <small>{date.date}</small>
                        <br/>
                        <small>{date.time}</small>
                    </div>
                )
            },
        }
        ,
        // {
        //     accessorKey: "examLogo",
        //     header: "",
        //     cell: ({getValue}) => {
        //         const imageitem = getValue();
        //         return (<div className="row4">
        //                 <img src={imageitem} alt="logo" width="50px" height="50px" className="examlogo"/>
        //             </div>
        //         )
        //     },
        // }
        {
            accessorKey: "action",
            header: "Action",
            cell: ({getValue}) => {
                const action = getValue();
                return (
                    <div className="row3 analy-btn"  style={{paddingRight: "10px"}}>
                        {action.status === 0 && (
                            <>
                                <ActionButton title="Resolved" mode="1"
                                              className="resolve-btn" id={action.id}/>
                                <ActionButton title="Remove"
                                              className="remove-btn" mode="2" id={action.id}/>
                            </>
                        )}
                    </div>
                );
            },
        }
        );
    // console.log(analysisItems);
    return analysisItems;
}
