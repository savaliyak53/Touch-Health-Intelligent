import React from 'react'
import Layout from '../../../layouts/Layout/Layout'
import { Button, Input, Form } from 'antd'
import './Auth.scss'

const Signup = () => {
    return (
        <>
            <Layout defaultHeader={false} hamburger={false}>
                <div className="Auth-wrap">
                    <Form className="Auth-form">
                        <h2 className="Auth-title">
                            Touch Health Assistant Login
                        </h2>

                        <Input
                            type="tel"
                            placeholder="Phone number"
                            className="app-Input"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            className="app-Input"
                        />
                        <div className="Auth-forgot-wrap">
                            <a href="#" className="Auth-forgot">
                                Forgot password?
                            </a>
                        </div>
                        <Button type="primary" className="Auth-submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </Layout>
        </>
    )
}

export default Signup
