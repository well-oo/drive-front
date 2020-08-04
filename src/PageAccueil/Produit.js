import React from 'react';
import {cartService} from "../_services";
import { toast } from 'react-toastify';
import {format_price} from '../index';


class Produit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {quantity : 1};
        this.handleChange = this.handleChange.bind(this);
        this.increaseQuantity = this.increaseQuantity.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
        this.addCart = this.addCart.bind(this);
    }


    handleChange(e){
        if(e.target.value > 0){
            this.setState({quantity : e.target.value});
        }
    }

    increaseQuantity(){
            this.setState({quantity : this.state.quantity + 1});
    }

   decreaseQuantity(){
        if(this.state.quantity > 1) {
            this.setState({quantity: this.state.quantity - 1});
        }
    }

    addCart(){
        cartService.addArticlesToCart(this.props.user.activeCart,this.props.produit,this.state.quantity)
            .then( cart => {
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
                }
            );
    }

    handleChange(e){
        let quantity = parseInt(e.target.value)
        if(quantity> 0){
            this.setState({quantity});
        }
    }

    render() {
        const produit = this.props.produit;
        return(
            <div className="vignette">
                <p><img src={produit.img} alt={produit.name} width="300px" height="300"/></p>
                <p>{produit.name}</p>
                <p>{format_price(produit.price)}</p>
                <p>Qté disponible : {produit.stock}</p>
                <input type="button" onClick={this.addCart}  value="AJouter au panier"/>
                <input type="button" onClick={this.decreaseQuantity}  value="-"/>
                <input className="vignette-number" type="number" value={this.state.quantity} onChange={ this.handleChange} />
                <input type="button" onClick={this.increaseQuantity}  value="+"/>
            </div>)
    }
}

export default Produit;