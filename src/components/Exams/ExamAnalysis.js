import React from "react";
import "./exams.scss";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnDef } from "./columns";
import { columnAnalysisDef } from "./columnsAnalysis";
import { ErrorView } from "../../pages/Helpers/errorView";
import Prev from "../../assets/images/left-play.png";
import Next from "../../assets/images/play-right.png";
export const ExamAnalysis = ({
  globalFilter,
  onGlobalFilterChange,
  data,
  meta,
  currentPage,
  onGotoNextPage,
  onGotoPrevPage,
  isAdmin,
  isBusiness,
}) => {
  const finalData = React.useMemo(() => data, [data]);
  const finalColumn = React.useMemo(
    () => columnAnalysisDef(isAdmin, isBusiness),
    []
  );

  const tableInstance = useReactTable({
    columns: finalColumn,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(meta.totalItems / +meta.pageSize),
    manualFiltering: true,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: onGlobalFilterChange,
  });

  const handleGotoNext = () => {
    tableInstance.setPageIndex(onGotoNextPage());
  };

  const handleGotoPrevious = () => {
    tableInstance.setPageIndex(onGotoPrevPage());
  };

  return (
    <>
      {isAdmin || tableInstance.getPageCount() ? (
        <>
          <table
            className={isAdmin ? "table-col" : ""}
            style={{ borderCollapse: "separate", borderSpacing: "0px 15px" }}
          >
            <thead>
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstance.getRowModel().rows.map((rowEl) => {
                return (
                  <tr
                    className={`questions-div ${isAdmin ? "" : "normal"}`}
                    key={rowEl.id}
                  >
                    {rowEl.getVisibleCells().map((cellEl) => {
                      return (
                        <td
                          className={`col-md-${
                            cellEl.column.id === "num"
                              ? ""
                              : cellEl.column.id === "examType"
                              ? "1"
                              : cellEl.column.id === "examDetails"
                              ? "4"
                              : cellEl.column.id === "examAttr"
                              ? "2"
                              : cellEl.column.id === "examMarks"
                              ? "4"
                              : cellEl.column.id === "unitNum"
                              ? "2"
                              : "2"
                          }`}
                          key={cellEl.id}
                        >
                          {flexRender(
                            cellEl.column.columnDef.cell,
                            cellEl.getContext(),
                            cellEl.row.original
                          )}{" "}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* <div>
           {!!tableInstance.getPageCount() && (
               <>
                 Showing {tableInstance.getPageCount()?currentPage:0} to {tableInstance.getPageCount()} of {meta.totalItems} entries
               </>
           )}
         
         </div> */}
          {/* <button onClick={handleGotoPrevious} disabled={currentPage === 1 || !tableInstance.getPageCount()} type="button" className="button left">
             {"<"}
         </button>
         <button onClick={handleGotoNext} disabled={currentPage === tableInstance.getPageCount() || !tableInstance.getPageCount()} type="button" className="button">
             {">"}
         </button> */}
          <div className="page-navigation d-flex">
            <div className="page-num">
              {" "}
              <p>Items per page: 20 items</p>
            </div>

            <div className="offset-md-8 page-items d-flex">
              <div className="numberings">
                {" "}
                <p>
                  {" "}
                  Page {tableInstance.getPageCount() ? currentPage : 0} of{" "}
                  {tableInstance.getPageCount()}
                </p>
              </div>
              <div className="btn-div">
                {" "}
                <button
                  style={{ float: "right" }}
                  onClick={handleGotoPrevious}
                  disabled={currentPage === 1 || !tableInstance.getPageCount()}
                  type="button"
                  className="button left"
                >
                  <img src={Prev} width="20px" />
                </button>{" "}
              </div>
              <div>
                {" "}
                <button
                  style={{ float: "right" }}
                  onClick={handleGotoNext}
                  disabled={
                    currentPage === tableInstance.getPageCount() ||
                    !tableInstance.getPageCount()
                  }
                  type="button"
                  className="button"
                >
                  <img src={Next} width="20px" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ErrorView />
      )}
    </>
  );
};
