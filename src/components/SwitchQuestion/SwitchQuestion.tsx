import React from 'react'
import { Button, Switch } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './SwitchQuestion.scss'
type Props = {
    Title?: string
    Text?: string
    Checked?: boolean
}

const SwitchQuestion = ({ Title, Text, Checked }: Props) => {
    return (
        <>
            <div className="Single-Switch">
                <div className="Text-wrap">
                    {Title == '' ? '' : <h4 className="title">{Title}</h4>}
                    <p className="text">{Text}</p>
                </div>
                <div className="Switch-btn-wrap">
                    {Checked ? <Switch defaultChecked /> : <Switch />}
                    <Button className="">
                        <CloseOutlined />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SwitchQuestion
