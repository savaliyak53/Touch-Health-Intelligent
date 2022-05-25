import React from 'react'
import './index.scss'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import InputField from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
// import { Select } from 'antd';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import { inputData } from './inputData'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { Checkbox } from 'antd'

// interface ItemProps {
//     label: string;
//     value: string;
// }
// const data = ['Sleep', 'Pian', 'Sensations', 'Stress/Anxeitey/Depression/Mood/Somatic', 'Cognitive', 'Exercise', 'Body Function', 'Activity Lavel', 'Concussions', 'Diet']
// const options: ItemProps[] = [];

// data.map((value) => {
//     options.push({
//         label: `${value}`,
//         value,
//     });
// })

interface Anything {
    [key: string]: string | number;
}



function UserCondition() {
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate(`/questionnaire-submit`)
    }

    const { register, handleSubmit, control, formState: { errors } } = useForm<Anything>();
    const onSubmit: SubmitHandler<Anything> = data => {

        const objectIntoArray = Object.entries(data)

        const finalObject = objectIntoArray.map((d) => {
            const finalValue = { 'selection': d[1] }
            return {
                'response': finalValue
            }
        });
        console.log(finalObject);
        handleRedirect();
    }


    // const [value, setValue] = React.useState([]);

    // const selectProps = {
    //     mode: 'multiple' as const,
    //     style: { width: '100%' },
    //     value,
    //     options,
    //     onChange: (newValue: any) => {
    //         setValue(newValue);
    //     },
    //     placeholder: 'Select Item...',
    //     maxTagCount: 'responsive' as const,
    // };

    // const handleChange = (newValue: string[]) => (
    //     setValue(newValue)
    // )

    // const timeOfDay = ['Morning', 'Afternoon', 'Evenings']
    return (
        <AuthenticationLayout caption="Questionnaire">
            <form
                className="UserCondition-form"
                onSubmit={handleSubmit(onSubmit)}
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

                {
                    inputData.map((data, index) => {
                        switch (data.type) {
                            case 'MULTIPLE_CHOICE':
                                return (
                                    <div key={index}>
                                        <div className="question">{data.payload.q_str}</div>
                                        <br />
                                        <ul className="no-bullets"
                                            {...register(`questionnaire`, {
                                                required: true,
                                            })}
                                        >
                                            {
                                                data.payload.q_content.options?.map((option, i) => (
                                                    <li key={i}>
                                                        <label>
                                                            <InputField
                                                                type="checkbox"
                                                                className="checkbox"
                                                                value={option}
                                                                {...register(`questionnaire`)}
                                                            />
                                                            {option}
                                                        </label>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <br />
                                        {errors.questionnaire && <p className="Questionnaire-error">This field is required</p>}

                                    </div>
                                )
                                break;
                            case 'YES_NO':
                                return (
                                    <div key={index}>
                                        <div className="question">{data.payload.q_str}</div>
                                        <br />
                                        <ul className="no-bullets"
                                            {...register('headache', {
                                                required: true,
                                            })}>
                                            <li>
                                                <label>
                                                    <InputField
                                                        type="radio"
                                                        className="radio"
                                                        value="true"
                                                        {...register("headache")}
                                                    />
                                                    Yes
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <InputField
                                                        type="radio"
                                                        className="radio"
                                                        value="false"
                                                        {...register("headache")}
                                                    />
                                                    No
                                                </label>
                                            </li>
                                        </ul>
                                        <br />
                                        {errors.headache && <p className="Questionnaire-error">This field is required</p>}

                                    </div>
                                )
                                break;
                            case 'SLIDER':
                                {
                                    const marks: SliderMarks = {
                                        0: data.payload.q_content.lower?.qualifier,
                                        10: {
                                            style: {
                                                color: '#f50',
                                            },
                                            label: <strong>{data.payload.q_content.upper?.qualifier}</strong>,
                                        },
                                    };
                                    return (
                                        <div key={index}>
                                            <div className="question">
                                                {data.payload.q_str}
                                            </div>
                                            <br />
                                            <label>
                                                <Controller
                                                    control={control}
                                                    name="slider"
                                                    render={({ field: { onChange } }) => (
                                                        <Slider
                                                            marks={marks}
                                                            min={0} max={10}
                                                            step={data.payload.q_content.step}
                                                            trackStyle={{ backgroundColor: '#183284' }}
                                                            handleStyle={{ borderColor: '#183284' }}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                            </label>
                                        </div>
                                    )
                                }
                                break;
                        }
                    })
                }









                {/* <div>
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
                </div> */}

                <Button
                    className="mt-3"
                    size="lg"
                    onClick={() => { handleSubmit(onSubmit) }}
                >
                    Proceed
                </Button>
            </form>
        </AuthenticationLayout>
    )
}

export default UserCondition