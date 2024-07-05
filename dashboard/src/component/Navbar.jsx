import React from 'react'
import Profile from './Profile';
import Search from './Search';
import LoginRegister from './login';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const IsLoggedIn = useSelector((state) => state.auth.IsLoggedIn); 
  console.log(IsLoggedIn);
  return (

    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
        <div>
        <img src="https://blackcoffer.com/wp-content/uploads/2023/10/Black-720x172-4.png" alt="logo" style={{width:"20%"}}/>
</div>
      <Search/>
    {IsLoggedIn ?<Profile/>: <LoginRegister/> }  
    </div>
  )
}

export default Navbar