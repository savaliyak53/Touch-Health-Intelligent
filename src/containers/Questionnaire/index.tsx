import React, { useEffect, useState } from 'react'
import './index.scss'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import InputField from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { Empty, Select } from 'antd';
import { Slider, Steps, message } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import { inputData } from './inputData'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
const { Step } = Steps;


const steps = [
    {
        title: '',
        content: ''
    }
];

inputData.map((data, i) => {
    const d = (
        <div>{data.payload.q_str}</div>
    )
    const hi = data.payload.q_str
    // const ara = new Array({
    //   'title': '' + i,
    //   'content': '' + hi
    // })
    steps.push({
        'title': '' + i,
        'content': '' + i
    })
})


const options = (data: string[] | undefined) => {
    interface OptionsProps {
        label: string;
        value: string;
    }
    const options: OptionsProps[] = [];
    data?.map((value: string, i) => {
        options.push({
            label: `${value}`,
            value: '' + i,
        });
    })

    return options
}

// const addType = (a: any, b: any) => {
//     console.log(b)
//     return {
//         'type' : b,
//         'data' : a,
//     }
// }

interface Anything {
    [key: string]: number | string;
}




function UserCondition() {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate(`/questionnaire-submit`)
    }

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<Anything>({ mode: 'onChange', });
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
        // console.log(data)
    }

    const selectProps = {
        mode: 'multiple' as const,
        style: { width: '100%' },
        placeholder: 'Select Item...',
        maxTagCount: 'responsive' as const,
    };


    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    // console.log(errors && Object.keys(errors) && Object.getPrototypeOf(errors) === Object.prototype)
    return (
        <AuthenticationLayout caption="Questionnaire">
            <form
                className="UserCondition-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Steps size='small' direction="horizontal" current={current}>
                    {steps.slice(1).map(item => (
                        <Step key={item.title} />
                    ))}
                </Steps>
                {/* {errors.headache && <div>hello</div>} */}
                {current === steps.length - 1 && <h3 className='mt-3'>Thankyou!</h3>}
                {
                    inputData.map((data, index) => {
                        switch (data.type) {
                            case 'MULTIPLE_CHOICE':
                                return (
                                    <React.Fragment key={index}>
                                        {current === index &&
                                            <div key={index}>
                                                <div className="question">{data.payload.q_str}</div>
                                                <br />
                                                <>
                                                    {
                                                        <Controller
                                                            control={control}
                                                            {...register(`questionnaire`, {
                                                                required: true,
                                                            })}
                                                            render={({ field: { onChange } }) => (
                                                                <Select
                                                                    {...selectProps}
                                                                    options={options(data.payload.q_content.options)}
                                                                    onChange={onChange}
                                                                    value={watch().questionnaire}

                                                                />
                                                            )}
                                                        />
                                                    }
                                                </>
                                                <br />
                                                {errors.questionnaire && <p className="Questionnaire-error">This field is required</p>}

                                            </div>
                                        }
                                    </React.Fragment>
                                )
                                break;
                            case 'YES_NO':
                                return (
                                    <React.Fragment key={index}>
                                        {current === index &&
                                            <div>
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
                                        }
                                    </React.Fragment>
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
                                        <React.Fragment key={index}>
                                            {current === index &&
                                                <div>
                                                    <div className="question">
                                                        {data.payload.q_str}
                                                    </div>
                                                    <br />
                                                    <label>
                                                        <Controller
                                                            control={control}
                                                            {...register(`slider`, {
                                                                required: true,
                                                            })}
                                                            defaultValue={watch().slider}
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
                                                    <br />
                                                    {errors.slider && <p className="Questionnaire-error">This field is required</p>}
                                                </div>
                                            }
                                        </React.Fragment>
                                    )
                                }
                                break;
                        }
                    })
                }
                {/* <Button
                    className="mt-3"
                    size="lg"
                    onClick={() => { handleSubmit(onSubmit) }}
                >
                    Proceed
                </Button> */}
                {/* {current < steps.length - 1 && (
                    <Button className='mt-3'  onClick={() => next()} size='lg'>
                        Next
                    </Button>
                )} */}
                {/* <Button className='mt-3' onClick={() => { handleSubmit(onSubmit); message.success('Processing complete!') }} size='lg'>
                    Done
                </Button> */}
                {current === steps.length - 1 && (
                    <div className="align-center">
                        <Button className='mt-3' onClick={() => { handleSubmit(onSubmit); message.success('Processing complete!') }} size='lg'>
                            Done
                        </Button>
                    </div>
                )}

            </form>
            {/* {errors.questionnaire && 'hello'} */}
            <div className="UserCondition-form align-center">
                {current < steps.length - 1 && (
                    <Button className='mt-3' disabled={errors.questionnaire && true || errors.headache && true || errors.slider && true} onClick={() => next()} size='lg'>
                        Next
                    </Button>
                )}
                {current > 0 && (
                    <Button className='mt-3' onClick={() => prev()} size='lg'>
                        Previous
                    </Button>
                )}
            </div>
        </AuthenticationLayout>
    )
}

export default UserCondition