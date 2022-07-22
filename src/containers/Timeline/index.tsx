import React, { useContext, useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import {
    RightOutlined,
    ArrowDownOutlined,
    DownOutlined,
    CloseOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons'
import './index.scss'
import Layout from '../../layouts/Layout/Layout'
import { InsightContext } from '../../contexts/InsightContext'
import { useNavigate } from 'react-router-dom'
const Timeline = () => {
    const context = useContext(InsightContext)
    const navigate = useNavigate()
    const [insight, setInsight] = useState<any>()
    const [patterns, setPatterns] = useState<any>()
    const [category, setCategory] = useState<string>()

    const selectedInsight = localStorage.getItem('selectedInsight')
    //<To-do-hamza >move this to dashboard
    const getSelectedInsight = async () => {
        const response = await context?.commands.loadInsights()
        const splitIndex = selectedInsight && selectedInsight.split('-')
        const insightIndex = splitIndex && splitIndex.map(Number)
        calculate(insightIndex, response)
    }
    const calculate = (insightArray: any, response: any) => {
        const i = insightArray[0]
        const j = insightArray[1]
        const selectedinsight = response.insights[i][j]
        selectedInsight && setInsight(selectedInsight)
        setCategory(selectedinsight.category.name)
        //setPatternData
        const patterns = selectedinsight.patterns
        setPatterns(patterns)
    }
    useEffect(() => {
        getSelectedInsight()
    }, [])
    const handleInsightsChange = () => {
        navigate('/insights')
    }
    const handleCategoryChange = () => {
        const splitIndex = selectedInsight && selectedInsight.split('-')
        const insightIndex = splitIndex && splitIndex.map(Number)
        if (!insightIndex) return
        const iIndex = insightIndex[0]
        const jIndex = insightIndex[1]
        const jIndexlength = context?.insights.insights[iIndex].length
        const iIndexlength = context?.insights.insights.length
        if (jIndex < jIndexlength - 1) {
            localStorage.setItem('selectedInsight', `${iIndex}-${jIndex + 1}`)
        } else if (jIndex >= jIndexlength - 1) {
            if (iIndex < iIndexlength - 1) {
                localStorage.setItem('selectedInsight', `${iIndex + 1}-${0}`)
            } else {
                localStorage.setItem('selectedInsight', `0-0`)
            }
        } else {
            localStorage.setItem('selectedInsight', `${iIndex}-${jIndex}`)
        }
        window.location.reload()
    }
    return (
        <>
            <Layout defaultHeader={true} hamburger={true} dashboard={false}>
                <Spin spinning={!context?.insights}>
                    <div className="Content-wrap Corr">
                        <div className="Insite-btn">
                            <Button>
                                Insights{' '}
                                <RightOutlined onClick={handleInsightsChange} />
                            </Button>
                        </div>

                        <div className="Title-wrap">
                            <h2 className="Corr-title">
                                {category && category}
                            </h2>
                            <RightOutlined onClick={handleCategoryChange} />
                        </div>

                        <div className="Corr-wrap">
                            <h3 className="Corr-Title">
                                Most recent
                                {/* Most recent <DownOutlined /> */}
                            </h3>

                            {patterns &&
                                patterns.map((pattern: any, index: number) => (
                                    <div className="Each-Relation" key={index}>
                                        <div className="Text-btn">
                                            <p className="Text">
                                                {pattern.p_str}
                                            </p>
                                            <div className="Arrow-btn">
                                                {pattern.direction === 'up' ? (
                                                    <ArrowUpOutlined className="arrwo up" />
                                                ) : (
                                                    <ArrowDownOutlined className="arrwo" />
                                                )}
                                                <Button className="Heart-Btn">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="32.855"
                                                        height="30"
                                                        viewBox="0 0 32.855 30"
                                                    >
                                                        <g
                                                            id="Heart-Beat"
                                                            transform="translate(-0.499 -1.499)"
                                                        >
                                                            <g
                                                                id="Group_73"
                                                                data-name="Group 73"
                                                                transform="translate(0.499 1.499)"
                                                            >
                                                                <path
                                                                    id="Path_67"
                                                                    data-name="Path 67"
                                                                    d="M1.535,14.1l.214.253H4.471L9.541,8.018a2.129,2.129,0,0,1,1.674-.8h.1l.2.021A2.149,2.149,0,0,1,13.2,8.565l3.307,8.268a2.138,2.138,0,0,1,1.727-1.046l2.37-7.109a2.151,2.151,0,0,1,1.968-1.464h0A2.176,2.176,0,0,1,24.629,8.56l3.725,9.312.867-2.17a2.129,2.129,0,0,1,1.99-1.347H32.1l.213-.24a.718.718,0,0,0,.1-.149,8.465,8.465,0,0,0,.943-3.9A8.57,8.57,0,0,0,16.926,6.646,8.57,8.57,0,0,0,.5,10.069a8.483,8.483,0,0,0,.943,3.9A.89.89,0,0,0,1.535,14.1Z"
                                                                    transform="translate(-0.499 -1.499)"
                                                                    fill="#fff"
                                                                />
                                                                <path
                                                                    id="Path_68"
                                                                    data-name="Path 68"
                                                                    d="M21.32,11.962l-1.007,3.023a2.14,2.14,0,0,1-1.784,1.45L17.5,20.54a2.135,2.135,0,0,1-1.934,1.618l-.144,0a2.134,2.134,0,0,1-1.99-1.348L9.086,9.947,5.669,14.218a2.135,2.135,0,0,1-1.661.8.72.72,0,0,0,.151.33L14.885,27.634a.71.71,0,0,0,.537.244.637.637,0,0,0,.546-.253l7.845-9.27.043-.049Z"
                                                                    transform="translate(1.004 2.12)"
                                                                    fill="#fff"
                                                                />
                                                            </g>
                                                            <path
                                                                id="Path_69"
                                                                data-name="Path 69"
                                                                d="M32.639,13.641H31.211a.714.714,0,0,0-.663.449l-2.194,5.485L23.3,6.949a.715.715,0,0,0-1.341.04l-2.694,8.082h-.913a.714.714,0,0,0-.693.541l-.893,3.571L11.876,6.949a.715.715,0,0,0-1.221-.181l-5.5,6.875H1.214a.714.714,0,0,0,0,1.428H5.5a.715.715,0,0,0,.559-.269l4.948-6.185,5.259,13.146a.713.713,0,0,0,.663.449h.049a.715.715,0,0,0,.644-.54L18.914,16.5h.87a.717.717,0,0,0,.678-.489L22.7,9.288l4.989,12.473a.743.743,0,0,0,1.326,0l2.678-6.694h.944a.713.713,0,1,0,0-1.427Z"
                                                                transform="translate(0 2.142)"
                                                                fill="#fff"
                                                            />
                                                        </g>
                                                    </svg>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Spin>
            </Layout>
        </>
    )
}

export default Timeline
