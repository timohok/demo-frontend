import {
    FETCH_HEROES_BEGIN,
    FETCH_HEROES_SUCCESS,
    FETCH_HEROES_FAILURE
} from '../actions/index';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export const heroes = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_HEROES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_HEROES_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.heroes
            };

        case FETCH_HEROES_FAILURE:
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
