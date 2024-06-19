import React from 'react'
import Profile from './Profile';
import Search from './Search';

const Navbar = () => {
  return (
    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
        <div>
        <img src="https://blackcoffer.com/wp-content/uploads/2023/10/Black-720x172-4.png" alt="logo" style={{width:"20%"}}/>
</div>
      <Search/>
      <Profile/>
    </div>
  )
}

export default Navbar