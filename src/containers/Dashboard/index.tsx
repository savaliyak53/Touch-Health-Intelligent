import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout/Layout'
import { Button } from 'antd'
import { response } from '../../utils/lib'
import './index.scss'
import Diamond from '../../components/diamond'
import { getInsightsService } from '../../services/dashboardservice'

const Dashboard = () => {
    const [insights, setInsights] = useState<any>()
    const getInsights = async () => {
        try {
            const response = await getInsightsService()
            setInsights(response?.data?.insights)
            console.log(response.data.insights)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getInsights()
    }, [])
    return (
        <>
            <Layout defaultHeader={true} hamburger={true} dashboard={true}>
                <Diamond></Diamond>
            </Layout>
        </>
    )
}

export default Dashboard
