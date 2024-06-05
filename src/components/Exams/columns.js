import Time from "../../assets/images/time.svg";
import Tick from "../../assets/images/tick.svg";
import Question from "../../assets/images/question.svg";
import Jamb from "../../assets/images/jamb.png";
// import Waec from "../../assets/images/waec.png";
import { TestModal } from "../TestModal/TestModal";

export const columnDef = (handle) => {
  return [
    {accessorKey: "num", header: "ID", cell: ({getValue}) => <div style={{padding: "0px 15px"}}>{getValue()}</div>},
    {
      accessorKey: "examType",
      header: "Exam Type",
      cell: ({getValue}) => {
        const imageitem = getValue().image;
        return (<div className="row4">
              <img src={imageitem} alt="logo" width="50px" height="50px" className="examlogo"/>
            </div>
        )
      },
    },
    {
      accessorKey: "examDetails",
      header: "Exam Details",
      cell: ({getValue}) => {
        const subjectitem = getValue().subject;
        const sessionitem = getValue().session;
        return (
            <div className="row1">
              <h6>{subjectitem}</h6>
              <p>{sessionitem}</p>
            </div>
        );
      },
    },
    {
      accessorKey: "examAttr",
      header: "Exam Details",
      cell: ({getValue}) => {
        const duration = getValue().duration;
        const number = getValue().number;
        return (
            <>
              <div className="flexy row2" style={{marginBottom: "7px"}}>
                <img src={Time} alt="logo" width="22px" height="22px" style={{marginRight: "4px"}}/>
                <small>{duration} mins</small>
              </div>
              <div className="flexy">
                <img src={Question} alt="logo" width="22px" height="22px" style={{marginRight: "4px"}}/>
                <small>{number} questions</small>
              </div>
            </>
        );
      },
    },
    {
      accessorKey: "examMarks",
      header: "Exam Marks",
      cell: ({getValue}) => (
          <div className="flexy row3">
            <img src={Tick} alt="logo" width="22px" height="22px" style={{marginRight: "4px"}}/>
            <small>{getValue()} marks</small>
          </div>
      ),
    },
    {
      accessorKey: "unitNum",
      header: "Units",
      cell: ({getValue}) => {
        const units = getValue() === 0 ? "Free" : `${getValue()} Units`;
        return <small>{units}</small>;
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (row, {getValue}) => {
        return (
            <div style={{paddingRight: "10px"}}>
              <TestModal handle={handle} isContinue={row.row.original.action}
                         rowData={row.row.original} isProfileNotComplete={row.row.original.isProfileNotComplete}/>
            </div>
        );
      },
    },
  ];
}
