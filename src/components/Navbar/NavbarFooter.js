import "./navbar.scss";
import React from "react";

export const NavbarFooter = ({sortData,sort,handleSort,setShow}) => {

  return (
    <>
      <div className={`nav-container-footer`}>
                {/*<select className="sel-cls" value={sort} onChange={handleSort}>*/}
                {/*  {sortData.map((item, idx) => (*/}
                {/*      <option key={idx} value={item}>*/}
                {/*        {item}*/}
                {/*      </option>*/}
                {/*  ))}*/}
            <button onClick={setShow} className="filter-cls">
              SEARCH</button>
      </div>
    </>
  );
};
