import { combineReducers } from 'redux'
import { teams } from './teamsReducer';
import { players } from './playersReducer';
import { heroes } from './heroesReducer';

const rootReducer = combineReducers({
    teams, players, heroes
});

export default rootReducer;