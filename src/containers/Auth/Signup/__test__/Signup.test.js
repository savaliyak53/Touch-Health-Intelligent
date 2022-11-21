import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Signup from '../Signup'

afterEach(cleanup)

test("Signup render without crashing", async () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    await waitFor(() => {root.render(<Signup/>);})  
})

test("Signup renders correctly", () => {
    render(
    <BrowserRouter>
        <Signup/>
    </BrowserRouter>
    )
})

test("Username input in document with correct id", () => {
    render(
        <BrowserRouter>
            <Signup/>
        </BrowserRouter>
        )
    const usernameElement = screen.getByPlaceholderText('Username')
    expect(usernameElement).toBeInTheDocument()
    expect(usernameElement.id).toBe('name')

})

test("Phone input has correct id", () => {
    const component = render(
        <BrowserRouter>
            <Signup/>
        </BrowserRouter>
        )
    const phoneElement = component.queryByPlaceholderText('Phone')
    expect(phoneElement).toBeInTheDocument()
    expect(phoneElement.id).toBe('phone')
})

test("Confirm Phone input has correct id", () => {
    const component = render(
        <BrowserRouter>
            <Signup/>
        </BrowserRouter>
        )
    const confirmPhoneElement = component.queryByPlaceholderText('Confirm Phone')
    expect(confirmPhoneElement).toBeInTheDocument()
    expect(confirmPhoneElement.id).toBe('confirmPhone')
})

test("Password input in document", () => {
    render(
        <BrowserRouter>
            <Signup/>
        </BrowserRouter>
        )
    const pwdElement = screen.getByPlaceholderText('Enter password here')
    expect(pwdElement).toBeInTheDocument()
    expect(pwdElement).toHaveAttribute('id', 'password')
})

test("Confirm Password input has correct id", () => {
    const component = render(
        <BrowserRouter>
            <Signup/>
        </BrowserRouter>
        )
    const confirmPwdElement = component.queryByPlaceholderText('Confirm password here')
    expect(confirmPwdElement).toBeInTheDocument()
    expect(confirmPwdElement).toHaveAttribute('id', 'confirmPassword')
})