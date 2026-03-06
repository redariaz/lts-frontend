import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

function CustomReactDatePicker({
    id,
    selected,
    onChange,
    filterDate,
    isClearable,
    showCalendarIcon,
    disabled,
    maxDate,
    minDate
}) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const toggleDatePicker = () => {
        if (disabled) return;
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const closeDatePicker = () => {
        setIsDatePickerOpen(false);
    };

    const getMaxDateFor18Years = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        return today;
    }

    useEffect(() => {
        if (selected !== "") {
            setIsDatePickerOpen(false);
        }
    }, [selected]);

    return (
        <ReactDatePicker
            id={id}
            selected={selected}
            onChange={onChange}
            filterDate={filterDate}
            className="custom-datepicker"
            isClearable={isClearable}
            autoComplete="off"
            open={isDatePickerOpen && !disabled}
            onClickOutside={closeDatePicker}
            disabled={disabled}
            maxDate={getMaxDateFor18Years()}
            minDate={minDate}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            dateFormat="yyyy-MM-dd"
            customInput={
                <div>
                    <input
                        className="form-control calendar-icon-div"
                        placeholder={
                            selected ? selected : "dd/mm/yyyy"
                        }
                        onClick={() => {
                            if (!disabled) toggleDatePicker();
                        }}
                    />
                    {showCalendarIcon && (
                        <span
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                        >
                            <FaCalendarAlt
                                className="calendar-icon"
                                onClick={toggleDatePicker}
                            />
                        </span>
                    )}
                </div>
            }
        />
    );
}

export default CustomReactDatePicker;
