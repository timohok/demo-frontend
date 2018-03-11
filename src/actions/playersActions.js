// @flow
export const FETCH_PLAYERS_BEGIN   = 'FETCH_PLAYERS_BEGIN';
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

export const fetchPlayersBegin = () => ({
    type: FETCH_PLAYERS_BEGIN
});

export const fetchPlayersSuccess = (players: Players) => ({
    type: FETCH_PLAYERS_SUCCESS,
    payload: { players }
});

export const fetchPlayersFailure = (error: Object) => ({
    type: FETCH_PLAYERS_FAILURE,
    payload: { error }
});

export function fetchPlayers(teamId: string) {
    return (dispatch: Function) => {
        dispatch(fetchPlayersBegin());
        return fetch(`/demo/api/teams/${teamId}/players`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchPlayersSuccess(json.data));
                return json.data;
            })
            .catch(error => dispatch(fetchPlayersFailure(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}