import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import "./styles.css";

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        //página atual da aplicação
        page: 1,
    };

    prevPage = () => {
        const { page, productInfo } = this.state;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        const { page, productInfo } = this.state;
        if (page === productInfo.pages) return;

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
        //pageNumber passará o valora para page
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        //data docs é onde está situado o array, pode-se ver utilizando o console.log(response)
        // dentro da variável docs fica todas as informações que vão para o banco e que não foram organizadas pelo o gerenciador de páginas, enquanto foi usado o restoperator "..." no productInfor para obter o resto das variáveis
        const { docs, ...productInfo } = response.data;
        //colocando o page o valor vai conseguir ser setado novamente assim tornando ele diferente de 1 de como foi posto
        this.setState({ products: docs, productInfo, page });
    };


    render() {
        //desestruturação
        const { products, page, productInfo } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acess</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>

        );
    }
}