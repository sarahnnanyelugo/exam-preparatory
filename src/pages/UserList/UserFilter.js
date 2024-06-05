import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setGlobalFilter} from "../../store/slices/examSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchableDropdown from "../../components/dropDown/SearchableDropdown";
import {setGlobalUserFilter} from "../../store/slices/adminSlice";

export const UserFilter = ({Desktop,TabletAndBelow,handleSearch,show,
                               handleClose}) => {
    const dispatch = useDispatch();
    const filters = JSON.parse(localStorage.getItem(`filterUsers`) || "{}");
    const [typeFilter, setTypeFilter] = useState(filters.typeFilter || "");
    const inputRef = useRef(null);
    const [query, setQuery] = useState("");

    const handleTypeChange = (val) => {
        setTypeFilter(val);
        handleFilterChange(val,1);
    };

    const handleFilterChange = (val,mode) => {
        const payload ={
            typeFilter
        };
        if(mode === 1)payload.typeFilter = val;

        dispatch(setGlobalUserFilter(payload));
    }
    const handleSearchReset = () => {
        const payload = {
            typeFilter:""
        };
        dispatch(setGlobalUserFilter(payload));
        handleSearch(true);
    }

    const getDisplayValue = () => {
        if (query) return query;
        if (typeFilter) return typeFilter;
        return "";
    };

  return (
    <>
        <Desktop>
            <div className="flexy question-type-div">
                <div className="col-md-11 flexy">
                    {" "}
                    <div className="col-md-12">
                        <h6>User Search:</h6>
                        <div className="control">
                            <div className="selected-value">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={getDisplayValue()}
                                    placeholder="Search Name, Email..."
                                    name="searchTerm"
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        handleTypeChange(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 ">
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </Desktop>
        <TabletAndBelow>
            <div  className="col-md-4 instructions4">
                <Offcanvas
                    show={show}
                    onHide={handleClose}
                    backdrop={false}
                    responsive="lg"
                    placement="bottom"
                    scroll={true}
                    style={{
                        height: "auto",
                        maxHeight: "100vh",
                        width: "100%",
                        maxWidth: "100%",
                    }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="flexy question-type-div">
                            <div className="col-md-11 flexy">
                                {" "}
                                <div className="col-md-12">
                                    <h6>User Search:</h6>
                                    <div className="control">
                                        <div className="selected-value">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={getDisplayValue()}
                                                name="searchTerm"
                                                onChange={(e) => {
                                                    setQuery(e.target.value);
                                                    handleTypeChange(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 mobile-filter">
                                <button onClick={handleSearch}>Filter</button>
                                <button className="mobile-reset" onClick={handleSearchReset}>Reset</button>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </TabletAndBelow>

    </>
  );
};
