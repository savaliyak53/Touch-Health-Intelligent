import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import PasswordRecovery from '../index'
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  rest.post("https://dev-tha-api.oracle.touchmedical.ca/api/v1/auth/password-recovery", (req, res, ctx) => {
  return res(
    ctx.json({})
  );
  }),

  rest.get("https://dev-tha-api.oracle.touchmedical.ca/api/v1/payments/subscription-status", (req, res, ctx) => {
  return res(
    ctx.set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3ZWFkMDQwLTY1MmQtMTFlZC1iNjA1LWNmMTkwY2RhZjdjNSIsImlhdCI6MTY2ODY4MzYyNywiZXhwIjoxNjcxMjc1NjI3fQ.DbqeCZ_eWZjheLGnlwHwLGcBlUzH7zNFIi-RcKTtsmj0qPer6iWl-uXUXzWPoT7RWYKdnjE5BO_dkOIdlZM0TJE8pyQwj4jQ1bgCV0B-UfsxaKPXMNe55yIhhrwXzjzwB3HvUEo5RtL16h16mHXb3UqP9IAFuubSw3ySsPijtTIKh_Zg9jHeGUxSW7KCRn2EpB0zLsYMSXB7XnMagR3oVLlMqtxXf-6-Rg3rhs8dCLGBHs3NHa9iOZCKuXzHY15I74d2QDyGK3BybgdFEpBVBtN4fg9XAr5aUdJxbAG8-f4dDEHLtUUS3MrkeWA0ebFzpaI9ui7fgfKfIDDXusrdE9WCrm3ZlkDlKt0MzmlnA9dOVirVQZZXP8WVHK6TQkyr5X1HqubzOhmyO9ASpM-qzlQnp1jGLRpMJMt9veukeT44BwmhuMLKorDstTSp-BR-Gl0SAgRzvP5B5pyG0-yQ6SdCw5klobditJKZlpuDDhajXz8u7Ic5AuZ_xGC9ss7M3WIl_3G0k9-Hb6k60-pKoJ-2WOc6BwCZpYF-J6AD7-ZJ7ro8Ro9LgeK-_goZf0vuXxq2SAzwGZARTmxoHYAsotoXCkN0qmdYwe4_ygBGRIk6zqksZJJ_exPfM98IIshNUqurwkVc5sCrW6L3iSLp0VN2piy4G9puDOUXtPC_Vl4'),
    ctx.json({"status":"ACTIVE"})
  );
  }),

  rest.get("https://dev-tha-api.oracle.touchmedical.ca/api/v1/payments/subscription", (req, res, ctx) => {
  return res(
    ctx.set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3ZWFkMDQwLTY1MmQtMTFlZC1iNjA1LWNmMTkwY2RhZjdjNSIsImlhdCI6MTY2ODY4MzYyNywiZXhwIjoxNjcxMjc1NjI3fQ.DbqeCZ_eWZjheLGnlwHwLGcBlUzH7zNFIi-RcKTtsmj0qPer6iWl-uXUXzWPoT7RWYKdnjE5BO_dkOIdlZM0TJE8pyQwj4jQ1bgCV0B-UfsxaKPXMNe55yIhhrwXzjzwB3HvUEo5RtL16h16mHXb3UqP9IAFuubSw3ySsPijtTIKh_Zg9jHeGUxSW7KCRn2EpB0zLsYMSXB7XnMagR3oVLlMqtxXf-6-Rg3rhs8dCLGBHs3NHa9iOZCKuXzHY15I74d2QDyGK3BybgdFEpBVBtN4fg9XAr5aUdJxbAG8-f4dDEHLtUUS3MrkeWA0ebFzpaI9ui7fgfKfIDDXusrdE9WCrm3ZlkDlKt0MzmlnA9dOVirVQZZXP8WVHK6TQkyr5X1HqubzOhmyO9ASpM-qzlQnp1jGLRpMJMt9veukeT44BwmhuMLKorDstTSp-BR-Gl0SAgRzvP5B5pyG0-yQ6SdCw5klobditJKZlpuDDhajXz8u7Ic5AuZ_xGC9ss7M3WIl_3G0k9-Hb6k60-pKoJ-2WOc6BwCZpYF-J6AD7-ZJ7ro8Ro9LgeK-_goZf0vuXxq2SAzwGZARTmxoHYAsotoXCkN0qmdYwe4_ygBGRIk6zqksZJJ_exPfM98IIshNUqurwkVc5sCrW6L3iSLp0VN2piy4G9puDOUXtPC_Vl4'),
    ctx.json({"id":"sub_1M4WqFLXXC3A1O2HIHKEQ6Qo","plan":{"id":"price_1LpBu3LXXC3A1O2Heb2wrPYg","name":"3 day plan","description":"$1.25 / 3 Days","price":{"amount":125,"currency":"cad","interval":"day","intervalCount":3,"amountFormatted":"$1.25"},"trialPeriod":{"interval":"day","repetitions":1}},"currentPeriod":{"starts":"2022-11-15T21:38:51.000Z","ends":null},"renewalDate":"2022-11-23T11:51:56.000Z","trialing":false})
  );
  }),

]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

afterEach(cleanup)

test("send code page elements exist", async () => {
    await act(async () => render(
        <BrowserRouter>
          <PasswordRecovery/>
        </BrowserRouter>
        ));
    const phoneElement = screen.getByPlaceholderText('Phone')
    const sendCodeBtn = screen.getByText('Send Code')
    expect(screen.getByText('Reset Password')).toBeInTheDocument()
    expect(phoneElement).toBeInTheDocument()
    expect(sendCodeBtn).toBeInTheDocument()

})

test("send code on phone", async () => {
    await act(async () => render(
        <BrowserRouter>
          <PasswordRecovery/>
        </BrowserRouter>
    ));
    const phoneElement = screen.getByPlaceholderText('Phone')
    const sendCodeBtn = screen.getByText('Send Code')
    await act(async () => {    
        fireEvent.change(phoneElement, { target: {value: "16465780322"}})
        fireEvent.click(sendCodeBtn)
    })
    expect(phoneElement).not.toBeInTheDocument()
    expect(sendCodeBtn).not.toBeInTheDocument()
    // screen.debug()
})

test("verification code page elements exist", async () => {
    await act(async () => render(
        <BrowserRouter>
          <PasswordRecovery/>
        </BrowserRouter>
    ));
    const phoneElement = screen.getByPlaceholderText('Phone')
    const sendCodeBtn = screen.getByText('Send Code')
    await act(async () => {    
        fireEvent.change(phoneElement, { target: {value: "16465780322"}})
        fireEvent.click(sendCodeBtn)
    })
    screen.debug()
})
