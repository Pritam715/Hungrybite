import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../../Frontend/components/partials/Header';
import Footer from '../../Frontend/components/partials/Footer';
import HomePage from '../../Frontend/components/HomePage';



export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>

                    <div className="wrapper">
                        <Header />
                        {/* <HomePage /> */}
                        <Footer />

                    </div>


                </Switch>



            </Router>


        );
    }
}
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}