import React from 'react'
import Layout from '../../layouts/Layout/Layout'
import { Button } from 'antd'
import './index.scss'
import { useNavigate } from 'react-router-dom'
const index = () => {
    const navigate = useNavigate()
    return (
        <Layout defaultHeader={true} hamburger={true}>
            <div className="Content-wrap DayCon">
                <div className="Question">
                    <h3 className="Question-title">
                        Thankyou for Submiting Questionnaire
                    </h3>
                </div>
                <button className="submit">Manages conditions</button>
                <button className="submit">Manage concerns</button>
                <button className="submit">Home</button>
            </div>
        </Layout>
    )
}

export default index
