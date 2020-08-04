import React from 'react';
import SearchBar from "./SearchBar";
import Produits from "./Produits";
import {produitService} from "../_services/produit.service";
import 'react-toastify/dist/ReactToastify.css';


class PageAccueil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produits : []
        };
    }

    componentDidMount() {
        produitService.getAllProduits()
            .then(
                produits => {
                    this.setState({produits});
                },
                error => this.setState({ error, loading: false })
            );
    }


    render() {
        return(
        <div>
          <SearchBar toggleProduct={this.updateProducts}></SearchBar>
          <Produits produits={this.state.produits} user={this.props.isConnected} toggleConnected={this.props.toggleConnected}></Produits>
        </div>)
    }

    updateProducts = (state) => {
        this.setState({produits: state});
    }

}

export { PageAccueil };