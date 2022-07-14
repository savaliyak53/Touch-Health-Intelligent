import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
const data = [
    {
        name: 'Sept',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Oct',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Nov',
        uv: 2000,
        pv: 7800,
        amt: 2290,
    },
    {
        name: 'Dec',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Jan',
        uv: 1890,
        pv: 4800,
        amt: 4000,
    },
]
function Insights() {
    return (
        <div className="">
            <h3>Insights</h3>
            <LineChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}
export default Insights
