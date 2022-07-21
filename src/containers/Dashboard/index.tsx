import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout/Layout'
import { Button } from 'antd'
import { response } from '../../utils/lib'
import './index.scss'
import Diamond from '../../components/diamond'
import { getInsightsService } from '../../services/dashboardservice'
import DashboardButton from '../../components/DashboardButton/DashboardButton'
import { useNavigate } from 'react-router'

const Dashboard = () => {
    const [insights, setInsights] = useState<any>()
    const navigate = useNavigate()
    // let insights: any
    useEffect(() => {
        getInsights()
    }, [])

    let rowNumber = 0
    const getInsights = async () => {
        try {
            const response = await getInsightsService()
            setInsights(response?.data?.insights)
            // insights = response?.data?.insights
            console.log(response.data.insights)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRedirect = () => {
        navigate('/analytics')
    }

    const Section = (outer: number) => {
        const section: React.ReactNode[] = []

        for (let i = 0; i < insights[outer]?.length; i++) {
            {
                rowNumber++
            }
            if (rowNumber % 2 == 0) {
                {
                    console.log('in even')
                    console.log(`${insights[outer][i]?.category?.icon}`)
                    console.log(`${insights[outer][i]?.category?.color}`)
                    i++
                }
                section.push(
                    <div className="btn-group">
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${
                                insights[outer][i - 1]?.category?.icon
                            }`}
                            image={`${insights[outer][i - 1]?.category?.icon}`}
                            disabled={false}
                            color={`${insights[outer][i - 1]?.category?.color}`}
                            outerButton={false}
                            onClick={handleRedirect}
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${insights[outer][i]?.category?.icon}`}
                            image={`${insights[outer][i]?.category?.icon}`}
                            disabled={false}
                            color={`${insights[outer][i]?.category?.color}`}
                            outerButton={false}
                            onClick={handleRedirect}
                        />
                    </div>
                )
            } else {
                console.log('in odd')
                console.log(`${insights[outer][i]?.category?.icon}`)
                console.log(`${insights[outer][i]?.category?.color}`)
                section.push(
                    <div className="btn-group">
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${insights[outer][i]?.category?.icon}`}
                            image={`${insights[outer][i]?.category?.icon}`}
                            disabled={true}
                            color={`${insights[outer][i]?.category?.color}`}
                            outerButton={true}
                            onClick={handleRedirect}
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${insights[outer][i]?.category?.icon}`}
                            image={`${insights[outer][i]?.category?.icon}`}
                            disabled={false}
                            color={`${insights[outer][i]?.category?.color}`}
                            outerButton={false}
                            onClick={handleRedirect}
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${insights[outer][i]?.category?.icon}`}
                            image={`${insights[outer][i]?.category?.icon}`}
                            disabled={true}
                            color={`${insights[outer][i]?.category?.color}`}
                            outerButton={true}
                            onClick={handleRedirect}
                        />
                    </div>
                )
            }
        }
        return section
    }
    return (
        <>
            <Layout defaultHeader={true} hamburger={true} dashboard={true}>
                <div className="Db-wrap">
                    {insights && (
                        <div className="dsgbtn-group">
                            <div className="btn-group">
                                <DashboardButton
                                    innerButtons={false}
                                    innerButtonImage=""
                                    image=""
                                    disabled={true}
                                    color={`${insights[0][0]?.category?.color}`}
                                    outerButton={true}
                                    onClick={handleRedirect}
                                />
                                <DashboardButton
                                    innerButtons={false}
                                    innerButtonImage=""
                                    image=""
                                    disabled={true}
                                    color={`${insights[0][0]?.category?.color}`}
                                    outerButton={true}
                                    onClick={handleRedirect}
                                />
                            </div>
                            {Section(0)} {Section(1)}
                        </div>
                    )}
                </div>
            </Layout>
        </>
    )
}

export default Dashboard
