import React from 'react'
import Profile from './Profile';
import Search from './Search';

const Navbar = () => {
  return (
    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
        <div>
        <img src="https://play-lh.googleusercontent.com/GDz-jb59bT1pStsNQ_8w0jmu5gsKInnTPSWQT30_GVDFY6ODx4RdzbYhi0tB4pelxA" alt="logo" style={{width:"40px"}}/>
</div>
      <Search/>
      <Profile/>
    </div>
  )
}

export default Navbar