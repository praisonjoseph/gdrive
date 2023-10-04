import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"


function App() {
  return (
        <Router>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/folder/:folderId" component={Dashboard} />
        </Router>
  )
}

export default App
