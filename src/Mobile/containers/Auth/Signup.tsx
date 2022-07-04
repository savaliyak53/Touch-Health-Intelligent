import React from 'react'
import Layout from '../../Layout/Layout'
import { Button, Input, Form} from 'antd'
import './Auth.scss'

const Auth = () => {
  return (
    <>
        <Layout defaultHeader={false} hamburger={false}>
            <div className='Auth-wrap'>
                <Form className='Auth-form'>
                    <h2 className='Auth-title'>Sign up</h2>
                    <Input type='text' placeholder='Your name' className='Input' />
                    <Input type='tel' placeholder='Mobile phone number' className='Input' />
                    <Input type='password' placeholder='Create password' className='Input' />
                    <Input type='password' placeholder='Confirm password' className='Input' />
                    <Button type="primary" className='Auth-submit'>Create account</Button>
                </Form>

                <div className='Auth-terms'>
                    By creating your account you agree to the 
                    <a href="#"> Terms & Conditions</a>
                </div>
            </div>
        </Layout>
    </>
  )
}

export default Auth