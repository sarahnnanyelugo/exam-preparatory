import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setGlobalFilter} from "../../store/slices/examSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchableDropdown from "../../components/dropDown/SearchableDropdown";
import "../ExamList/exam-list.scss"
import "./analysis-filter.scss"
import MultiDropdown from "../../components/dropDown/MultiDropdown";
import {setGlobalAnalysisFilter} from "../../store/slices/adminSlice";
import Form from "react-bootstrap/Form";


export const AnalysisFilter = ({Desktop,TabletAndBelow,handleSearch,show,
                               handleClose,isAdmin}) => {
    const dispatch = useDispatch();
    const filters = JSON.parse(localStorage.getItem(`analysisFilters`) || "{}");
    const [typeFilter, setTypeFilter] = useState(filters.typeFilter || []);
    const [subjectFilter, setSubjectFilter] = useState(filters.subjectFilter || []);
    const [yearFilter, setYearFilter] = useState(filters.yearFilter || []);
    const subjects = useRef([]);
    const years = useRef([]);
    const { adminsdata } = useSelector((state) => state.exam);

    const handleTypeChange = (val) => {
        setTypeFilter(val);
        handleFilterChange(val,1);
        // console.log("i am called 3");
    };
    const handleSubjectChange = (val) => {
        setSubjectFilter(() => { return val});
        handleFilterChange(val,2);
    }
    const handleYearChange = (val) => {
        setYearFilter(() => { return val});
        handleFilterChange(val,3);
    }

    const handleFilterChange = (val,mode) => {
        const payload ={
            typeFilter,yearFilter,subjectFilter
        };
        if(mode === 1)payload.typeFilter = val;
        else if(mode === 2)payload.subjectFilter = val;
        else if(mode === 3)payload.yearFilter = val;

        // console.log("change values: ",payload,mode,val);
        dispatch(setGlobalAnalysisFilter(payload));

    }
    const handleSearchReset = () => {
        const payload = {
            typeFilter:"", yearFilter:"", subjectFilter:""
        };
        dispatch(setGlobalAnalysisFilter(payload));
        handleSearch(true);
    }

    useEffect(() => {
        subjects.current = adminsdata.subjects;
        years.current = adminsdata.years;
    }, []);
    // const [sort, setSort] = useState("Newest");




    return (
    <>
        <Desktop>
            <div className="flexy question-type-div">
                <div className="col-md-11 flexy">
                    {" "}
                    <div className="col-md-4">
                        <h6>Exam Type:</h6>
                        <MultiDropdown type={1} selectedValues={typeFilter} handleChange={handleTypeChange} options={adminsdata.types}></MultiDropdown>
                    </div>
                    <div className="col-md-4">
                        <h6>Exam Subject:</h6>
                        {/*<input placeholder="Chemistry, Physics" name="subject" onChange={handleSetFilter} />*/}
                        <MultiDropdown type={2} selectedValues={subjectFilter} handleChange={handleSubjectChange} options={adminsdata.subjects}></MultiDropdown>
                    </div>
                    <div className="col-md-4">
                        <h6>Exam Year:</h6>
                        <MultiDropdown type={3} selectedValues={yearFilter} handleChange={handleYearChange} options={adminsdata.years}></MultiDropdown>
                    </div>
                </div>
                <div className="col-md-1 ">
                    <button onClick={handleSearch}>Search</button>
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
