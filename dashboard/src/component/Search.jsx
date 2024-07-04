import React, { useState } from 'react';
import SearchBar from '@mkyy/mui-search-bar';
import axios from 'axios';
import Dashboard from './DashBaord';


const Search = () => {
  const [textFieldValue,setTextFieldValue] =useState(null);
  const limit =2;

  const handleSearch =async () => {
    
    const searchdata =await axios.get(`http://localhost:7100/api/products?query=${textFieldValue}&limit=${limit}`);
    console.log("searchdata",textFieldValue,searchdata);
   
    //...
    
    
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
  />
  
  </div>
  )
}

export default Search