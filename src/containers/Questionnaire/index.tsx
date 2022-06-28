import React, { useEffect, useState } from 'react'
import './index.scss'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import Question from '../../components/Question'
import {
    getInteractionService,
    postInteractionService,
} from '../../services/authservice'

type Interaction = {
    type: string
    ref_id: string
    question: {
        ref_id: string
        type: string
        q_str: string
    }
    reward_nugget: {
        congratulations_str: string
        statistic_str: string
    }
}

function UserCondition() {
    const [question, setQuestion] = useState<Interaction>()
    const [value, setValue] = useState<string>()
    const getInteraction = async () => {
        const question: any = await getInteractionService()
        setQuestion(question)
    }
    useEffect(() => {
        getInteraction()
    }, [])
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate(`/questionnaire-submit`)
    }
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<any>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<any> = async (data) => {
        const response = await postInteractionService({
            type: question?.type,
            ref_id: question?.ref_id,
            question_response: {
                ref_id: question?.question.ref_id,
                type: question?.question.type,
                selected_time: value,
            },
            reward_nugget_response: {
                shared: true,
            },
        })
        if (response?.response.data.details.response.detail[0].msg) {
            toast(response?.response.data.details.response.detail[0].msg)
        }
    }

    return (
        <AuthenticationLayout caption="Questionnaire">
            <form
                className="UserCondition-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Question
                    type={question?.question.type}
                    q_str={question?.question.q_str}
                    control={control}
                    register={register}
                    errors={errors}
                    value={value}
                    setValue={setValue}
                />
                <div className="align-center">
                    <Button
                        className="mt-3"
                        onClick={() => {
                            handleSubmit(onSubmit)
                        }}
                        size="lg"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </AuthenticationLayout>
    )
}

export default UserCondition
