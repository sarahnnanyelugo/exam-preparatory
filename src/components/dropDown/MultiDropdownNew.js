import React, {useEffect, useRef, useState} from 'react'
import "./multi-drop-new.scss"
import Close from "../../assets/images/fa-close.svg";
import {setGlobalFilter} from "../../store/slices/examSlice";
const MultiSelectDropdownNew = ({ options, selected, toggleOption }) => {
    const [searchRef,setSearchRef] = useState("");
    const searchM = useRef(null);
    const [isOpen,setIsOpen] = useState(false);

    const handleSelectCancel = (id) => {
        toggleOption({id});
    }

    const handleClose = () => {
        setIsOpen(false);
    }
    const handleClear = () => {
        searchM.current.value = '';
        handleChange("");
    }

    const  handleChange = (value) => {
        setSearchRef(value);
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }


    return (
        <>
            <div className={`c-multi-select-dropdown-new ${isOpen?"open":""}`}>
                <div onClick={toggleDropdown} className={`c-multi-select-dropdown-new__selected ${!!selected.length?"":"empty"}`}>
                    {selected.map(selected_id => {
                        const optionItem = options.filter(x => x.id === selected_id);
                        if(!!!optionItem.length){
                            return  "";
                        }
                        return (
                            <span key={optionItem[0].id} onClick={() => handleSelectCancel(optionItem[0].id)}>{optionItem[0].name}<img  src={Close} alt="Scholar" /></span>
                        )
                    })}

                    <div className="arrow"></div>
                </div>
                <ul className="c-multi-select-dropdown-new__options">
                    <div  className={`c-multi-select-dropdown-new__option search`}>
                        <input ref={searchM} type="text"  onChange={(e) => {
                            handleChange(e.target.value);
                        }}  placeholder="Search..."
                               className="c-multi-select-dropdown-new__option-checkbox"></input>
                        <img onClick={handleClear}  src={Close} alt="Scholar" />
                    </div>
                    <div className="c-multi-select-dropdown-new__option-main">
                        {options
                            .filter(option => {
                                if(!!!searchRef)return  true;
                                return option.name.toLowerCase().indexOf(searchRef.toLowerCase()) !== -1;
                            })
                            .map(option => {
                                const isSelected = selected.includes(option.id);
                                return (
                                    <div key={option.id} className={`c-multi-select-dropdown-new__option ${isSelected?"active":""}`} onClick={() => toggleOption({ id: option.id })}>
                                        {/*<input type="checkbox" checked={isSelected} className="c-multi-select-dropdown-new__option-checkbox"></input>*/}
                                        <span>{option.name} <br/><small>{option.email}</small></span>
                                    </div>
                                )
                            })}
                    </div>
                    <div  className={`c-multi-select-dropdown-new__option close`}>
                       <a onClick={handleClose} >Close<img   src={Close} alt="Scholar" /></a>
                    </div>

                </ul>
            </div>
        </>
    )
}

const MultiDropdownNew = ({options,handleChange,selectedValues,type}) => {
    const tempItems = options.filter(item => {
        return selectedValues.includes(item.name);
    }).map(x  => x.id);
    const [selected, setSelected] = useState(tempItems);
    const toggleOption = ({ id }) => {
        setSelected(prevSelected => {
            // if it's in, remove
            const newArray = [...prevSelected]
            if (newArray.includes(id)) {
                return newArray.filter(item => item !== id)
                // else, add
            } else {
                newArray.push(id)
                return newArray;
            }
        });

    }

    useEffect(() => {
        const finalSelected = options.filter(item => {
            return selected.includes(item.id)
        }).map(x  => x.id);
        handleChange(finalSelected);
    }, [selected]);

    return (
        <MultiSelectDropdownNew
            options={options}
            selected={selected}
            toggleOption={toggleOption} />
    )
}

export default MultiDropdownNew;
