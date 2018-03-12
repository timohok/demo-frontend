// @flow
import {
    FETCH_PLAYERS_BEGIN,
    FETCH_PLAYERS_SUCCESS,
    FETCH_PLAYERS_FAILURE
} from '../actions/index';

const initialState = {
    items: [],
    loading: false
};

type State = {
    items: Array<Player>,
    loading: boolean,
    error?: Object
};

type BeginAction = {
    type: FETCH_PLAYERS_BEGIN,
    payload: {
        players?: Array<Player>,
        error?: Object
    }
}

type SuccessAction = {
    type: FETCH_PLAYERS_SUCCESS,
    payload: {
        players?: Array<Player>,
        error?: Object
    }
};

type FailureAction = {
    type: FETCH_PLAYERS_SUCCESS,
    payload: {
        players?: Array<Player>,
        error?: Object
    }
};

type Action = BeginAction | SuccessAction | FailureAction;

export const players = (state: State = initialState, action: Action) => {
    switch(action.type) {
        case FETCH_PLAYERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_PLAYERS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.players
            };

        case FETCH_PLAYERS_FAILURE:
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
