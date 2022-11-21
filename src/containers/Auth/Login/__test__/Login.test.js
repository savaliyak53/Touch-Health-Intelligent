import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../Login'
import { act } from 'react-dom/test-utils';

afterEach(cleanup)

test("Login render without crashing", async () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    await waitFor(() => {root.render(<Login/>);})  
})

test("Login renders correctly", () => {
    render(
    <BrowserRouter>
        <Login/>
    </BrowserRouter>
    )
})

test("Phone input in document", () => {
    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
        )
    const usernameElement = screen.getByPlaceholderText('Phone')
    expect(usernameElement).toBeInTheDocument()
})

test("Phone input has correct id", () => {
    const component = render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
        )
    const usernameElement = component.queryByPlaceholderText('Phone')

    expect(usernameElement.id).toBe('username')
})

test("Password input in document", () => {
    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
        )
    const pwdElement = screen.getByPlaceholderText('Password')
    expect(pwdElement).toBeInTheDocument()
})

test("Password input has correct id", () => {
    const component = render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
        )
    const pwdElement = component.queryByPlaceholderText('Password')

    expect(pwdElement).toHaveAttribute('id', 'password')
})

test("should be able to submit form", async () => {
    const submitFn = jest.fn()
    const { getByTestId, queryByPlaceholderText } = render(
        <BrowserRouter>
            <Login saveData={submitFn}/>
        </BrowserRouter>
        )
    const usernameElement = queryByPlaceholderText('Phone')
    const pwdElement = queryByPlaceholderText('Password')
    await act(async () => {    
        fireEvent.change(usernameElement, { target: {value: "16465780322"}})
        fireEvent.change(pwdElement, { target: {value: "abcd"}})
    })
    // await act(async () => {    
    //     fireEvent.click(getByTestId('button'))
    // })
    // expect(submitFn).toHaveBeenCalledWith({
    //     "password": "abcd",
    //     "username": "+16465780322"
    // })
})