import {
    FETCH_TEAMS_BEGIN,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE
} from '../actions/index';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export const teams = (state = initialState, action) => {
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
