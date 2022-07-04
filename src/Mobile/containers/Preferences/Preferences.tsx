import React from 'react'
import Layout from '../../Layout/Layout'
import { Button, Checkbox, Slider } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import './Preferences.scss'


const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

const Preferences = () => {
  return (
    <>
        <Layout defaultHeader={true} hamburger={false}>
            <div className='Pref-wrap'>
                <h2 className='Pref-title'>Preferences</h2>

                <div className='Question'>
                    <h3 className='Question-title'>Check-in preferred time of day:</h3>
                    <Checkbox className='Pref-checkbox' onChange={onChange}>Morning (7 am to 11:59 am)</Checkbox>
                    <br />
                    <Checkbox className='Pref-checkbox' onChange={onChange}>Mid-day (12 pm to 5.59 pm)</Checkbox>
                    <br />
                    <Checkbox className='Pref-checkbox' onChange={onChange}>Evening (6 pm - 9 pm)</Checkbox>
                </div>
                <div className='Question'>
                    <h3 className='Question-title'>How much time do you have for check-ins each week?</h3>
                    <Slider className='Pref-slider' defaultValue={50} tooltipVisible={false} />
                    <div className='Slider-range'>
                        <span>3 min</span>
                        <span>10 min</span>
                        <span>15 min</span>
                    </div>
                </div>

                <Button className='Pref-btn'>Save and Next</Button>
            </div>

        </Layout>
    </>
  )
}

export default Preferences