import React, { useEffect, useState } from 'react'
import './index.scss'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
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
    const [loading, setLoading] = useState<boolean>(false)
    const [refId, setRefId] = useState<string>('')
    const getInteraction = async () => {
        //resolve the service using promise
        //TODO(<HamzaIjaz>): Refactor all the API calls like this
        getInteractionService()
            .then((response) => {
                console.log('service response is ', response)
                setQuestion(response.data.question)
                setRefId(response.data.ref_id)
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

    const onSubmit = async () => {
        setLoading(true)
        if (!value) {
            toast.error('Please select a value')
            return
        }
        const payload = {
            type: 'question',
            ref_id: refId,
            question_response: {
                ref_id: question.ref_id,
                type: question.type,
                value: value,
            },
            reward_nugget_response: {
                shared: true,
            },
        }
        postInteractionService(payload)
            .then(({ data }) => {
                console.log('response ', data)
                setLoading(false)
                setRefId(data.ref_id ?? '')
                if (data.reward_nugget) {
                    toast.success(data.reward_nugget.congratulations_str)
                }
                if (data.question) {
                    setQuestion(data.question)
                } else {
                    //navigate to dashboard
                }
            })
            .catch((error) => {
                console.log('error is ', error)
                setLoading(false)
                toast.error('Something went wrong')
            })
    }

    return (
        <AuthenticationLayout caption="Questionnaire">
            <Question
                type={question?.type}
                q_str={question?.q_str}
                setQuestionValue={setValue}
            />
            <div className="align-center">
                <Button
                    className="mt-3"
                    size="lg"
                    onClick={() => {
                        onSubmit()
                    }}
                    loading={loading}
                    disabled={loading}
                >
                    Next
                </Button>
            </div>
        </AuthenticationLayout>
    )
}

export default UserCondition
