import React, { useEffect, useState } from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Button, Select } from 'antd'
import {
    Chart as ChartJS,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import './index.scss'
import Layout from '../../layouts/Layout/Layout'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getInsights } from '../../services/authservice'
import { type } from 'os'
import { dateFormat, response } from '../../utils/lib'
import { draw, generate } from 'patternomaly'
const { Option } = Select
const handleChange = (value: string) => {
    console.log(`selected ${value}`)
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)
const dateHighlighter = {
    id: 'dateHighlighter',
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
        const {
            ctx,
            chartArea: { top, bottom, left, right, width, height },
            scales: { x, y },
        } = chart
        ctx.fillStyle = 'rgba(0,0,0,0.2)'
        const forecastStartDate = localStorage.getItem('forecastStartDate')
        const forecastEndDate = localStorage.getItem('forecastEndDate')
        console.log('called')
        ctx.fillRect(
            x.getPixelForValue(forecastStartDate),
            top,
            x.getPixelForValue(forecastEndDate) -
                x.getPixelForValue(forecastStartDate),
            height
        )
    },
}
export const plugins = [dateHighlighter]
export const options = {
    responsive: true,
    scales: {
        yAxis: {
            min: 0,
            max: 1,
        },
    },
}

type IData = {
    labels?: string[] | undefined
    datasets: any
}
const Analytics = () => {
    const selectedInsight = localStorage.getItem('selectedInsight')
    let data: IData = {
        labels: [],
        datasets: [],
    }
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const [dataset, setDataset] = useState<ChartData<'line'>>()
    const [forecast, setForecast] = useState<any>()
    const [labels, setLabel] = useState<string[]>()
    const [historical, setHistorical] = useState<any>()
    const [category, setCategory] = useState<string>()

    //selected Insight from localstorage is saved as [i]-[j]
    const [insight, setInsight] = useState<any>()

    const [selectInsight, setSelectedInsight] = useState<'' | number[] | null>()
    const getSelectedInsight = async () => {
        const splitIndex = selectedInsight && selectedInsight.split('-')
        const insightIndex = splitIndex && splitIndex.map(Number)
        setSelectedInsight(insightIndex)
        calculate(insightIndex)
    }
    useEffect(() => {
        //getInsightsData()
        getSelectedInsight()
    }, [])

    const calculate = (insightArray: any) => {
        const i = insightArray[0]
        const j = insightArray[1]
        const selectedinsight = response.insights[i][j]
        selectedInsight && setInsight(selectedInsight)
        //setCategory
        setCategory(selectedinsight.category.name)
        const forecastTime = selectedinsight.forecast.times.map((item: any) => {
            return dateFormat(item)
        })
        const historicalTime = selectedinsight.historical.times.map(
            (item: any) => {
                return dateFormat(item)
            }
        )
        //setLabels
        const labelsArray = historicalTime.concat(forecastTime)
        setLabel(labelsArray)
        //setHistoricalData
        const expectation = selectedinsight.historical.expectation
        const historicalArray = []
        for (let i = 0; i < expectation.length; i++) {
            const dataArray = []
            dataArray.push(historicalTime[i])
            dataArray.push(expectation[i])
            historicalArray.push(dataArray)
        }
        setHistorical(historicalArray)
        //setForecastData
        const forecast = selectedinsight.forecast.expectation
        const forecastArray = []
        for (let i = 0; i < forecast.length; i++) {
            const dataArray = []
            dataArray.push(forecastTime[i])
            dataArray.push(forecast[i])
            forecastArray.push(dataArray)
        }
        setForecast(forecastArray)
        data = {
            labels: labelsArray,
            datasets: [
                {
                    label: 'Historical',
                    data: historicalArray,
                    fill: false,
                    borderColor: '#3A4A7E',
                    backgroundColor: '#3A4A7E',
                    lineTension: 0.4,
                    min: 0,
                    max: 1,
                },
                {
                    label: 'Forecast',
                    data: forecastArray,
                    fill: false,
                    lineTension: 0.4,
                    min: 0,
                    max: 1,
                    backgroundColor: '#FF0000',
                    segment: {
                        borderColor: '#FF0000',
                        //backgroundColor: '#FFC0CB',
                    },
                },
            ],
        }
        setDataset(data)
    }
    const handleCategoryChange = () => {
        const splitIndex = selectedInsight && selectedInsight.split('-')
        const insightIndex = splitIndex && splitIndex.map(Number)
        if (!insightIndex) return
        const iIndex = insightIndex[0]
        const jIndex = insightIndex[1]
        const jIndexlength = response.insights[iIndex].length
        if (jIndex < jIndexlength - 1) {
            localStorage.setItem('selectedInsight', `${iIndex}-${jIndex + 1}`)
            localStorage.setItem('forecastStartDate', '18-Jul-2022')
            localStorage.setItem('forecastEndDate', '20-Jul-2022')
            if (insight) {
                console.log('mock: ', insight.forecast)
            }
        } else {
            localStorage.setItem('selectedInsight', `${iIndex}-${jIndex}`)
        }
        window.location.reload()
    }
    return (
        <>
            <Layout defaultHeader={true} hamburger={true} dashboard={false}>
                <div className="Content-wrap Analytic">
                    <div className="Insite-btn">
                        <Button>
                            Timeline <RightOutlined />
                        </Button>
                    </div>
                    <div className="Title-wrap">
                        <h2 className="Analytic-title">
                            {category && category}
                            {/* Hypertension <br /> management */}
                        </h2>
                        <RightOutlined onClick={handleCategoryChange} />
                    </div>
                    {/* <div className="filters-wrap">
                        <Select
                            defaultValue="2022"
                            dropdownStyle={{
                                padding: '0',
                                borderRadius: '4px',
                                borderColor: '#616C61',
                            }}
                            onChange={handleChange}
                        >
                            <Option value="2022">2022</Option>
                            <Option value="2021">2021</Option>
                            <Option value="2020">2020</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2018">2018</Option>
                            <Option value="2017">2017</Option>
                        </Select>
                        <Select
                            defaultValue="month"
                            dropdownStyle={{
                                padding: '0',
                                borderRadius: '4px',
                                borderColor: '#616C61',
                            }}
                            onChange={handleChange}
                        >
                            <Option value="month">Month</Option>
                            <Option value="jan">Jan</Option>
                            <Option value="feb">Feb</Option>
                            <Option value="mar">Mar</Option>
                        </Select>
                        <Select
                            defaultValue="relation"
                            dropdownStyle={{
                                padding: '0',
                                borderRadius: '4px',
                                borderColor: '#616C61',
                            }}
                            onChange={handleChange}
                        >
                            <Option value="relation">Relationship</Option>
                            <Option value="tion">Relationship 1</Option>
                            <Option value="lation">Relationship 2</Option>
                        </Select>
                    </div> */}
                    {dataset && (
                        <Line
                            options={options}
                            data={dataset}
                            plugins={[dateHighlighter]}
                        />
                    )}
                </div>
            </Layout>
        </>
    )
}

export default Analytics
