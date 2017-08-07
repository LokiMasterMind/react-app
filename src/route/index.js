import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppRoot from '../components/AppRoot'
import Login from '../components/Login'
import Home from '../components/Home'

export default (
    <Route
        path="/"
        component={AppRoot}>
        <IndexRoute component={Login}/>
        <Route
            path="login"
            title="Login"
            component={Login}/>
        <Route
            path="home"
            title="Home"
            component={Home}/>
        <Route
            path="*"
            component={Login}/>
    </Route>
)
