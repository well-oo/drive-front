import React from 'react';
import Produit from './Produit';


class Produits extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return(
            <div className="container custom-container">
                {this.props.produits.map(produit => <Produit key={produit.id} produit={produit} user={this.props.user} toggleConnected={this.props.toggleConnected}></Produit>)}
            </div>)
    }
}

export default Produits;