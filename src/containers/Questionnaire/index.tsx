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
import { Interaction } from '../../interfaces'

function UserCondition() {
    const [question, setQuestion] = useState<Interaction | any>()
    const [value, setValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [refId, setRefId] = useState<string>('')
    const navigate = useNavigate()

    const getInteraction = async () => {
        //resolve the service using promise
        //TODO(<HamzaIjaz>): Refactor all the API calls like this
        getInteractionService()
            .then((response) => {
                if (response?.data?.question) {
                    setQuestion(response?.data?.question)
                    setRefId(response.data.ref_id)
                } else {
                    navigate('/questionnaire-submit')
                }
            })
            .catch(() => {
                toast('unkown error')
            })
    }
    useEffect(() => {
        getInteraction()
    }, [])
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
                setLoading(false)
                setRefId(data.ref_id ?? '')
                if (data.reward_nugget) {
                    toast.success(data.reward_nugget.congratulations_str)
                }
                if (data.question) {
                    setQuestion(data.question)
                } else {
                    navigate('/questionnaire-submit')
                }
            })
            .catch(() => {
                setLoading(false)
                toast.error('Something went wrong')
                setLoading(false)
            })
    }

    return (
        <AuthenticationLayout caption="Questionnaire">
            <Question
                question={question}
                setValue={setValue}
                onSubmit={onSubmit}
            />
            {question?.type !== 'yes_no' ? (
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
            ) : (
                <></>
            )}
        </AuthenticationLayout>
    )
}

export default UserCondition
