/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';
import api from '../../services/api';

export default class Main extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false,
    };

    // carregar os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');
        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    // salvar os dados do localStorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        try {
            this.setState({ loading: true, error: false });
            const { newRepo, repositories } = this.state;

            repositories.forEach(repository => {
                if (repository.name === newRepo) {
                    throw new Error('Repo duplicado');
                }
            });

            const response = await api.get(`/repos/${newRepo}`);
            const data = {
                name: response.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
            });
        } catch (err) {
            this.setState({
                error: true,
                newRepo: '',
                loading: false,
            });
        }
    };

    render() {
        const { newRepo, loading, repositories, error } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit} error={error}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
