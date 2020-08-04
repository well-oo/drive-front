import React from 'react';
import Article from './Article';
import {format_price} from '../index';
import moment from 'moment';

const Order = (props) =>{
    return(
        <div className="card">
            <div className="card-header">
                Commande n°{props.id} du {moment(props.createdOn).format("DD/MM/YYYY")}
            </div>
            <div className="card-body">
                {props.articles.map(article => <Article key={article.id} {...article}/>)}
                <p className="card-text">Prix: {format_price(props.amount)} - Livraison le {moment(props.deliveryDate).format("DD/MM/YYYY")} Statut de la commande: {props.currentStatus}</p>
            </div>
        </div>    )
}

export default Order;