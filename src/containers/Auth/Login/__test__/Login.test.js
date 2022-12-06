import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from '../LoginForm/index'

const onSubmit = jest.fn();

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoginForm onSubmit={onSubmit}/>
        </BrowserRouter>
        )
})
afterEach(cleanup)
describe("input elemtens exist in dom",() => {
    test("Phone input has correct id", () => {
        expect(getUser().id).toBe('username')
    })
    
    test("Password input has correct id", () => {
        expect(getPassword()).toHaveAttribute('id', 'password')
    })
})
describe("input validates correctly", () => {
    test("all fields empty", async () => {
        await act(async () => {   
            fireEvent.submit(getForm())
        })
        expect(await getAlert()).toHaveLength(2);
        expect(screen.getByText('Phone is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
    })
})
describe("should be able to enter values and submit form", () => {
    test("form submit with correct input values", async () => { 
        expect(onSubmit).not.toBeCalled()
        await act(async () => {   
            fireEvent.change(getUser(), {target: {value:"16465780322"}})
            fireEvent.change(getPassword(), {target: {value:"Touch@1234!"}})
            fireEvent.click(getSubmit())
        })
        expect(getUser()).toHaveValue('1 (646) 578-0322');
        expect(getPassword()).toHaveValue('Touch@1234!');
        await waitFor(() => expect(screen.queryAllByRole("toast")).toHaveLength(0));
        expect(onSubmit).toBeCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toMatchObject({
            "password": "Touch@1234!",
            "username": "+16465780322"
        })
    
    })
})

const getUser = () => {
    return screen.getByPlaceholderText('Phone')
}
const getPassword = () => {
    return screen.getByTestId('pwd')
}
const getSubmit = () => {
    return screen.getByTestId('submit')
}
const getForm = () => {
    return screen.getByRole('login-form')
}
const getAlert = () => {
    return screen.getAllByRole('tooltip')
}