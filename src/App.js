import React, {Component} from 'react';
import {fetchHeroes, fetchPlayers, fetchTeams} from "./actions";
import {Col, Grid, ListGroup, ListGroupItem, PageHeader, Panel, Row, Alert} from 'react-bootstrap';
import {connect} from "react-redux";
import './App.css';


class App extends Component {

    componentDidMount() {
        this.fetchTeams();
    }

    fetchTeams() {
        this.props.dispatch(fetchTeams());
    }

    fetchPlayers(teamId) {
        this.props.dispatch(fetchPlayers(teamId));
        this.props.dispatch(fetchHeroes());
    }

    fetchHeroes(playerId) {
        this.props.dispatch(fetchHeroes(playerId));
    }

    render() {
        const {error, loadingTeams, loadingPlayers, loadingHeroes, teams, players, heroes} = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        return (
            [
                <Grid>
                    <Row className="show-grid">
                        <Col xs={18} md={12}>
                            <PageHeader>Dota 2 stats</PageHeader>
                        </Col>
                    </Row>
                </Grid>,
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                            <Panel>
                                <Panel.Heading><h3>Teams</h3></Panel.Heading>
                                <Panel.Body>
                                    {loadingTeams &&
                                    <Alert bsStyle="info">
                                        <strong>Loading teams...</strong>
                                    </Alert>
                                    }
                                    <ListGroup>
                                        {teams && teams.map(team =>
                                            <ListGroupItem><a onClick={() => this.fetchPlayers(team.id)}
                                                              key={team.id}>{team.attributes.name}</a></ListGroupItem>
                                        )}
                                    </ListGroup>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col xs={6} md={4}>
                            <Panel>
                                <Panel.Heading><h3>Players</h3></Panel.Heading>
                                <Panel.Body>
                                    {loadingPlayers &&
                                    <Alert bsStyle="info">
                                        <strong>Loading players...</strong>
                                    </Alert>
                                    }
                                    {!loadingPlayers &&
                                    <ListGroup>
                                        {players && players.map(player =>
                                            <ListGroupItem><a
                                                onClick={() => this.fetchHeroes(player.id)}>{player.attributes.name}</a>
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                    }
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col xs={6} md={4}>
                            <Panel>
                                <Panel.Heading><h3>Heroes</h3></Panel.Heading>
                                <Panel.Body>
                                    {!loadingPlayers && loadingHeroes &&
                                    <Alert bsStyle="info">
                                        <strong>Loading heroes...</strong>
                                    </Alert>
                                    }
                                    {!loadingHeroes &&
                                    <ListGroupItem>
                                        {heroes && heroes.map(hero =>
                                            <li>{hero.id}</li>
                                        )}
                                    </ListGroupItem>
                                    }
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            ]
        );
    }
}

const mapStateToProps = state => ({
    teams: state.teams.items,
    players: state.players.items,
    heroes: state.heroes.items,
    loadingTeams: state.teams.loading,
    loadingPlayers: state.players.loading,
    loadingHeroes: state.heroes.loading,
    error: state.teams.error
});

export default connect(mapStateToProps)(App);
