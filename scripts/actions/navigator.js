import React, {Component, PropTypes} from 'react';
import {changeActiveSong} from '../actions/songs';
import * as types from '../constants/ActionTypes';

function changePath(path) {
    return {
        type: types.CHANGE_PATH,
        path: path
    };
}

export function navigateBack(e) {
    return dispatch => {
        if (e.state) {
            return dispatch(changePath(e.state.path));
        }
    }
}

export function navigateTo(path) {
    return dispatch => {
        if (path[0] === 'songs' && path.length === 2) {
            dispatch(changeActiveSong(path[1]));
        }

        pushState(path);
        return dispatch(changePath(path))
    }
}

function pushState(path) {
    history.pushState({path: path}, '', '#/' + path.join('/'));
}
