import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../layouts/Layout/Layout'
import './index.scss'
import { getInsightsService } from '../../services/dashboardservice'
import DashboardButton from '../../components/DashboardButton/DashboardButton'
import { useNavigate } from 'react-router'
import { InsightContext } from '../../contexts/InsightContext'
import { Spin } from 'antd'

const Dashboard = () => {
    const [insights, setInsights] = useState<any>()
    const context = useContext(InsightContext)
    const navigate = useNavigate()
    useEffect(() => {
        getInsights()
    }, [])

    let rowNumber = 0
    const getInsights = async () => {
        try {
            await context?.commands?.loadInsights()
        } catch (error) {
            console.log(error)
        }
    }

    const Section = (outer: number) => {
        const section: React.ReactNode[] = []
        const insights = context?.insights?.insights
        for (let i = 0; i < insights[outer]?.length; i++) {
            {
                rowNumber++
            }
            if (rowNumber % 2 == 0) {
                {
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
                            insight={insights[outer][i - 1]}
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${insights[outer][i]?.category?.icon}`}
                            image={`${insights[outer][i]?.category?.icon}`}
                            disabled={false}
                            color={`${insights[outer][i]?.category?.color}`}
                            outerButton={false}
                            insight={insights[outer][i - 1]}
                        />
                    </div>
                )
            } else {
                section.push(
                    <div className="btn-group">
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${insights[outer][i]?.category?.icon}`}
                            image={`${insights[outer][i]?.category?.icon}`}
                            disabled={true}
                            color={`${insights[outer][i]?.category?.color}`}
                            outerButton={true}
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${insights[outer][i]?.category?.icon}`}
                            image={`${insights[outer][i]?.category?.icon}`}
                            disabled={false}
                            color={`${insights[outer][i]?.category?.color}`}
                            outerButton={false}
                            insight={insights[outer][i]}
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${insights[outer][i]?.category?.icon}`}
                            image={`${insights[outer][i]?.category?.icon}`}
                            disabled={true}
                            color={`${insights[outer][i]?.category?.color}`}
                            outerButton={true}
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
                    {context?.insights && (
                        <div className="dsgbtn-group">
                            <div className="btn-group">
                                <DashboardButton
                                    innerButtons={false}
                                    innerButtonImage=""
                                    image=""
                                    disabled={true}
                                    color={`${context.insights.insights[0][0]?.category?.color}`}
                                    outerButton={true}
                                />
                                <DashboardButton
                                    innerButtons={false}
                                    innerButtonImage=""
                                    image=""
                                    disabled={true}
                                    color={`${context.insights.insights[0][0]?.category?.color}`}
                                    outerButton={true}
                                />
                            </div>
                            {Section(0)}
                        </div>
                    )}
                    <Spin spinning={!context?.insights}></Spin>
                </div>
            </Layout>
        </>
    )
}

export default Dashboard
