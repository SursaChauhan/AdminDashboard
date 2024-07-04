import React from 'react'
import Profile from './Profile';
import Search from './Search';
import LoginRegister from './login';
import { useState } from 'react';

const Navbar = () => {
  const [login,setLogin] =[true];
  return (

    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
        <div>
        <img src="https://blackcoffer.com/wp-content/uploads/2023/10/Black-720x172-4.png" alt="logo" style={{width:"20%"}}/>
</div>
      <Search/>
    {login ? <LoginRegister/> : <Profile/>}  
    </div>
  )
}

export default Navbar