import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Dashboard from "./google-drive/Dashboard"
import Signup from "./authentication/Signup"
import { AuthProvider } from '../contexts/AuthContext'
import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import Login from "./authentication/Login"
import Profile from "./authentication/Profile"
import PrivateRoute from "./authentication/PrivateRoute"
import ForgotPassword from "./authentication/ForgotPassword"
import UpdateProfile from "./authentication/UpdateProfile"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
        {/* Google Drive */}
        <Route exact path="/" component={Dashboard} />
        <Route path="/folder/:folderId" component={Dashboard} />

        {/* Auth */}
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
