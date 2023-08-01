import React from 'react'

import './style.scss'
import { Progress } from 'antd'

export const GoalsComp = () => {
    return (
        <div className='goalsContainer'>
            <p className='goalsLevel'>Level 1</p>
            <p className='goalsTitle'>Productivity</p>
            <Progress
            showInfo={false}
            percent={40}
            strokeColor={"#B3FFD1"}
            strokeWidth={7}
            style={{
                 marginLeft:'4px'
            }}
            />
        </div>
    )
}