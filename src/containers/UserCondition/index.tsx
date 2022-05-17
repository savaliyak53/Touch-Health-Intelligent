import React from 'react'
import './index.scss'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import InputField from '../../components/Input'
import Button from '../../components/Button'
import { Select } from 'antd';

interface ItemProps {
    label: string;
    value: string;
}
const data = ['Sleep', 'Pian','Sensations', 'Stress/Anxeitey/Depression/Mood/Somatic','Cognitive','Exercise','Body Function', 'Activity Lavel','Concussions','Diet']
const options: ItemProps[] = [];

data.map((value)=>{
    options.push({
        label: `${value}`,
        value,
    });
})

function UserCondition() {

    const [value, setValue] = React.useState([]);

    const selectProps = {
        mode: 'multiple' as const,
        style: { width: '100%' },
        value,
        options,
        onChange: (newValue: any) => {
            setValue(newValue);
        },
        placeholder: 'Select Item...',
        maxTagCount: 'responsive' as const,
    };

    // const handleChange = (newValue: string[]) => (
    //     setValue(newValue)
    // )

    // const timeOfDay = ['Morning', 'Afternoon', 'Evenings']
    return (
        <AuthenticationLayout caption="User Condition">
            <form
                className="UserCondition-form"
            >
                <div style={{marginBottom:'250px'}}>
                    <div className="question">
                        How many minutes do you want to invest in interacting
                        with tha every week?
                    </div>
                    <br />
                    <Select
                        {...selectProps}
                    />
                    <br />
                </div>
                <Button
                    className="mt-3"
                    size="lg"
                    onClick={() => { console.log('hello') }}
                >
                    Proceed
                </Button>
            </form>
        </AuthenticationLayout>
    )
}

export default UserCondition