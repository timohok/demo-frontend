import {
    FETCH_HEROES_BEGIN,
    FETCH_HEROES_SUCCESS,
    FETCH_HEROES_FAILURE,
    CLEAR_HEROES
} from '../actions/index';

const initialState = {
    items: [],
    loading: false
};

type State = {
    items: Array<Hero>,
    loading: boolean,
    error?: Object
};

type BeginAction = {
    type: FETCH_HEROES_BEGIN,
    payload: {
        heroes?: Array<Hero>,
        error?: Object
    }
}

type SuccessAction = {
    type: FETCH_HEROES_SUCCESS,
    payload: {
        heroes?: Array<Hero>,
        error?: Object
    }
};

type FailureAction = {
    type: FETCH_HEROES_SUCCESS,
    payload: {
        heroes?: Array<Hero>,
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
        case CLEAR_HEROES:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
};
