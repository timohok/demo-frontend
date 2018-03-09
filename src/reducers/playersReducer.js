import {
    FETCH_PLAYERS_BEGIN,
    FETCH_PLAYERS_SUCCESS,
    FETCH_PLAYERS_FAILURE
} from '../actions/index';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export const players = (state = initialState, action) => {
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
