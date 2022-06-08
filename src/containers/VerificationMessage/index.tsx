import React from 'react'
import './index.css'
import Typography from '@mui/material/Typography'

function VerificationMessage() {
    return (
        <div className="cards-video-wrapper">
            <div className="card-text">
                <Typography gutterBottom variant="h5" component="div">
                    Welcome to Touch Health Assistant
                </Typography>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="response"
                >
                    You need to verify your phone number before you login
                </Typography>
                <p className="response">
                    Please check your provided phone and email for verification
                </p>
            </div>
        </div>
    )
}
export default VerificationMessage
