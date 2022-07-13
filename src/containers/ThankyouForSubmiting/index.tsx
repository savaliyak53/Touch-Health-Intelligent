import React from 'react'
import Layout from '../../layouts/Layout/Layout'
import { Button } from 'antd'
import './index.scss'
import { useNavigate } from 'react-router-dom'
const index = () => {
    const navigate = useNavigate()
    return (
        <Layout defaultHeader={true} hamburger={true} dashboard={false}>
            <div className="Content-wrap DayCon">
                <div className="Question">
                    <h3 className="Question-title">
                        Thankyou for Submiting Questionnaire
                    </h3>
                    <p className="Description">
                        Is there anything else you would like to do before you
                        go?
                    </p>
                </div>
                {/* <Button className="btn" onClick={() => navigate('/dashboard')}>
                    Dashboard
                </Button> */}
            </div>
        </Layout>
    )
}

export default index
