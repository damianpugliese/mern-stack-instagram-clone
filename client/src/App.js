import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from './ui/layout/Header/Header';
import Main from './ui/layout/Main/Main';
import Home from './ui/components/Home/Home';
import Profile from './ui/components/Profile/Profile';
import Signin from './ui/components/Signin/Signin';
import Signup from './ui/components/Signup/Signup';
import Footer from './ui/layout/Footer/Footer';

const App = () => {
    return (
        <div className="App">
            <Router>
                <CssBaseline />
                <Header />
                <Main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/profile" component={Profile} />
                    </Switch>
                </Main>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
