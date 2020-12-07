import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import EditArticleView from './pages/EditArticleView'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/articles/:id" render={(props) => <EditArticleView {...props} />} />
            </Switch>
        </Router>
    )
}

export default App
