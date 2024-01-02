import React, { useContext, useState } from "react";
import SearchBar from "material-ui-search-bar";
import { Context } from "../Context/ContextStates";

const SearchBarTop = () => {
    const { searchTop, setSearchTop } = useContext(Context)
    const handleInputChange = (e) => {
        setSearchTop(e);
    };
    return (
        <SearchBar
        value={searchTop}
        onChange={handleInputChange}
        style={{marginLeft:'2%'}}
      />
    )
}
export default SearchBarTop;