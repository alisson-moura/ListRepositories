/* eslint-disable react/static-property-placement */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import api from '../../services/api';
import {
    Loading,
    Owner,
    IssueList,
    Filter,
    SubmitButton,
    Pages,
} from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
        filter: 'open',
        repoName: '',
        page: 1,
    };

    async componentDidMount() {
        const { match } = this.props;
        const repoName = decodeURIComponent(match.params.repository);
        const { filter } = this.state;
        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: filter,
                    per_page: 5,
                },
            }),
        ]);

        this.setState({
            repoName,
            repository: repository.data,
            issues: issues.data,
            loading: false,
        });
    }

    handleChange = async e => {
        this.setState({ filter: e.target.value });
    };

    loadIssues = async () => {
        const { filter, repoName, page } = this.state;
        const issues = await api.get(`/repos/${repoName}/issues`, {
            params: {
                state: filter,
                per_page: 5,
                page,
            },
        });
        this.setState({
            issues: issues.data,
        });
    };

    handleClickFilter = e => {
        e.preventDefault();
        this.loadIssues();
    };

    handleNextPage = async e => {
        e.preventDefault();
        const { page } = this.state;
        await this.setState({ page: page + 1 });
        this.loadIssues();
    };

    handlePrevPage = async e => {
        e.preventDefault();
        const { page } = this.state;
        await this.setState({ page: page - 1 });
        this.loadIssues();
    };

    render() {
        const { repository, issues, loading, filter, page } = this.state;
        if (loading) {
            return <Loading>Carregando</Loading>;
        }
        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssueList>
                    <Filter onSubmit={this.handleClickFilter}>
                        <select value={filter} onChange={this.handleChange}>
                            <option value="all">All</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                        <SubmitButton>
                            <FaSearch type="submit" color="#FFF" size={16} />
                        </SubmitButton>
                    </Filter>

                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
                <Pages>
                    <button
                        id="prev"
                        type="button"
                        onClick={this.handlePrevPage}
                    >
                        <FaChevronLeft />
                    </button>
                    <span>{page}</span>
                    <button
                        id="next"
                        type="button"
                        onClick={this.handleNextPage}
                    >
                        <FaChevronRight />
                    </button>
                </Pages>
            </Container>
        );
    }
}
