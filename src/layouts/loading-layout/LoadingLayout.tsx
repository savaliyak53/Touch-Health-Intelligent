import React from 'react'
import PropTypes from 'prop-types'

import './LoadingLayout.scss'

type Props = {
    children?: React.ReactChild | React.ReactChild[]
}

const LoadingLayout = ({ children }: Props) => (
    <div className="LoadingLayout">{children}</div>
)

export default LoadingLayout
