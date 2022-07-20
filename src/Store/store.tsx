import React, { createContext, ReactElement, useReducer } from 'react'
import { insightReducer } from './Reducers/insightsReducer'

const initialState = {}
interface Props {
    children?: ReactElement
}

export const Store = createContext(initialState)

export const StoreProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(insightReducer, initialState)

    return (
        <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    )
}
