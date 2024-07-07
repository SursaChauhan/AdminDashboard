import logo from './logo.svg';
import './App.css';
import Appbar from './component/Appbar'
import Auth from './component/Auth';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const[file,setFile] =useState(null);
  const upload=() =>{
    const formdata =new FormData();
    console.log(file);
  
  
    formdata.append('file',file);
    console.log(formdata);
    for (let pair of formdata.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    axios.post('http://localhost:8080/api/upload',formdata).then(res =>{}).catch(er=>console.error(er))
  }
  

  return (
    <div className="App">
     
      <Appbar/>
      {/* <input type='file' onChange={(e)=> setFile(e.target.files[0])}/>
      <button onClick={upload}>upload</button> */}
    </div>
  );
}

export default App;
