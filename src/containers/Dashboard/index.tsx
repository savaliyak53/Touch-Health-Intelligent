import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../layouts/Layout/Layout'
import './index.scss'
import { getInsightsService } from '../../services/dashboardservice'
import DashboardButton from '../../components/DashboardButton/DashboardButton'
import { useNavigate } from 'react-router'
import { InsightContext } from '../../contexts/InsightContext'

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
            const response = await context?.commands?.loadInsights()
            // console.log(response?.insights)
            // setInsights(response?.insights)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRedirect = async (insight: any) => {
        console.log('insight :', insight)
        context?.commands?.loadSelectedInsight(insight)
        navigate('/analytics')
    }

    const Section = (outer: number) => {
        const section: React.ReactNode[] = []

        for (let i = 0; i < context?.insights[outer]?.length; i++) {
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
                                context?.insights[outer][i - 1]?.category?.icon
                            }`}
                            image={`${
                                context?.insights[outer][i - 1]?.category?.icon
                            }`}
                            disabled={false}
                            color={`${
                                context?.insights[outer][i - 1]?.category?.color
                            }`}
                            outerButton={false}
                            onClick={handleRedirect}
                            insight={context?.insights[outer][i - 1]}
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${context?.insights[outer][i]?.category?.icon}`}
                            image={`${context?.insights[outer][i]?.category?.icon}`}
                            disabled={false}
                            color={`${context?.insights[outer][i]?.category?.color}`}
                            outerButton={false}
                            onClick={handleRedirect}
                            insight={context?.insights[outer][i - 1]}
                        />
                    </div>
                )
            } else {
                section.push(
                    <div className="btn-group">
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${context?.insights[outer][i]?.category?.icon}`}
                            image={`${context?.insights[outer][i]?.category?.icon}`}
                            disabled={true}
                            color={`${context?.insights[outer][i]?.category?.color}`}
                            outerButton={true}
                            onClick=""
                            insight=""
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${context?.insights[outer][i]?.category?.icon}`}
                            image={`${context?.insights[outer][i]?.category?.icon}`}
                            disabled={false}
                            color={`${context?.insights[outer][i]?.category?.color}`}
                            outerButton={false}
                            onClick={handleRedirect}
                            insight={context?.insights[outer][i - 1]}
                        />
                        <DashboardButton
                            innerButtons={false}
                            innerButtonImage={`${context?.insights[outer][i]?.category?.icon}`}
                            image={`${context?.insights[outer][i]?.category?.icon}`}
                            disabled={true}
                            color={`${context?.insights[outer][i]?.category?.color}`}
                            outerButton={true}
                            onClick=""
                            insight=""
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
                                    color={`${insights[0][0]?.category?.color}`}
                                    outerButton={true}
                                    onClick=""
                                    insight=""
                                />
                                <DashboardButton
                                    innerButtons={false}
                                    innerButtonImage=""
                                    image=""
                                    disabled={true}
                                    color={`${insights[0][0]?.category?.color}`}
                                    outerButton={true}
                                    onClick=""
                                    insight=""
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
