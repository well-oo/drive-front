import React from 'react';
import {cartService} from '../_services'
import {toast} from "react-toastify";
import {format_price} from '../index';

class CartArticle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.quantite
        }
        this.removeArticle = this.removeArticle.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }

    removeArticle = () => {
        cartService.removeArticleFromCartByArticleCartId(this.props.user.activeCart,this.props.id)
            .then(cart =>{
                this.props.user.activeCart = cart;
                this.props.toggleConnected(this.props.user);
                toast.success("🚀 Panier mis à jour !",
                    {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false
                    }
                );
            })
    }

    updateCart = (e) => {
        if(e.target.value > 0){
            this.setState({quantity : e.target.value}, () =>
                cartService.updateCart(this.props.user.activeCart,this.props.article, this.state.quantity)
                .then(cart =>{
                    this.props.user.activeCart = cart;
                    this.props.toggleConnected(this.props.user);
                    toast.success("🚀 Panier mis à jour !",
                        {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false
                        }
                    );
                }));
        }
    }

    render() {
        const article = this.props.article;
        return(
            <div className="card">
                <div className="card-header">
                    {article.name} - {article.ean13}
                </div>
                <div className="card-body">
                    <img width="128px" height="128px" src={article.img} alt={article.name} />
                    Quantité:
                    <input type="number" onChange={this.updateCart} value={this.state.quantity}/>
                    <p className="card-text">Prix: {format_price(article.price)}</p>
                    <a onClick={this.removeArticle} className="del-link">Supprimer</a>
                </div>
            </div>)
    }
}

export default CartArticle;