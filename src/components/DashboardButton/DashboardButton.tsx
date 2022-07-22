import React, { useContext } from 'react'
import { Button } from 'antd'
import {
    RightOutlined,
    ArrowDownOutlined,
    DownOutlined,
    CloseOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons'
import './DashboardButton.scss'
import { useNavigate } from 'react-router-dom'
import { InsightContext } from '../../contexts/InsightContext'
type Props = {
    innerButtons: boolean
    image: string
    innerButtonImage: string
    disabled: boolean
    color: string
    outerButton: boolean
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
}: Props) {
    const context = useContext(InsightContext)
    const navigate = useNavigate()
    const handleRedirect = async () => {
        //await context?.commands?.loadSelectedInsightIndex('1-0')
        await context?.commands?.loadSelectedInsight(insight)
        navigate('/analytics')
    }
    return (
        <>
            <Button
                className={`Diamond-Btn ${
                    color === '#394A7E' ? 'primary' : 'secondary'
                }  ${disabled ? 'disabled' : ''}`}
                onClick={handleRedirect}
            >
                {innerButtons ? (
                    <div className="inner-1">
                        <Button className="btn-inner">
                            <img src={innerButtonImage} alt="" />
                        </Button>
                    </div>
                ) : (
                    ''
                )}
                {outerButton ? '.' : <ArrowUpOutlined />}
                {innerButtons ? (
                    <div className="inner-2">
                        <Button className="btn-inner">
                            <img src={innerButtonImage} alt="" />
                        </Button>
                    </div>
                ) : (
                    ''
                )}
            </Button>
        </>
    )
}

export default DashboardButton
