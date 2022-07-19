import React from 'react'
import Layout from '../../layouts/Layout/Layout'
import { Button } from 'antd'
import { response } from '../../utils/lib'
import './index.scss'

const Dashboard = () => {
    return (
        <>
            <Layout defaultHeader={true} hamburger={true} dashboard={true}>
                <div className="Db-wrap">
                    <div className="btn-group">
                        <Button className="Db-Btn disabled">.</Button>
                        <Button className="Db-Btn disabled">.</Button>
                        {/* <Button className="Db-Btn disabled">.</Button>
                        <Button className="Db-Btn disabled">.</Button>
                        <Button className="Db-Btn disabled">.</Button>
                        <Button className="Db-Btn disabled">.</Button>
                        <Button className="Db-Btn disabled">.</Button> */}
                        <div className="Db-Btn primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="30"
                                viewBox="0 0 36 30"
                            >
                                <g
                                    id="brifcase"
                                    transform="translate(467 -271)"
                                >
                                    <g
                                        id="Group_70"
                                        data-name="Group 70"
                                        transform="translate(-455 271)"
                                    >
                                        <path
                                            id="Path_54"
                                            data-name="Path 54"
                                            d="M-447.75,277h-10.5a.75.75,0,0,1-.75-.75v-3a2.253,2.253,0,0,1,2.25-2.25h7.5a2.253,2.253,0,0,1,2.25,2.25v3A.75.75,0,0,1-447.75,277Zm-9.75-1.5h9v-2.25a.75.75,0,0,0-.75-.75h-7.5a.75.75,0,0,0-.75.75Z"
                                            transform="translate(459 -271)"
                                            fill="#fff"
                                        />
                                    </g>
                                    <g
                                        id="Group_71"
                                        data-name="Group 71"
                                        transform="translate(-467 275.5)"
                                    >
                                        <path
                                            id="Path_55"
                                            data-name="Path 55"
                                            d="M-433.25,274h-31.5a2.253,2.253,0,0,0-2.25,2.25V283h36v-6.75A2.253,2.253,0,0,0-433.25,274Z"
                                            transform="translate(467 -274)"
                                            fill="#fff"
                                        />
                                        <path
                                            id="Path_56"
                                            data-name="Path 56"
                                            d="M-438.5,281v3h-3v-3h-15v3h-3v-3H-467v12.75a2.253,2.253,0,0,0,2.25,2.25h31.5a2.253,2.253,0,0,0,2.25-2.25V281h-7.5Z"
                                            transform="translate(467 -270.5)"
                                            fill="#fff"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Dashboard
