import React from 'react'
import './index.css'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useParams, useNavigate } from 'react-router-dom'

function IntroVideoLayout(props) {
    const { userId } = useParams()
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate(`/questionnaire/${userId}`)
    }
    return (
        <div className="cards-video-wrapper">
            <div className="card-text">
                <Typography gutterBottom variant="h5" component="div">
                    Welcome to touch health assistant
                </Typography>
                <Card
                    sx={{
                        maxWidth: '100%',
                        minWidth: '450px',
                        minHeight: '300px',
                        padding: '16px',
                    }}
                >
                    {/* <video height="300" controls autoPlay>
                <source
                  src="https://www.youtube.com/embed/I42Afr-OUso"
                  type="video/mp4"
                />
              </video> */}

                    <iframe
                        width="500"
                        height="300"
                        src={`https://www.youtube.com/embed/I42Afr-OUso`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </Card>
                <div className="action">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleRedirect}
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default IntroVideoLayout
