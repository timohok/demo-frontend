// @flow

import {
    FETCH_TEAMS_BEGIN,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE
} from '../actions/index';

const initialState = {
    items: [],
    loading: false
};

type State = {
    items: Array<Team>,
    loading: boolean,
    error?: Object
};

type BeginAction = {
    type: FETCH_TEAMS_BEGIN,
    payload: {
        teams?: Array<Team>,
        error?: Object
    }
}

type SuccessAction = {
    type: FETCH_TEAMS_SUCCESS,
    payload: {
        teams?: Array<Team>,
        error?: Object
    }
};

type FailureAction = {
    type: FETCH_TEAMS_SUCCESS,
    payload: {
        teams?: Array<Team>,
        error?: Object
    }
};

type Action = BeginAction | SuccessAction | FailureAction;

export const teams = (state: State = initialState, action: Action) => {
    switch(action.type) {
        case FETCH_TEAMS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_TEAMS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.teams
            };

        case FETCH_TEAMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        default:
            return state;
    }
};
