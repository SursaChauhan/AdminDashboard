import React, { useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnCourses } from '../redux/Action';
import { Chart as chartjs, CategoryScale, LinearScale } from 'chart.js/auto'; // Import LinearScale for y-axis

const Analytics = () => {
  const { loginData, chartData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnCourses(loginData.token));
  }, [dispatch, loginData.token]);

  // Transform chartData to labels and counts
  const transformChartData = () => {
    if (!chartData || chartData.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = chartData.map((data) => data.title);
    const counts = chartData.map((data) => data.count);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Student Count',
          data: counts,
          backgroundColor: ['blue', 'green', 'orange', 'red', 'purple'], // Adjust colors as needed
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const barChartData = transformChartData();
  const lineChartData = transformChartData();
  const pieChartData = transformChartData();

  // Ensure Chart.js scales are properly registered
  chartjs.register(LinearScale);

  return (
    <div id="analytics">
      <div id="bar" style={{ backgroundColor: 'black', maxHeight: '300px', border: '1px solid black' }}>
        <Bar data={barChartData} options={{ scales: { y: { beginAtZero: true, precision: 0 } } }} style={{ width: '100%', padding: '1%' }} />
      </div>

      <div id="second" style={{ display: 'flex', marginTop: '3%', gap: '3%', justifyContent: 'center', alignItems: 'center' }}>
        <div id="line" style={{ backgroundColor: 'black', width: '58%', border: '1px solid black' }}>
          <Line data={lineChartData} options={{ scales: { y: { beginAtZero: true, precision: 0 } } }} />
        </div>

        <div id="pie" style={{ width: '40%' }}>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
