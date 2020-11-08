import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Join from './component/Join/Join.js';
import Chat from './component/Chat/Chat.js';
// <Route path="/chat" exact component={Chat} />


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Join} />
                <Route path="/chat" exact component={Chat} />
            </Switch>
        </Router>
    );
}

export default App;