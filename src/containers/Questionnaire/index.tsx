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
    const [question, setQuestion] = useState<Interaction | any>()
    const [value, setValue] = useState<string>('')
    const getInteraction = async () => {
        //resolve the service using promise
        //TODO(<HamzaIjaz>): Refactor all the API calls like this
        getInteractionService()
            .then((response) => {
                console.log('service response is ', response)
                setQuestion(response.data.question)
            })
            .catch((error) => {
                console.log(
                    'error occurred while getting user interaction ',
                    error
                )
            })
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

    const onSubmit = async () => {
        if (!value) {
            toast.error('Please select a value')
            return
        }
        const { data } = await postInteractionService({
            type: question?.type,
            ref_id: question?.ref_id,
            question_response: {
                ref_id: question.ref_id,
                type: question.type,
                selected_time: value,
            },
            reward_nugget_response: {
                shared: true,
            },
        })
        // if (data.details.response.detail[0].msg) {
        //     toast(data.details.response.detail[0].msg)
        // }
    }

    return (
        <AuthenticationLayout caption="Questionnaire">
            {/* <form
                className="UserCondition-form"
                onSubmit={handleSubmit(onSubmit)}
            > */}
            <Question
                type={question?.type}
                q_str={question?.q_str}
                control={control}
                register={register}
                errors={errors}
                questionValue={value}
                setQuestionValue={setValue}
            />
            <div className="align-center">
                <Button
                    className="mt-3"
                    onClick={() => {
                        onSubmit()
                    }}
                    size="lg"
                >
                    Submit
                </Button>
            </div>
            {/* </form> */}
        </AuthenticationLayout>
    )
}

export default UserCondition
