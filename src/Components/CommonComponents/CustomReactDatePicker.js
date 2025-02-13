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
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const closeDatePicker = () => {
        setIsDatePickerOpen(false);
    };

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
            open={isDatePickerOpen}
            onClickOutside={closeDatePicker}
            disabled={disabled}
            maxDate={maxDate}
            minDate={minDate}
            customInput={
                <div>
                    <input
                        className="form-control calendar-icon-div"
                        placeholder={
                            selected ? selected : "dd/mm/yyyy"
                        }
                        onClick={toggleDatePicker}
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
