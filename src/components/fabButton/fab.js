import React, {useContext, useEffect, useRef, useState} from "react";
import "./fab.scss"
import Menu from "../../assets/images/menu.svg";
export const FabCard = ({setShow,show}) => {
    // const { useState } = React;
    const mainClassName = "social hide";
    const close_button = "close-button";
    const [classname,setClassname] = useState(mainClassName);
    const[close,setClosebutton] = useState(close_button);

    function Toggle(){

    }

    return(
        <>
            {!show  && (
            <div className="fab-wrapper">
                <button className={close} onClick={setShow}><img className="menu-icon" src={Menu} alt="Scholar"/></button>
            </div>)}
        </>
    );
}
