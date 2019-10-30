//import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDom from 'react-dom'
import App from './component/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))