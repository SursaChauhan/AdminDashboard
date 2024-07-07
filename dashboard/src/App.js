import logo from './logo.svg';
import './App.css';
import Appbar from './component/Appbar'
import Auth from './component/Auth';
import { useState } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
     
      <Appbar/>
    </div>
  );
}

export default App;
