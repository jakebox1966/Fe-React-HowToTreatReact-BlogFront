import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import rootReducer, { rootSaga } from './modules/index.js'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'

import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'
import createSagaMiddleware from '@redux-saga/core'
import { check, tempSetUser } from './modules/user'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

function loadUser() {
    try {
        const user = localStorage.getItem('user')
        if (!user) return // 로그인 상태가 아니라면 아무것도 안 함
        store.dispatch(tempSetUser(JSON.parse(user)))
        store.dispatch(check())
    } catch (e) {
        console.log('localStorage is not working')
    }
}
sagaMiddleware.run(rootSaga)
loadUser()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    // </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
