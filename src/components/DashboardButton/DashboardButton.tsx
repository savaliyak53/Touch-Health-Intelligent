import React, { useContext } from 'react'
import { Button } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import './DashboardButton.scss'
import { useNavigate } from 'react-router-dom'
import { InsightContext } from '../../contexts/InsightContext'
import { Buffer } from 'buffer'
// var Buffer = require('buffer/').Buffer

type Props = {
    innerButtons: boolean
    image: string
    innerButtonImage: string
    disabled: boolean
    color: string
    outerButton: boolean
    inner?: number
    outer?: number
    insight?: any
}
function DashboardButton({
    innerButtons,
    innerButtonImage,
    image,
    disabled,
    color,
    outerButton,
    insight,
    outer,
    inner,
}: Props) {
    const context = useContext(InsightContext)
    const navigate = useNavigate()
    // let base64ToString = Buffer.from(image, 'base64').toString()
    // base64ToString = JSON.parse(base64ToString)
    //console.log(base64ToString)
    const handleRedirectInsights = async () => {
        await context?.commands?.loadSelectedInsightIndex(`${outer}-${inner}`)
        await context?.commands?.loadSelectedInsight(insight)
        navigate('/insights')
    }

    const handleRedirectTimeline = async () => {
        await context?.commands?.loadSelectedInsightIndex(`${outer}-${inner}`)
        await context?.commands?.loadSelectedInsight(insight)
        navigate('/insights/guideline')
    }
    return (
        <>
            <Button
                className={`Diamond-Btn ${
                    color === '#394A7E' ? 'primary' : 'secondary'
                }  ${disabled ? 'disabled' : ''}`}
            >
                <div className="inner-1">
                    <Button
                        className="btn-inner"
                        onClick={handleRedirectInsights}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/mobileassets/Block-Chart-2.png`}
                            alt=""
                        />
                    </Button>
                </div>

                {outerButton ? '.' : <ArrowUpOutlined />}

                <div className="inner-2">
                    <Button
                        className="btn-inner"
                        onClick={handleRedirectTimeline}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/mobileassets/Diagram-2.png`}
                            alt=""
                        />
                    </Button>
                </div>
            </Button>
        </>
    )
}

export default DashboardButton
