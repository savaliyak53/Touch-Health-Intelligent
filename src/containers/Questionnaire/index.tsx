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
import { Checkbox } from 'antd'
import { v4 as uuidv4 } from 'uuid';


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
                'id': uuidv4(),
                'response': finalValue
            }
        });
        console.log(finalObject);
        handleRedirect();
    }

    return (
        <AuthenticationLayout caption="Questionnaire">
            <form
                className="UserCondition-form"
                onSubmit={handleSubmit(onSubmit)}
            >


                {
                    inputData.map((data, index) => {
                        switch (data.type) {
                            case 'MULTIPLE_CHOICE':
                                return (
                                    <div key={index}>
                                        <div className="question">{data.payload.q_str}</div>
                                        <br />

                                        <Controller
                                            control={control}
                                            {...register(`questionnaire`)}
                                            render={({ field: { onChange } }) => (
                                                <Checkbox.Group
                                                    name="questionnaire"
                                                    options={data.payload.q_content.options}
                                                    onChange={onChange}
                                                />
                                            )}


                                        />
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