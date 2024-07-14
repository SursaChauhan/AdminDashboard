import React from 'react'
import Profile from './Profile';
import Search from './Search';
import LoginRegister from './login';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from './Images/logo.png'
const Navbar = () => {
  const IsLoggedIn = useSelector((state) => state.auth.IsLoggedIn); 
 
  return (

    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
        <div>
        <img src={logo} alt="logo" style={{width:'80px'}}/>
</div>
      <Search/>
    {IsLoggedIn ?<Profile/>: <LoginRegister/> }  
    </div>
  )
}

export default Navbar