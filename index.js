import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import DevTools from './containers/DevTools'
import configureStore from './store/configureStore'
import routes from './routes';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
