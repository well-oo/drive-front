import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../_components/PrivateRoute';
import { PageAccueil } from '../PageAccueil';
import { PageConnexion } from '../PageConnexion';
import { Navigationbar } from '../_components/Navbar';
import { PageInscription } from "../PageInscription";
import {PageEspaceMembre} from "../PageEspaceMembre";
import {Cart} from "../Cart";
import {Orders} from "../Order";
import {ToastContainer} from "react-toastify";

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = { isConnected : JSON.parse(localStorage.getItem('user'))};
        this.toggleConnected = this.toggleConnected.bind(this)
    }

    render() {
        return (
            <div>
                <Navigationbar isConnected={this.state.isConnected} toggleConnected={this.toggleConnected}/>
                <div className="container-fluid">
                    <div className="col-sm-12 col-sm-offset-2">
                        <ToastContainer />
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" isConnected={this.state.isConnected} toggleConnected={this.toggleConnected} component={PageAccueil} />
                                <Route path="/connexion" render={ props => <PageConnexion {...props} toggleConnected={this.toggleConnected} isConnected={this.state.isConnected}/>} />
                                <Route path="/inscription" component={PageInscription}/>
                                <PrivateRoute path="/orders"  toggleConnected={this.toggleConnected} isConnected={this.state.isConnected} component={Orders} />
                                <PrivateRoute path="/espaceMembre"  toggleConnected={this.toggleConnected} isConnected={this.state.isConnected} component={PageEspaceMembre} />
                                <PrivateRoute path="/cart"  toggleConnected={this.toggleConnected} isConnected={this.state.isConnected} component={Cart} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
    toggleConnected = (state) =>{
        this.setState({isConnected: state});
        localStorage.setItem('user', JSON.stringify(state));
    }
}

export { App }; 