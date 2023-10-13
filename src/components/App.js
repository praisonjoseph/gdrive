import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Dashboard from "./google-drive/Dashboard"
import Signup from "./authentication/Signup"
import { AuthProvider } from '../contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Google Drive */}
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/folder/:folderId" component={Dashboard} />

        {/* Auth */}
        <Route path="/signup" component={Signup} />
      </Router>
    </AuthProvider>
  )
}

export default App
