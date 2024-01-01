import React, { useContext, useState } from "react";
import SearchBar from "material-ui-search-bar";
import { Context } from "../Context/ContextStates";

const SearchBarRec = () => {
    const { searchRec, setSearchRec } = useContext(Context)
    const handleInputChange = (e) => {
        setSearchRec(e);
    };
    return (
        <SearchBar
        value={searchRec}
        onChange={handleInputChange}
        style={{marginLeft:'2%'}}
      />
    )
}
export default SearchBarRec;