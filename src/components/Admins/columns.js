import Time from "../../assets/images/time.svg";
import Tick from "../../assets/images/tick.svg";
import Question from "../../assets/images/question.svg";
import Jamb from "../../assets/images/jamb.png";
import {flexRender} from "@tanstack/react-table";
import React from "react";
import parse from "html-react-parser";
// import Waec from "../../assets/images/waec.png";

export const columnDef = (handle,isBusiness) => {
    let userItems = [];
    userItems.push(
    {
      accessorKey: "DT_RowId",
      header: "#",
      cell: ({getValue}) => {
        return (<div>{getValue()}</div>)
      }
    },
    {
      accessorKey: "img",
      header: "",
      cell: ({getValue}) => {
        const imageitem = getValue();
        return (<div className="row4">
              <img src={imageitem} alt="logo" width="50px" height="50px" className="examlogo"/>
            </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    });
    if(false) {
        userItems.push({
            accessorKey: "role",
            header: "Role",
            cell: ({getValue}) => {
                return (
                    <div className="">
                        <p>{getValue()}</p>
                    </div>
                );
            },
        });
    }
    userItems.push({
        accessorKey: "schoolName",
        header: "School Name",
        cell: ({getValue}) => {
            return (
                <div className="">
                    <p>{getValue()}</p>
                </div>
            );
        },
    },{
      accessorKey: "attempts",
      header: "Total Attempt",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    },
    {
      accessorKey: "test_count",
      header: "Total Test Completed",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    },
    {
      accessorKey: "google",
      header: "Google SignIn",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    },
    {
      accessorKey: "country",
      header: "Country / State",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    },
    {
      accessorKey: "test_title",
      header: "Test Title",
      cell: ({getValue}) => {
        const test_title = getValue();
        return (
            !!!test_title.more?(<div className="" >
                    <p>{parse(test_title.main)}</p>
                  </div>):(
                <div className="">
                  {parse(test_title.main)}
                  ...More
                  {/*  <p>*/}
                  {/*    `}*/}
                  {/*  </p><span id="dots${test_title.id}"></span><p id="id${test_title.id}" class="more">${parse(test_title.more)}</p><a  id="idb${test_title.id}" onclick="openMore(${test_title.id})"> More...</a>`}*/}
                  {/*  </p>*/}
                </div>
            )
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "SignUp Date",
      cell: ({getValue}) => {
        return (
            <div className="">
              <p>{getValue()}</p>
            </div>
        );
      },
    }
  );
    return userItems;
}
