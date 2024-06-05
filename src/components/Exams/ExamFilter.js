import React, { useEffect, useRef, useState } from "react";
import "./exams.scss";
import Modal from "react-bootstrap/Modal";
import SearchableDropdown from "../dropDown/SearchableDropdown";
import Play from "../../assets/images/play.svg";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalFilter } from "../../store/slices/examSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
import { QuestionNum } from "../QuestionNum/QuestionNum";

export const ExamFilter = ({
  Desktop,
  TabletAndBelow,
  handleSearch,
  show,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const filters = JSON.parse(localStorage.getItem(`filters`) || "{}");
  const [typeFilter, setTypeFilter] = useState(filters.typeFilter || "");
  const [subjectFilter, setSubjectFilter] = useState(
    filters.subjectFilter || ""
  );
  const [yearFilter, setYearFilter] = useState(filters.yearFilter || "");
  const subjects = useRef([]);
  const years = useRef([]);
  const { examsdata } = useSelector((state) => state.exam);
  // console.log(examsdata);
  const handleTypeChange = (val) => {
    setTypeFilter(val);
    if (val && examsdata.subjects[val]) {
      subjects.current = examsdata.subjects[val];
    } else {
      subjects.current = [];
    }
    handleFilterChange(val, 1);
    // console.log("i am called 3");
  };
  const handleSubjectChange = (val) => {
    setSubjectFilter(val);
    if (
      val &&
      examsdata.years[typeFilter] &&
      examsdata.years[typeFilter][val]
    ) {
      years.current = examsdata.years[typeFilter][val];
    } else {
      years.current = [];
    }
    handleFilterChange(val, 2);
  };
  const handleYearChange = (val) => {
    setYearFilter(() => {
      return val;
    });
    handleFilterChange(val, 3);
  };

  const handleFilterChange = (val, mode) => {
    const payload = {
      typeFilter,
      yearFilter,
      subjectFilter,
    };
    if (mode === 1) payload.typeFilter = val;
    else if (mode === 2) payload.subjectFilter = val;
    else if (mode === 3) payload.yearFilter = val;

    dispatch(setGlobalFilter(payload));
  };
  const handleSearchReset = () => {
    const payload = {
      typeFilter: "",
      yearFilter: "",
      subjectFilter: "",
    };
    dispatch(setGlobalFilter(payload));
    handleSearch(true);
  };
  useEffect(() => {
    if (examsdata.subjects) {
      if (filters.typeFilter) handleTypeChange(filters.typeFilter);
      if (filters.subjectFilter) {
        handleSubjectChange(filters.subjectFilter);
      }
    }
  }, []);

  return (
    <>
      <Desktop>
        <div className="flexy question-type-div">
          <div className="col-md-11 flexy">
            {" "}
            <div className="col-md-4">
              <h6>Exam Type:</h6>
              <SearchableDropdown
                options={examsdata.types}
                label="name"
                id="id"
                selectedVal={typeFilter}
                handleChange={handleTypeChange}
                placeholder="Select exam type"
              />
            </div>
            <div className="col-md-4">
              <h6>Exam Subject:</h6>
              {/*<input placeholder="Chemistry, Physics" name="subject" onChange={handleSetFilter} />*/}
              <SearchableDropdown
                options={subjects.current}
                label="name"
                id="id"
                selectedVal={subjectFilter}
                handleChange={handleSubjectChange}
                placeholder="Select subject"
              />
            </div>
            <div className="col-md-4">
              <h6>Exam Year:</h6>
              <SearchableDropdown
                options={years.current}
                label="name"
                id="id"
                selectedVal={yearFilter}
                handleChange={handleYearChange}
                placeholder="Select year"
              />
              {/*<input placeholder="2023" name="year" onChange={handleSetFilter} />*/}
            </div>
          </div>
          <div className="col-md-1 ">
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </Desktop>
      <TabletAndBelow>
        <div className="col-md-4 instructions4">
          {" "}
          {/*<Modal show={show} onHide={handleClose} centered>*/}
          {/*    <>*/}
          {/*        <Modal.Header>*/}
          {/*            <div className="flexy col-md-12 flexyM">*/}
          {/*            </div>*/}
          {/*        </Modal.Header>*/}
          {/*        <Modal.Body>*/}
          {/*            <div className="flexy question-type-div">*/}
          {/*                <div className="col-md-11 flexy">*/}
          {/*                    {" "}*/}
          {/*                    <div className="col-md-4">*/}
          {/*                        <h6>Exam Type:</h6>*/}
          {/*                        <SearchableDropdown*/}
          {/*                            options={examsdata.types}*/}
          {/*                            label="name"*/}
          {/*                            id="id"*/}
          {/*                            selectedVal={typeFilter}*/}
          {/*                            handleChange={handleTypeChange}*/}
          {/*                        />*/}
          {/*                    </div>*/}
          {/*                    <div className="col-md-4">*/}
          {/*                        <h6>Exam Subject:</h6>*/}
          {/*                        <SearchableDropdown*/}
          {/*                            options={subjects.current}*/}
          {/*                            label="name"*/}
          {/*                            id="id"*/}
          {/*                            selectedVal={subjectFilter}*/}
          {/*                            handleChange={handleSubjectChange}*/}
          {/*                        />*/}
          {/*                    </div>*/}
          {/*                    <div className="col-md-4">*/}
          {/*                        <h6>Exam Year:</h6>*/}
          {/*                        <SearchableDropdown*/}
          {/*                            options={years.current}*/}
          {/*                            label="name"*/}
          {/*                            id="id"*/}
          {/*                            selectedVal={yearFilter}*/}
          {/*                            handleChange={handleYearChange}*/}
          {/*                        />*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*                <div className="col-md-1 ">*/}
          {/*                    <button onClick={handleSearch}>Search</button>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </Modal.Body>*/}
          {/*        <Modal.Footer>*/}
          {/*            <button  className="cance-btn">*/}
          {/*                Cancel*/}
          {/*            </button>*/}
          {/*            <div className="flexy flexyM start-btn">*/}
          {/*                <button  className="">*/}
          {/*                    <img src={Play} alt="logo" width="18px" height="18px" /> Start Test*/}
          {/*                </button>*/}
          {/*            </div>*/}
          {/*        </Modal.Footer>*/}
          {/*    </>*/}
          {/*</Modal>*/}
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
            }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="flexy question-type-div">
                <div className="col-md-11 flexy">
                  {" "}
                  <div className="col-md-4">
                    <h6>Exam Type:</h6>

                    <SearchableDropdown
                      options={examsdata.types}
                      label="name"
                      id="id"
                      selectedVal={typeFilter}
                      handleChange={handleTypeChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6>Exam Subject:</h6>
                    <SearchableDropdown
                      options={subjects.current}
                      label="name"
                      id="id"
                      selectedVal={subjectFilter}
                      handleChange={handleSubjectChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6>Exam Year:</h6>
                    <SearchableDropdown
                      options={years.current}
                      label="name"
                      id="id"
                      selectedVal={yearFilter}
                      handleChange={handleYearChange}
                    />
                  </div>
                </div>
                <div className="col-md-1 mobile-filter">
                  <button onClick={handleSearch}>Filter</button>
                  <button className="mobile-reset" onClick={handleSearchReset}>
                    Reset
                  </button>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </TabletAndBelow>
    </>
  );
};
