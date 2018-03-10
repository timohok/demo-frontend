// @flow
import React, {Component} from 'react';
import {fetchHeroes, fetchPlayers, fetchTeams} from "./actions";
import {Col, Grid, ListGroup, ListGroupItem, OverlayTrigger, PageHeader, Panel, Popover, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {CircleLoader} from 'react-spinners';
import './App.css';

class App extends Component {

    componentDidMount() {
        this.fetchTeams();
    }

    fetchTeams() {
        this.props.dispatch(fetchTeams());
    }

    fetchPlayers(teamId: string) {
        this.props.dispatch(fetchPlayers(teamId));
        this.props.dispatch(fetchHeroes());
    }

    fetchHeroes(playerId: string) {
        this.props.dispatch(fetchHeroes(playerId));
    }

    renderTeamPopover(team: Object) {
        return (<Popover id="popover-trigger-hover" title="Team details">
            <strong>Tag</strong>: {team.attributes.tag}<br/>
            <strong>Rating</strong>: {team.attributes.rating}<br/>
            <strong>Wins</strong>: {team.attributes.wins}<br/>
            <strong>Losses</strong>: {team.attributes.losses}
        </Popover>);
    }

    renderPlayerPopover(player: Object) {
        return (<Popover id="popover-trigger-hover" title="Player details">
            <strong>MMR</strong>: {player.attributes.details["solo_competitive_rank"]}<br/>
        </Popover>);
    }

    renderHeroPopover(hero: Object) {
        return (<Popover id="popover-trigger-hover" title="Hero details">
            <strong>Roles</strong>: {hero.attributes.roles}<br/>
            <strong>Games</strong>: {hero.attributes.heroDetails.games}<br/>
            <strong>Wins</strong>: {hero.attributes.heroDetails.win}<br/>
        </Popover>);
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
                                        <div className="spinner">
                                            <CircleLoader color={'#123abc'} loading={loadingTeams}/>
                                        </div>
                                    }
                                    <ListGroup>
                                        {teams && teams.map(team =>
                                            <ListGroupItem>
                                                <OverlayTrigger trigger="hover" placement="right"
                                                                overlay={this.renderTeamPopover(team)}>
                                                    <a onClick={() => this.fetchPlayers(team.id)}
                                                       key={team.id}>{team.attributes.name}</a>
                                                </OverlayTrigger>
                                            </ListGroupItem>
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
                                    <div className="spinner">
                                        <CircleLoader color={'#123abc'} loading={loadingPlayers}/>
                                    </div>
                                    }
                                    {!loadingPlayers &&
                                    <ListGroup>
                                        {players && players.map(player =>
                                            <ListGroupItem>
                                                <OverlayTrigger trigger="hover" placement="right"
                                                                overlay={this.renderPlayerPopover(player)}>
                                                    <a onClick={() => this.fetchHeroes(player.id)}>{player.attributes.name}</a>
                                                </OverlayTrigger>
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
                                    <div className="spinner">
                                        <CircleLoader color={'#123abc'} loading={loadingHeroes}/>
                                    </div>
                                    }
                                    {!loadingHeroes &&
                                    <ListGroup>
                                        {heroes && heroes.map(hero =>
                                            <ListGroupItem>
                                                <OverlayTrigger trigger="hover" placement="right"
                                                                overlay={this.renderHeroPopover(hero)}>
                                                    <a>{hero.attributes["localized_name"]}</a>
                                                </OverlayTrigger>
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
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

type Props = {
    teams?: Array<Object>,
    players?: Array<Object>,
    heroes?: Array<Object>,
    loadingTeams?: boolean,
    loadingPlayers?: boolean,
    loadingHeroes?: boolean,
    error?: string
};

const mapStateToProps = (state: Props) => ({
    teams: state.teams.items,
    players: state.players.items,
    heroes: state.heroes.items,
    loadingTeams: state.teams.loading,
    loadingPlayers: state.players.loading,
    loadingHeroes: state.heroes.loading,
    error: state.teams.error
});

export default connect(mapStateToProps)(App);
