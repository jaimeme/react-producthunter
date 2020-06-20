import React, { Component } from 'react';
//conexão http com a api node através do axios
import api from '../../services/api';
import './styles.css';

export default class Product extends Component {
    state = {
        product: {},
    };
    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);
        //preencher o product dentro de state com a resposta da api
        this.setState({ product: response.data })
    }

    render() {
        //desestruturação para não ficar escrevendo this.state sempre que for necessário acessar o valor dentro de product
        const { product } = this.state;
        return (
            <div className="product-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <a href={product.url}>{product.url}</a>
            </div>
        );
    }
}