import Time from "../../assets/images/time.svg";
import Tick from "../../assets/images/tick.svg";
import Question from "../../assets/images/question.svg";
import Jamb from "../../assets/images/jamb.png";
import {Link} from "react-router-dom";
import Icon from "../../assets/images/analyse.svg";
import {ExportButton} from "../ExportButton/ExportButton";

export const columnAnalysisDef = (isAdmin,isBusiness) => {
    let analysisItems = [];
    const prefix = isBusiness?"business":"admin";
    analysisItems.push(
        {accessorKey: "sn", header: "#", cell: ({getValue}) =>
                <div style={{padding: "0px 15px"}}>{getValue()}
                </div>},
        {
            accessorKey: "examLogo",
            header: "",
            cell: ({getValue}) => {
                const imageitem = getValue();
                return (<div className="row4">
                        <img src={imageitem} alt="logo" width="50px" height="50px" className="examlogo"/>
                    </div>
                )
            },
        });
    if(isAdmin){
        analysisItems.push(
            {
                accessorKey: "examFullName",
                header: "Full Name",
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
            accessorKey: "session",
            header: "Name",
            cell: ({getValue}) => {
                const subjectitem = getValue();
                return (
                    <div className="row1">
                        <small>{subjectitem}</small>
                    </div>
                );
            },
        },
        {
            accessorKey: "subject",
            header: "Subjects",
            cell: ({getValue}) => {
                const subject = getValue();
                return (
                    <>
                        <div className="row4">
                            <small>{subject}</small>
                        </div>
                    </>
                );
            },
        },
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
        },
        {
            accessorKey: "score",
            header: "Total Score",
            cell: ({getValue}) => {
                return (
                    <div className="row3">
                        <small>{getValue()}</small>
                    </div>
                )
            },
        },
        {
            accessorKey: "duration",
            header: "Time Used",
            cell: ({getValue}) => {
                return (
                    <div className="row4">
                        <small>{getValue()}</small>
                    </div>
                )
            },
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({getValue}) => {
                const id = getValue();
                return (
                    <div className="row3 analy-btn"  style={{paddingRight: "10px"}}>
                        <Link to={isAdmin?`/${prefix}/analysis-dashboard/${id}`:`/analysis-dashboard/${id}`}>
                            <button className="no-mag">
                                <img src={Icon} alt="icon"/>
                                Details
                            </button>
                        </Link>
                        <ExportButton className="exp-btn no-mag" id={id}/>
                    </div>
                );
            },
        }
        );
    // console.log(analysisItems);
    return analysisItems;
}
