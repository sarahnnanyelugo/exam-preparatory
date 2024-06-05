import React from "react";
import "./admins.scss";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { columnDef } from "./columns";

export const Users = ({ globalFilter, onGlobalFilterChange, data, meta, currentPage, onGotoNextPage, onGotoPrevPage,
                          handle,isBusiness}) => {
    const finalData = React.useMemo(() => data, [data]);
    const finalColumn = React.useMemo(() => columnDef(handle,isBusiness), []);

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
        // onPaginationChange: onChangePage,
        // getCanNextPage: (x) => console.log(x),
    });

    const handleGotoNext = () => {
        tableInstance.setPageIndex(onGotoNextPage());
    };

    const handleGotoPrevious = () => {
        tableInstance.setPageIndex(onGotoPrevPage());
    };

    return (
        <>
            <table style={{ borderCollapse: "separate", borderSpacing: "0px 15px" }}>
                <thead>
                {tableInstance.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
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
                        <tr className="questions-div" key={rowEl.id}>
                            {rowEl.getVisibleCells().map((cellEl) => {
                                return (
                                    <td
                                        className={`col-md-1`}
                                        key={cellEl.id}
                                    >
                                        {flexRender(cellEl.column.columnDef.cell, cellEl.getContext(), cellEl.row.original)}{" "}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div>
                Showing {tableInstance.getPageCount()?currentPage:0} to {tableInstance.getPageCount()} of {meta.totalItems} entries

            </div>
            <button onClick={handleGotoPrevious} disabled={currentPage === 1 || !tableInstance.getPageCount()} type="button" className="button left">
                {"<"}
            </button>
            <button onClick={handleGotoNext} disabled={currentPage === tableInstance.getPageCount() || !tableInstance.getPageCount()} type="button" className="button">
                {">"}
            </button>
        </>
    );
};
