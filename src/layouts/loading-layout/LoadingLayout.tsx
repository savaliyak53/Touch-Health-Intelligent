import React from 'react'

import './LoadingLayout.scss'

type Props = {
    children?: React.ReactChild | React.ReactChild[]
}

const LoadingLayout = ({ children }: Props) => (
    <div className="LoadingLayout">{children}</div>
)

export default LoadingLayout
