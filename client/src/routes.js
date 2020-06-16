import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import {LoginPage} from './pages/LoginPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todo" exact>
          <LoginPage />
        </Route>
        <Redirect to="/todo" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}