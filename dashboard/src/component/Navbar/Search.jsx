import React, { useState } from 'react';
import SearchBar from '@mkyy/mui-search-bar';


const Search = () => {
  const [textFieldValue,setTextFieldValue] =useState(null);

  const handleSearch = labelOptionValue => {
    //...
    console.log(labelOptionValue);
  };
  return (
    <div>  <SearchBar
    value={textFieldValue}
    onChange={newValue => setTextFieldValue(newValue)}
    onSearch={handleSearch}
    style={{
      backgroundColor: 'White', // Change background color
      color: 'black', // Change text color
      borderRadius:"23px"
    }}
  /></div>
  )
}

export default Search