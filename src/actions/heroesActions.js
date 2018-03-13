// @flow
export const FETCH_HEROES_BEGIN   = 'FETCH_HEROES_BEGIN';
export const FETCH_HEROES_SUCCESS = 'FETCH_HEROES_SUCCESS';
export const FETCH_HEROES_FAILURE = 'FETCH_HEROES_FAILURE';
export const CLEAR_HEROES = 'CLEAR_HEROES';

export const fetchHeroesBegin = () => ({
    type: FETCH_HEROES_BEGIN
});

export const fetchHeroesSuccess = (heroes: Heroes) => ({
    type: FETCH_HEROES_SUCCESS,
    payload: { heroes }
});

export const fetchHeroesFailure = (error: Object) => ({
    type: FETCH_HEROES_FAILURE,
    payload: { error }
});

export function clearHeroes() {
    return { type: CLEAR_HEROES }
}

export function fetchHeroes(playerId: string) {
    return (dispatch: Function) => {
        dispatch(fetchHeroesBegin());
        return fetch(`/demo/api/players/${playerId}/heroes`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchHeroesSuccess(json.data));
                return json.data;
            })
            .catch(error => dispatch(fetchHeroesFailure(error)));
    };
}

function handleErrors(response: Object) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}