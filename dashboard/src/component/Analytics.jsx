import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie, } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto'
import axios from 'axios';

const Analytics = () => {
  const [data,setData] =useState([]);
  const currentPage =1;
const limit =5;

  const chartdata = {
    labels: data.map((product)=>
product.name
    ),
    datasets: [
      {
        label: "Revenue",
        data: data.map((product)=>
        product.price
            ),
        backgroundColor: ['skyblue', 'black', 'green'
        ],
        borderColor: [
          'green',
        ],
        borderWidth: 2
      },
      {
        label: "Loss",
        data: [110, 230, 50, 90, 60],
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
const res =await axios.get(`http://localhost:7100/api/products?page=${currentPage}&limit=${limit}`);
const data =res.data;
console.log(data);
setData(data.products);
    }catch(err){
console.log(err);
    }
  }
useEffect(()=>{
fetchdata();
},[])



  return (
    <div id='analytics'>


      <div id='bar' style={{  backgroundColor: "black",maxHeight:'300px' }}>
        <Bar data={chartdata} style={{width:"100%",padding:'1%'}} />
      </div>

<div id='second' style={{display:'flex',marginTop:"3%",gap:"3%",justifyContent:'center',alignItems:"center"}}>

<div id='line' style={{ backgroundColor: "black",width:"58%"}}>
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