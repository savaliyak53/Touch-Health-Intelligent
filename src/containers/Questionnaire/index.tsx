import React from 'react'
import './index.scss'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import InputField from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { Select } from 'antd';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';

interface ItemProps {
    label: string;
    value: string;
}
const data = ['Sleep', 'Pian', 'Sensations', 'Stress/Anxeitey/Depression/Mood/Somatic', 'Cognitive', 'Exercise', 'Body Function', 'Activity Lavel', 'Concussions', 'Diet']
const options: ItemProps[] = [];

data.map((value) => {
    options.push({
        label: `${value}`,
        value,
    });
})

const marks: SliderMarks = {
    0: 'No pain',
    10: {
        style: {
            color: '#f50',
        },
        label: <strong>Worse pain imaginable</strong>,
    },
};


function UserCondition() {
    const navigate = useNavigate()
    
    const handleRedirect = () => {
        navigate(`/questionnaire-submit`)
}
    
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
        <AuthenticationLayout caption="Questionnaire">
            <form
                className="UserCondition-form"
            >
                {/* <div>
                    <div className="question">
                        How many minutes do you want to invest in interacting
                        with tha every week?
                    </div>
                    <br />
                    <Select
                        {...selectProps}
                    />
                    <br />
                </div> */}

                <div>
                    <div className="question">Which common symptoms of diabetes type II are you experiencing?</div>
                    <br />
                    <ul className="no-bullets">
                        <li>
                            <label>
                                <InputField
                                    id="reminMe"
                                    name="remindMe"
                                    type="checkbox"
                                    className="checkbox"
                                    value="true"
                                />
                                fatigue
                            </label>
                        </li>
                        <li>
                            <label>
                                <InputField
                                    id="reminMe"
                                    name="remindMe"
                                    type="checkbox"
                                    className="checkbox"
                                    value="false"
                                />
                                shortness-of-breath
                            </label>
                        </li>
                    </ul>
                    <br />
                </div>

                <div>
                    <div className="question">Are you currently experiening a headache?</div>
                    <br />
                    <ul className="no-bullets">
                        <li>
                            <label>
                                <InputField
                                    id="headache"
                                    name="headache"
                                    type="radio"
                                    className="radio"
                                    value="true"
                                />
                                Yes
                            </label>
                        </li>
                        <li>
                            <label>
                                <InputField
                                    id="headache"
                                    name="headache"
                                    type="radio"
                                    className="radio"
                                    value="false"
                                />
                                No
                            </label>
                        </li>
                    </ul>
                    <br />
                </div>

                <div>
                    <div className="question">
                        How painful is your headache?
                    </div>
                    <br />
                    <label>
                        <Slider marks={marks} min={0} max={10} step={0.5} trackStyle={{ backgroundColor: '#183284' }} handleStyle={{ borderColor: '#183284' }} />
                    </label>
                </div>

                <Button
                    className="mt-3"
                    size="lg"
                    onClick={() => { handleRedirect() }}
                >
                    Proceed
                </Button>
            </form>
        </AuthenticationLayout>
    )
}

export default UserCondition