import React from 'react'
import Layout from '../../layouts/Layout/Layout'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './index.scss'
import SwitchQuestion from '../../components/SwitchQuestion/SwitchQuestion'
const data = [
    {
        Title: '',
        Text: 'Managing stress',
        Checked: true,
    },
    {
        Title: '',
        Text: 'Yellow skin',
        Checked: false,
    },
    {
        Title: '',
        Text: 'Maintaining a job',
        Checked: true,
    },
    {
        Title: '',
        Text: 'Self-care',
        Checked: false,
    },
    {
        Title: '',
        Text: 'Intimate relationships',
        Checked: true,
    },
]
const ManageConcerns = () => {
    return (
        <>
            <Layout defaultHeader={true} hamburger={true}>
                <div className="Content-wrap Concerns">
                    <h2 className="Concerns-title">Manage concerns</h2>
                    <p className="Concerns-Description">
                        These are your current concerns, they can be things like
                        stress, pain, memory issues or physical symptoms
                    </p>

                    <div className="Search-Input">
                        <SearchOutlined />
                        <Input
                            className="Input"
                            placeholder="Add a concerns"
                            type="text"
                        />
                    </div>

                    <div className="Switch-wrap">
                        <h3 className="Title">My concerns</h3>
                        {data?.map((data, i) => (
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

export default ManageConcerns
