import React from 'react'
import './index.scss'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import InputField from '../../components/Input'
import Button from '../../components/Button'

function UserInformation() {
  
  const timeOfDay = ['Morning', 'Afternoon', 'Evenings']
  return (
    <AuthenticationLayout caption="User Information">
            <form
                className="UserInformation-form"
            >
                <div>
                    <div className="question">
                        How many minutes do you want to invest in interacting
                        with tha every week?
                    </div>
                    <br />
                    <label>
                        <InputField
                            id="minutesPerWeek"
                            name=''
                            placeholder="Minutes Per Week"
                            type="number"
                            className="inputField mt-1"
                            defaultValue={0}
                            style={{
                                width: 'max-content',
                                marginRight: '10px',
                            }}
                        />
                        Minutes
                    </label>
                </div>

                <div>
                    <div className="question">
                        What are your prefered Times?
                    </div>
                    <br />
                    <ul
                        className="no-bullets"
                    >
                        {timeOfDay.map((c, i) => (
                            <li key={`${i}`}>
                                <label>
                                    <InputField
                                        key={i}
                                        id={`${c}`}
                                        name=''
                                        value={c}
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                    {c}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <br />

                 
                </div>

                <div>
                    <div className="question">Do you want to get reminded?</div>
                    <br />
                    <ul className="no-bullets">
                        <li>
                            <label>
                                <InputField
                                    id="reminMe"
                                    name="remindMe"
                                    type="radio"
                                    className="checkbox"
                                    value="true"
                                />
                                Yes
                            </label>
                        </li>
                        <li>
                            <label>
                                <InputField
                                    id="reminMe"
                                    name="remindMe"
                                    type="radio"
                                    className="checkbox"
                                    value="false"
                                />
                                No
                            </label>
                        </li>
                    </ul>
                    <br />
                </div>
                <Button
                    className="mt-3"
                    size="lg"
                    onClick={()=>{console.log('hello')}}
                >
                    Proceed
                </Button>
            </form>
        </AuthenticationLayout>
  )
}

export default UserInformation