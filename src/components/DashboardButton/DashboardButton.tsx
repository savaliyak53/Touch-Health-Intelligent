import React from 'react'
import { Button } from 'antd'
import './DashboardButton.scss'
type Props = {
    innerButtons: boolean
    image: string
    innerButtonImage: string
    disabled: boolean
    color: string
    outerButton: boolean
    onClick: any
    insight: any
}
function DashboardButton({
    innerButtons,
    innerButtonImage,
    image,
    disabled,
    color,
    outerButton,
    onClick,
    insight,
}: Props) {
    return (
        <>
            <Button
                className={`Diamond-Btn ${
                    color === '#394A7E' ? 'primary' : 'secondary'
                }  ${disabled ? 'disabled' : ''}`}
                onClick={() => {
                    onClick(insight)
                    console.log(insight)
                }}
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
                {outerButton ? '.' : <img src={image} alt="" />}
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
