import React, { useContext, useState } from "react";
import SearchBar from "material-ui-search-bar";
import { Context } from "../Context/ContextStates";

const SearchBarComp = () => {
    const { search, setSearch } = useContext(Context)
    const handleInputChange = (e) => {
        setSearch(e);
    };
    return (
        <SearchBar
        value={search}
        onChange={handleInputChange}
        style={{marginLeft:'2%'}}
      />
    )
}
export default SearchBarComp;