import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout/Layout'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './index.scss'
import SwitchQuestion from '../../components/SwitchQuestion/SwitchQuestion'
import { getConditionsService } from '../../services/dashboardservice'
import { toast } from 'react-toastify'
const data = [
    {
        Title: '250.81',
        Text: 'Diabetes with other specified manifestations, type I',
        Checked: true,
    },
    {
        Title: '714.0',
        Text: 'Rheumatoid arthritis',
        Checked: false,
    },
    {
        Title: '850.5',
        Text: 'Concussion with loss of consciousness of unspecified duration',
        Checked: true,
    },
]

const ManageConditions = () => {
    const [data, setData] = useState<any>()

    const getConditions = async () => {
        const userId = localStorage.getItem('userId')
        try {
            const response = await getConditionsService(userId)
            console.log(response)
        } catch (error) {
            toast
        }
    }
    useEffect(() => {
        getConditions()
    }, [])
    return (
        <>
            <Layout defaultHeader={true} hamburger={true}>
                <div className="Content-wrap Con">
                    <h2 className="Con-title">Manage conditionss</h2>
                    <p className="Con-Description">
                        These are your current conditions, turn them off to
                        remove, add a new one using the search bar.
                    </p>

                    <div className="Search-Input">
                        <SearchOutlined />
                        <Input
                            className="Input"
                            placeholder="Add a condition"
                            type="text"
                        />
                    </div>

                    <div className="Switch-wrap">
                        <h3 className="Title">My Conditions</h3>
                        {data?.map((data: any, i: any) => (
                            <SwitchQuestion
                                key={i}
                                Title={data.Title}
                                Text={data.Text}
                                Checked={data.Checked}
                            />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ManageConditions
