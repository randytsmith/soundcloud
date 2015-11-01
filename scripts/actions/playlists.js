import fetch from 'isomorphic-fetch';
import {arrayOf, normalize} from 'normalizr';
import * as types from '../constants/ActionTypes';
import {songSchema} from '../constants/Schemas';
import {constructUrl} from '../utils/SongUtils';

export function fetchSongs(url, playlist) {
    return (dispatch, getState) => {
        const {auth} = getState();
        dispatch(requestSongs(playlist));
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                const songs = json.collection
                    .map(song => song.origin ? song.origin : song)
                    .filter(song => song.streamable && song.duration < 600000 );
                const nextUrl = json.next_href + ( auth.accessToken ? `&oauth_token=${auth.accessToken}` : '');
                const normalized = normalize(songs, arrayOf(songSchema));
                dispatch(receiveSongs(normalized.entities, normalized.result, nextUrl, playlist));
            })
            .catch(error => {throw error});
    };
}

export function fetchSongsIfNeeded(playlist) {
    return (dispatch, getState) => {
        const {playlists, songs} = getState();
        if (shouldFetchSongs(playlists, playlist)) {
            const nextUrl = getNextUrl(playlists, playlist);
            return dispatch(fetchSongs(nextUrl, playlist));
        }
    }
}

function getNextUrl(playlists, playlist) {
    const activePlaylist = playlists[playlist];
    if (!activePlaylist || activePlaylist.nextUrl === false) {
        return constructUrl(playlist);
    }
    return activePlaylist.nextUrl;
}

function receiveSongs(entities, songs, nextUrl, playlist) {
    return {
        type: types.RECEIVE_SONGS,
        entities,
        nextUrl,
        playlist,
        songs
    };
}

function requestSongs(playlist) {
    return {
        type: types.REQUEST_SONGS,
        playlist: playlist
    };
}

function shouldFetchSongs(playlists, playlist) {
    const activePlaylist = playlists[playlist];
    if (!activePlaylist || !activePlaylist.isFetching && (activePlaylist.nextUrl !== null)) {
        return true;
    }

    return false;
}
