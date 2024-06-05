import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setGlobalFilter} from "../../store/slices/examSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchableDropdown from "../../components/dropDown/SearchableDropdown";
import "../ExamList/exam-list.scss"
import "./flaggedQuestion.scss"
import MultiDropdown from "../../components/dropDown/MultiDropdown";
import {setGlobalAnalysisFilter, setGlobalFlaggedFilter} from "../../store/slices/adminSlice";
import Icon from "../../assets/images/search.svg";

export const FlaggedFilter = ({Desktop,TabletAndBelow,handleSearch,show,
                               handleClose}) => {
    const dispatch = useDispatch();
    const filters = JSON.parse(localStorage.getItem(`flaggedFilters`) || "{}");
    // const [typeFilter, setTypeFilter] = useState(filters.typeFilter || []);
    // const [subjectFilter, setSubjectFilter] = useState(filters.subjectFilter || []);
    // const [yearFilter, setYearFilter] = useState(filters.yearFilter || []);

    const [searchFilter, setSearchFilter] = useState(filters.searchFilter || "");
    // const subjects = useRef([]);
    // const years = useRef([]);
    const { adminsdata } = useSelector((state) => state.exam);
    const sortData = ["Pending", "Resolved", "Removed","All"];
    const [sort, setSort] = useState(filters.sort || "Pending");
    // console.log(filters,sort);
    const handleSort = (e) => {
        setSort(e.target.value);
        handleFilterChange(e.target.value,5);
    };

    const handleTypeChange = (val) => {
        // setTypeFilter(val);
        handleFilterChange(val,1);
        // console.log("i am called 3");
    };
    const handleSubjectChange = (val) => {
        // setSubjectFilter(() => { return val});
        handleFilterChange(val,2);
    }
    const handleYearChange = (val) => {
        // setYearFilter(() => { return val});
        handleFilterChange(val,3);
    }
    const handleSearchChange = (e) => {
        setSearchFilter(() => { return e.target.value});
        handleFilterChange(e.target.value,4);
    }


    const handleFilterChange = (val,mode) => {
        const payload ={
            sort,searchFilter
        };
        if(mode === 1)payload.typeFilter = val;
        else if(mode === 2)payload.subjectFilter = val;
        else if(mode === 3)payload.yearFilter = val;
        else if(mode === 4)payload.searchFilter = val;
        else if(mode === 5)payload.sort = val;

        // console.log("change values: ",payload,mode,val);
        dispatch(setGlobalFlaggedFilter(payload));

    }
    const handleSearchReset = () => {
        const payload = {
            search:""
        };
        dispatch(setGlobalFlaggedFilter(payload));
        handleSearch(true);
    }

    useEffect(() => {
        // subjects.current = adminsdata.subjects;
        // years.current = adminsdata.years;
    }, []);

  return (
    <>
        <Desktop>
            <div className="flexy question-type-div">
                <div className="search-bar flexy">
                    {" "}
                    {/*<div className="col-md-4">*/}
                    {/*    <h6>Exam Type:</h6>*/}
                    {/*    <MultiDropdown type={1} selectedValues={typeFilter} handleChange={handleTypeChange} options={adminsdata.types}></MultiDropdown>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-4">*/}
                    {/*    <h6>Exam Subject:</h6>*/}
                    {/*    /!*<input placeholder="Chemistry, Physics" name="subject" onChange={handleSetFilter} />*!/*/}
                    {/*    <MultiDropdown type={2} selectedValues={subjectFilter} handleChange={handleSubjectChange} options={adminsdata.subjects}></MultiDropdown>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-4">*/}
                    {/*    <h6>Exam Year:</h6>*/}
                    {/*    <MultiDropdown type={3} selectedValues={yearFilter} handleChange={handleYearChange} options={adminsdata.years}></MultiDropdown>*/}
                    {/*</div>*/}
                    <div className="search-input">
                        <input defaultValue={searchFilter} onChange={handleSearchChange} name="search" type="search" placeholder="search questions...
                    "/>

                    </div>
                </div>
                <div className="sort-bar">
                        <h6>Sort by:</h6>
                        <select value={sort} onChange={handleSort}>
                            {sortData.map((item, idx) => (
                                <option key={idx} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                </div>
                <div >
                    <button onClick={handleSearch}>Search <img src={Icon} alt=""/></button>
                </div>
            </div>
        </Desktop>
        {/*<TbaletAndBelow>*/}
        {/*    <div  className="col-md-4 instructions4">*/}
        {/*        {" "}*/}
        {/*       */}
        {/*        <Offcanvas*/}
        {/*            show={show}*/}
        {/*            onHide={handleClose}*/}
        {/*            backdrop={false}*/}
        {/*            responsive="lg"*/}
        {/*            placement="bottom"*/}
        {/*            scroll={true}*/}
        {/*            style={{*/}
        {/*                height: "auto",*/}
        {/*                maxHeight: "100vh",*/}
        {/*                width: "100%",*/}
        {/*                maxWidth: "100%",*/}
        {/*            }}>*/}
        {/*            <Offcanvas.Header closeButton>*/}
        {/*                <Offcanvas.Title></Offcanvas.Title>*/}
        {/*            </Offcanvas.Header>*/}
        {/*            <Offcanvas.Body>*/}
        {/*                <div className="flexy question-type-div">*/}
        {/*                    <div className="col-md-11 flexy">*/}
        {/*                        {" "}*/}
        {/*                        <div className="col-md-4">*/}
        {/*                            <h6>Exam Type:</h6>*/}

        {/*                            <SearchableDropdown*/}
        {/*                                options={adminsdata.types}*/}
        {/*                                label="name"*/}
        {/*                                id="id"*/}
        {/*                                selectedVal={typeFilter}*/}
        {/*                                handleChange={handleTypeChange}*/}
        {/*                            />*/}
        {/*                        </div>*/}
        {/*                        <div className="col-md-4">*/}
        {/*                            <h6>Exam Subject:</h6>*/}
        {/*                            <SearchableDropdown*/}
        {/*                                options={subjects.current}*/}
        {/*                                label="name"*/}
        {/*                                id="id"*/}
        {/*                                selectedVal={subjectFilter}*/}
        {/*                                handleChange={handleSubjectChange}*/}
        {/*                            />*/}
        {/*                        </div>*/}
        {/*                        <div className="col-md-4">*/}
        {/*                            <h6>Exam Year:</h6>*/}
        {/*                            <SearchableDropdown*/}
        {/*                                options={years.current}*/}
        {/*                                label="name"*/}
        {/*                                id="id"*/}
        {/*                                selectedVal={yearFilter}*/}
        {/*                                handleChange={handleYearChange}*/}
        {/*                            />*/}
        {/*                        </div>*/}
        {/*                    </div>*/}
        {/*                    <div className="col-md-1 mobile-filter">*/}
        {/*                        <button onClick={handleSearch}>Filter</button>*/}
        {/*                        <button className="mobile-reset" onClick={handleSearchReset}>Reset</button>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            </Offcanvas.Body>*/}
        {/*        </Offcanvas>*/}
        {/*    </div>*/}
        {/*</TbaletAndBelow>*/}

    </>
  );
};
