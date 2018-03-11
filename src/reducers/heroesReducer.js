import {
    FETCH_HEROES_BEGIN,
    FETCH_HEROES_SUCCESS,
    FETCH_HEROES_FAILURE
} from '../actions/index';
import {FETCH_HEROES_BEGIN, FETCH_HEROES_SUCCESS} from "../actions";

const initialState = {
    items: [],
    loading: false
};

type State = {
    items: Array<*>,
    loading: boolean,
    error?: Object
};

type BeginAction = {
    type: FETCH_HEROES_BEGIN,
    payload: {
        heroes?: Array<Object>,
        error?: Object
    }
}

type SuccessAction = {
    type: FETCH_HEROES_SUCCESS,
    payload: {
        heroes?: Array<Object>,
        error?: Object
    }
};

type FailureAction = {
    type: FETCH_HEROES_SUCCESS,
    payload: {
        heroes?: Array<Object>,
        error?: Object
    }
};

type Action = BeginAction | SuccessAction | FailureAction;

export const heroes = (state: State = initialState, action: Action) => {
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
