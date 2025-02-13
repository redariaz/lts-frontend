import { Autocomplete } from "@mui/material";
import React, { useState } from "react";

// Reusable SearchableDropdown component
const SearchableDropdown = ({ name, id, options, onChange, value, placeholder }) => {
    const [search, setSearch] = useState("");

    // Filter options based on the search term
    // const filteredOptions = options.filter((option) =>
    //     option.label.toLowerCase().includes(search.toLowerCase())
    // );

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        // <div className="dropdown-container">
        //     <input
        //         name={name}
        //         id={id}
        //         type="text"
        //         className="dropdown-search"
        //         placeholder="Search..."
        //         value={search}
        //         options={options}
        //         onChange={handleSearchChange}
        //     />
        //     <select value={value} onChange={onChange} className="dropdown-select">
        //         {placeholder && (
        //             <option value="" disabled>
        //                 {placeholder}
        //             </option>
        //         )}
        //         {/* {filteredOptions.map((option) => (
        //             <option key={option.value} value={option.value}>
        //                 {option.label}
        //             </option>
        //         ))} */}
        //     </select>
        // </div>
        <Autocomplete
            nam
        />
    );
};

export default SearchableDropdown;
