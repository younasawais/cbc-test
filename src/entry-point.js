import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router'
import { ApolloProvider } from '@apollo/client';

import client from './api'
import rootReducers from './reducers'
import { HomePageContainer } from './containers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createBrowserHistory()

const store = createStore(
  rootReducers,
  {},
  composeEnhancers(applyMiddleware(logger)),
)

const App = () => {
  return (
    <ApolloProvider client={client}>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={HomePageContainer} />
            </Switch>
          </Router>
        </Provider>
    </ApolloProvider>
  )
}

export default App
