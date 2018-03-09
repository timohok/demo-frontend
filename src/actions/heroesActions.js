export const FETCH_HEROES_BEGIN   = 'FETCH_HEROES_BEGIN';
export const FETCH_HEROES_SUCCESS = 'FETCH_HEROES_SUCCESS';
export const FETCH_HEROES_FAILURE = 'FETCH_HEROES_FAILURE';

export const fetchHeroesBegin = () => ({
    type: FETCH_HEROES_BEGIN
});

export const fetchHeroesSuccess = heroes => ({
    type: FETCH_HEROES_SUCCESS,
    payload: { heroes }
});

export const fetchHeroesFailure = error => ({
    type: FETCH_HEROES_FAILURE,
    payload: { error }
});

export function fetchHeroes(playerId) {
    return dispatch => {
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

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}