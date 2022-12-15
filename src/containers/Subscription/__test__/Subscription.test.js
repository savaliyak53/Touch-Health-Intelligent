import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Subscription from '../Subscription'
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  rest.get("https://dev-tha-api.oracle.touchmedical.ca/api/v1/payments/subscription/plans", (req, res, ctx) => {
  return res(
    ctx.set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3ZWFkMDQwLTY1MmQtMTFlZC1iNjA1LWNmMTkwY2RhZjdjNSIsImlhdCI6MTY2ODY4MzYyNywiZXhwIjoxNjcxMjc1NjI3fQ.DbqeCZ_eWZjheLGnlwHwLGcBlUzH7zNFIi-RcKTtsmj0qPer6iWl-uXUXzWPoT7RWYKdnjE5BO_dkOIdlZM0TJE8pyQwj4jQ1bgCV0B-UfsxaKPXMNe55yIhhrwXzjzwB3HvUEo5RtL16h16mHXb3UqP9IAFuubSw3ySsPijtTIKh_Zg9jHeGUxSW7KCRn2EpB0zLsYMSXB7XnMagR3oVLlMqtxXf-6-Rg3rhs8dCLGBHs3NHa9iOZCKuXzHY15I74d2QDyGK3BybgdFEpBVBtN4fg9XAr5aUdJxbAG8-f4dDEHLtUUS3MrkeWA0ebFzpaI9ui7fgfKfIDDXusrdE9WCrm3ZlkDlKt0MzmlnA9dOVirVQZZXP8WVHK6TQkyr5X1HqubzOhmyO9ASpM-qzlQnp1jGLRpMJMt9veukeT44BwmhuMLKorDstTSp-BR-Gl0SAgRzvP5B5pyG0-yQ6SdCw5klobditJKZlpuDDhajXz8u7Ic5AuZ_xGC9ss7M3WIl_3G0k9-Hb6k60-pKoJ-2WOc6BwCZpYF-J6AD7-ZJ7ro8Ro9LgeK-_goZf0vuXxq2SAzwGZARTmxoHYAsotoXCkN0qmdYwe4_ygBGRIk6zqksZJJ_exPfM98IIshNUqurwkVc5sCrW6L3iSLp0VN2piy4G9puDOUXtPC_Vl4'),
    ctx.json({"plans":[{"id":"price_1LxtDSLXXC3A1O2H01VflCVT","name":"Quarterly Plan","description":"$45 / 3 Months","price":{"amount":4500,"currency":"cad","interval":"month","intervalCount":3,"amountFormatted":"$45.00"},"trialPeriod":{"interval":"DAY","repetitions":14}},{"id":"price_1LpBu3LXXC3A1O2Heb2wrPYg","name":"3 day plan","description":"$1.25 / 3 Days","price":{"amount":125,"currency":"cad","interval":"day","intervalCount":3,"amountFormatted":"$1.25"},"trialPeriod":{"interval":"DAY","repetitions":1}},{"id":"price_1LopboLXXC3A1O2HGzFhTxo1","name":"Weekly Plan","description":"$4.50 / Week","price":{"amount":450,"currency":"cad","interval":"week","intervalCount":1,"amountFormatted":"$4.50"}},{"id":"price_1Lopb3LXXC3A1O2H0db0i2vy","name":"2 Day Plan","description":"$0.55 / 2 Days","price":{"amount":55,"currency":"cad","interval":"day","intervalCount":2,"amountFormatted":"$0.55"}},{"id":"price_1LopZlLXXC3A1O2HyKfjY85W","name":"Daily Plan","description":"$0.65 / Day","price":{"amount":65,"currency":"cad","interval":"day","intervalCount":1,"amountFormatted":"$0.65"}},{"id":"price_1LnoAnLXXC3A1O2HStm3S3Yl","name":"Monthly Plan","description":"$15.00 / Month","price":{"amount":1500,"currency":"cad","interval":"month","intervalCount":1,"amountFormatted":"$15.00"},"trialPeriod":{"interval":"DAY","repetitions":21}},{"id":"price_1LkVqcLXXC3A1O2HSsD4xE18","name":"Semi-Annual","description":"$59.00 / 6 Months","price":{"amount":5900,"currency":"cad","interval":"month","intervalCount":6,"amountFormatted":"$59.00"},"trialPeriod":{"interval":"DAY","repetitions":14}},{"id":"price_1LkVowLXXC3A1O2HEoLbSDID","name":"Yearly Plan - Save 45%","description":"$99.00 / Year","price":{"amount":9900,"currency":"cad","interval":"year","intervalCount":1,"amountFormatted":"$99.00"},"trialPeriod":{"interval":"DAY","repetitions":14}}],"freeTrial":false})
  );
  }),

  rest.get("https://dev-tha-api.oracle.touchmedical.ca/api/v1/payments/subscription/status", (req, res, ctx) => {
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

test("card in document", async () => {
    await act(async () => render(
        <BrowserRouter>
          <Subscription/>
        </BrowserRouter>
        ));
    expect(screen.getByText('Quarterly Plan')).toBeInTheDocument()
    expect(screen.getByText('3 day plan')).toBeInTheDocument()
    expect(screen.getByText('Weekly Plan')).toBeInTheDocument()
    expect(screen.getByText('2 Day Plan')).toBeInTheDocument()
    expect(screen.getByText('Daily Plan')).toBeInTheDocument()
    expect(screen.getByText('Monthly Plan')).toBeInTheDocument()
    expect(screen.getByText('Semi-Annual')).toBeInTheDocument()
    expect(screen.getByText('Yearly Plan - Save 45%')).toBeInTheDocument()
})

