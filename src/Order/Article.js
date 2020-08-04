import React from 'react';
import {format_price} from '../index';

const Article = (props) =>{
    const article = props.article;
    return(
        <div>
            <hr/>
                <img src={article.img} alt={article.name} width="96px" height="96px" />
            <p className="orders-article font-weight-bold">{article.name}</p>
            <p className="orders-article"> - {article.ean13}</p>
            <p className="orders-article"> qte: {props.quantite}</p>
            <p className="orders-article"> prix: {format_price(article.price)}</p>
            <hr/>
        </div>
    )
}

export default Article;