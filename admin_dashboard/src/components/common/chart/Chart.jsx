import React from 'react';
import "../../../CSS/chartHome.css";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';



export default function Chart() {
    const data = [
        {
          name: 'Jan',
          "TotalSale": 4000,       
        },
        {
          name: 'Feb',
          "TotalSale": 3000,      
        },
        {
          name: 'Mar',
          "TotalSale": 2000,
        },
        {
          name: 'Apr',
          "TotalSale": 2780,
        },
        {
          name: 'May',
          "TotalSale": 1890,
        },
        {
          name: 'Jun',
          "TotalSale": 2390,
        },
        {
          name: 'Jul',
          "TotalSale": 3490,
        },
        {
            name: 'Aug',
            "TotalSale": 3490,
        },
        {
            name: 'Sep',
            "TotalSale": 8000,
        },
        {
            name: 'Oct',
            "TotalSale": 2780,
        },
        {
            name: 'Now',
            "TotalSale": 2780,
        },
        {
            name: 'Dec',
            "TotalSale": 500,
        },


      ];

  return (
    <div className='ChartContainer'>
      <h3 className='chartTitle'>Sales Analytics</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#5550bd"/>
                <Line type="monotone" dataKey="TotalSale" stroke='#E94440' />
                <Tooltip/>
                <CartesianGrid stroke='#efefef' strokeDasharray="4 4"/>
            </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
