export const FETCH_TEAMS_BEGIN   = 'FETCH_TEAMS_BEGIN';
export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
export const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE';

export const fetchTeamsBegin = () => ({
    type: FETCH_TEAMS_BEGIN
});

export const fetchTeamsSuccess = teams => ({
    type: FETCH_TEAMS_SUCCESS,
    payload: { teams }
});

export const fetchTeamsFailure = error => ({
    type: FETCH_TEAMS_FAILURE,
    payload: { error }
});

export function fetchTeams() {
    return dispatch => {
        dispatch(fetchTeamsBegin());
        return fetch("/demo/api/teams?page[limit]=10")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchTeamsSuccess(json.data));
                return json.data;
            })
            .catch(error => dispatch(fetchTeamsFailure(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}