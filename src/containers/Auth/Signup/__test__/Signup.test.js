import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SignupForm from '../SignupForm/index'

const onSubmit = jest.fn();

beforeEach(() => {
    render(
        <BrowserRouter>
            <SignupForm onSubmit={onSubmit}/>
        </BrowserRouter>
        )
})
afterEach(cleanup)

describe("input elements exist in dom",() => {

    test("Username input in document with correct id", () => {
        expect(getUser()).toBeInTheDocument()
        expect(getUser().id).toBe('name')
    })

    test("Phone input has correct id", () => {
        screen.getByPlaceholderText('Phone')
        expect(getPhone()).toBeInTheDocument()
        expect(getPhone().id).toBe('phone')
    })

    test("Confirm Phone input has correct id", () => {
        screen.getByPlaceholderText('Confirm Phone')
        expect(getConfirmPhone()).toBeInTheDocument()
        expect(getConfirmPhone().id).toBe('confirmPhone')
    })

    test("Password input in document", () => {
        screen.getByPlaceholderText('Enter password here')
        expect(getPwd()).toBeInTheDocument()
        expect(getPwd()).toHaveAttribute('id', 'password')
    })

    test("Confirm Password input has correct id", () => {
        screen.getByPlaceholderText('Confirm password here')
        expect(getConfirmPwd()).toBeInTheDocument()
        expect(getConfirmPwd()).toHaveAttribute('id', 'confirmPassword')
    })
})

describe("input validates correctly", () => {
    test("all fields empty", async () => {
        await act(async () => {   
            fireEvent.submit(getForm())
        })
        expect(await getAlert()).toHaveLength(4);
        expect(screen.getByText('Username is required.')).toBeInTheDocument();
        expect(screen.getByText('Phone is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
        expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
    })

    test("check confirm phone validation", async () => {
        fireEvent.change(getUser(), {target: {value:"test"}})
        fireEvent.change(getPhone(), {target: {value:"18678772859"}})
        fireEvent.change(getPwd(), {target: {value:"Touch@123!"}})
        fireEvent.change(getConfirmPwd(), {target: {value:"Touch@123!"}})
        await act(async () => {   
            fireEvent.submit(getForm())
        })
        expect(await getAlert()).toHaveLength(1);
        expect(screen.getByText('Phone is required')).toBeInTheDocument();
    })
    test("phone numbers match validation", async () => {
        fireEvent.change(getUser(), {target: {value:"test"}})
        fireEvent.change(getPhone(), {target: {value:"18678772859"}})
        fireEvent.change(getConfirmPhone(), {target: {value:"186787728591"}})
        fireEvent.change(getPwd(), {target: {value:"Touch@123!"}})
        fireEvent.change(getConfirmPwd(), {target: {value:"Touch@123!"}})
        await act(async () => {   
            fireEvent.submit(getForm())
        })
        expect(await getAlert()).toHaveLength(1);
        expect(screen.getByText('Phone numbers do not match')).toBeInTheDocument();
    })
    test("passwords match validation", async () => {
        fireEvent.change(getUser(), {target: {value:"test"}})
        fireEvent.change(getPhone(), {target: {value:"18678772859"}})
        fireEvent.change(getConfirmPhone(), {target: {value:"18678772859"}})
        fireEvent.change(getPwd(), {target: {value:"Touch@1234!"}})
        fireEvent.change(getConfirmPwd(), {target: {value:"Touch@123!"}})
        await act(async () => {   
            fireEvent.submit(getForm())
        })
        expect(await getAlert()).toHaveLength(1);
        expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    })
})
describe("should be able to enter values and submit form", () => {
    test("form submit with correct input values", async () => { 
        fireEvent.change(getUser(), {target: {value:"test"}})
        fireEvent.change(getPhone(), {target: {value:"18678772859"}})
        fireEvent.change(getConfirmPhone(), {target: {value:"18678772859"}})
        fireEvent.change(getPwd(), {target: {value:"Touch@123!"}})
        fireEvent.change(getConfirmPwd(), {target: {value:"Touch@123!"}})
        expect(getUser()).toHaveValue('test');
        expect(getPhone()).toHaveValue('1 (867) 877-2859');
        expect(getConfirmPhone()).toHaveValue('1 (867) 877-2859');
        expect(getPwd()).toHaveValue('Touch@123!');
        expect(getConfirmPwd()).toHaveValue('Touch@123!');
        await act(async () => {   
            fireEvent.submit(getForm())
        })
        fireEvent.change(getConfirmPhone(), {target: {value:"18678772859"}})
        await act(async () => {   

            fireEvent.submit(getForm())
        })

        expect(onSubmit).toBeCalledTimes(1)
        expect(onSubmit.mock.lastCall[0]).toMatchObject({
            name: 'test',
            password: 'Touch@123!',
            confirmPassword: 'Touch@123!',
            phone: '+18678772859',
            confirmPhone: '+18678772859'
        })
    })
        
})
const getUser = () => {
    return screen.getByPlaceholderText('Username')
}
const getPhone = () => {
    return screen.getByPlaceholderText('Phone')
}
const getConfirmPhone = () => {
    return screen.getByPlaceholderText('Confirm Phone')
}
const getPwd = () => {
    return screen.getByPlaceholderText('Enter password here')
}
const getConfirmPwd = () => {
    return screen.getByPlaceholderText('Confirm password here')
}
const getForm = () => {
    return screen.getByRole('signup-form')
}
const getAlert = () => {
    return screen.getAllByRole('tooltip')
}
const getToast = () => {
    return screen.getAllByRole('alert')
}
