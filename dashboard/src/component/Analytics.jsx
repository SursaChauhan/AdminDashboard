import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie, } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto'
import axios from 'axios';

const Analytics = () => {
  const [data,setData] =useState([]);
  const currentPage =1;
const limit =5;

  const chartdata = {
    labels: data.map((user)=>
user.sector
    ),
    datasets: [
      {
        label: "Intensity",
        data: data.map((user)=>
        user.intensity
            ),
        backgroundColor: [ 'blue', 'green'
        ],
        borderColor: [
          'green',
        ],
        borderWidth: 2
      },
      {
        label: "LikelyHood",
        data: data.map((user)=>
          user.likelihood
              ),
        backgroundColor: ['orange'],
        borderColor: [
          'red',

        ],
        borderWidth: 1
      }
    ]
  }

  const fetchdata=async()=>{
    try{
      const res = await axios.get(`https://backend-mongo-3.onrender.com/api/users`);
      const responseData = res.data; // Assuming responseData is an object or array returned by your API

      // Example: Destructuring data from the response
      const { region, country, source } = responseData;

      // Example: Setting data in state
      setData(responseData);
    }catch(err){
console.log(err);
    }
  }
useEffect(()=>{
fetchdata();
},[])



  return (
    <div id='analytics'>


      <div id='bar' style={{  backgroundColor: "black",maxHeight:'300px' ,border:'1px solid black'}}>
        <Bar data={chartdata} style={{width:"100%",padding:'1%'}} />
      </div>

<div id='second' style={{display:'flex',marginTop:"3%",gap:"3%",justifyContent:'center',alignItems:"center"}}>

<div id='line' style={{ backgroundColor: "black",width:"58%",border:'1px solid black'}}>
        <Line data={chartdata}  />
      </div>

      <div id='Pie' style={{width:"40%"}}>
        <Pie data={chartdata}  />
      </div>

</div>
     


    </div>
  )
}

export default Analytics