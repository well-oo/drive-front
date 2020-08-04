import React , { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import {categoryService} from "../_services/category.service";
import {produitService} from "../_services/produit.service";

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            options: [],
            categories: []
        };

        categoryService.getAllCategories().then(categories =>
                {
                    let options = categories.map( category => ({ value: category.id, label: category.name }))
                    this.setState({categories : options});
                }
        )

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(options){
        this.setState({
            options: options
        }, () => {
                let res = this.state.options.map(option => option.value);
                (res.length !== 0 ) ?
                    produitService.getAllProduitsByCategoriesId(res).then(produits => this.props.toggleProduct(produits))
                    :
                    produitService.getAllProduits().then(produits => this.props.toggleProduct(produits));
            }
        );
    }

    render() {

        return (
            <div className="container">
            <div className="search-bar">
                <h2>Filtrez par catégories:</h2>
                <Select
                    components={makeAnimated()}
                    isMulti
                    options={this.state.categories}
                    onChange={this.handleChange}
                    placeholder="Choisir une catégorie"
                />
            </div>
            </div>
        );
    }

}

export default SearchBar;