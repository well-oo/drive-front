import React from 'react';
import CartArticle from './CartArticle';
import {format_price} from '../index';
import {orderService} from '../_services';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    command = () => {
        orderService.create(this.props.isConnected, this.props.isConnected.activeCart.articlesCart)
            .then(
                user => {
                    this.props.history.push("/orders");
                    this.props.toggleConnected(user);
                    },
                error => this.setState({ error})
                );
    }

    render() {
        const cart = this.props.isConnected.activeCart.articlesCart;
        const total = format_price(cart.map(article => article.article.price * article.quantite).reduce((a,b)=> a + b, 0));
        const error = this.state.error;
        return(
            <div>
                <h2>Panier</h2>
                {(cart.length === 0) ?
                    <div>Il n'y a pas de produit dans votre panier actuellement ! </div>
                    : <div className="container">
                        {cart.map(article => <CartArticle toggleConnected={this.props.toggleConnected} user={this.props.isConnected} id={article.id} key={article.id} article={article.article} quantite={article.quantite} />)}
                        <p>Sous-total({cart.map(article => article.quantite).reduce((a,b)=> a + b, 0)} articles)
                            : {total} </p>
                        {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                        }
                        <input type="button" onClick={this.command} value="Commander" />
                    </div>
                }
            </div>)
    }
}

export { Cart };