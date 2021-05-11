
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../../Backend/components/partials/Header';
import Sidebar from '../../Backend/components/partials/Sidebar';
import Footer from '../../Backend/components/partials/Footer';
import Login from '../../Backend/components/pages/auth/Login';
// import NotFound from '../../Backend/components/pages/notfound/NotFound';


// import Dashboard from '../../Backend/components/pages/Dashboard';
import { isAuthenticated } from '../../Backend/components/config/auth';
export const ROOT_URL = '/hungrybite'

function App() {



    return (
        <Router>

            <Switch>


                <Route exact path="/admin/login" component={Login}></Route>


                <div className="wrapper">
                    <Header />
                    <Sidebar />
                    {/* <Footer /> */}

                </div>

                {/* <Route component={NotFound} /> */}






            </Switch >






        </Router >



    );
}
export default App;
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}