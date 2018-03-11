// @flow

declare type Teams = {
    items: Array<Team>,
    loading: Boolean
}

declare type Team = {
    id: string,
    type: string,
    attributes: {
        name: string,
        tag: string,
        rating: string,
        wins: number,
        losses: number
    }
}

declare type Players = {
    items: Array<Player>,
    loading: Boolean
}

declare type Player = {
    id: string,
    type: string,
    attributes: {
        name: String,
        details: {
            solo_competitive_rank: number
        }
    }
}

declare type Heroes = {
    items: Array<Hero>,
    loading: Boolean
}

declare type Hero = {
    id: string,
    type: string,
    attributes: {
        localized_name: string,
        roles: Array<string>,
        heroDetails: {
            games: number,
            win: number
        }
    }
}
