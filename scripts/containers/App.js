import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {changeHeight} from '../actions/height';
import {navigateBack, navigateTo} from '../actions/navigator';
import {changeActivePlaylist, fetchSongsIfNeeded} from '../actions/playlists';

import Header from '../components/Header';
import Player from '../components/Player';
import Song from '../components/Song';
import Songs from '../components/Songs';
import User from '../components/User';

function initHeight(dispatch) {
    dispatch(changeHeight(window.innerHeight));
    window.onresize = () => {
        dispatch(changeHeight(window.innerHeight));
    }
}

function initNavigator(dispatch) {
    window.onpopstate = e => {
        dispatch(navigateBack(e));
    };
    const path = window.location.hash === '' ? ['songs'] : window.location.hash.replace('#/', '').split('/');
    dispatch(navigateTo(path));
}

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        initHeight(dispatch);
        initNavigator(dispatch);
        dispatch(changeActivePlaylist('house'));
    }

    renderContent() {
        const {activePlaylist, dispatch, height, navigator, player, playingSongId, playlists, songs, users} = this.props;
        const {path} = navigator;
        if (path[0] === 'songs' && path.length === 1) {
            return (
                <Songs
                    {...this.props}
                    scrollFunc={fetchSongsIfNeeded.bind(null, activePlaylist)} />
            );
        } else if (path[0] === 'songs' && path.length === 2) {
            return (
                <Song
                    dispatch={dispatch}
                    height={height}
                    player={player}
                    playingSongId={playingSongId}
                    playlists={playlists}
                    songId={parseInt(path[1])}
                    songs={songs}
                    users={users} />
            );
        } else if (path[0] === 'users' && path.length === 2) {
            return (
                <User
                    dispatch={dispatch}
                    height={height}
                    player={player}
                    playingSongId={playingSongId}
                    playlists={playlists}
                    songs={songs}
                    userId={parseInt(path[1])}
                    users={users} />
            );
        }
    }

    renderPlayer() {
        const {dispatch, player, playingSongId, playlists, songs, users} = this.props;
        if (playingSongId === null) {
            return;
        }

        return (
            <Player
                dispatch={dispatch}
                player={player}
                playingSongId={playingSongId}
                playlists={playlists}
                songs={songs}
                users={users} />
        );
    }

    render() {
        const {dispatch, playingSongId} = this.props;

        return (
            <div>
                <Header dispatch={dispatch} />
                {this.renderContent()}
                {this.renderPlayer()}
            </div>
        );
    }
}

App.propTypes = {
    activePlaylist: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    playingSongId: PropTypes.number,
    playlists: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {activePlaylist, entities, height, navigator, player, playlists} = state;
    const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null;

    return {
        activePlaylist,
        height,
        navigator,
        player,
        playingSongId,
        playlists,
        songs: entities.songs,
        users: entities.users
    };
}


export default connect(mapStateToProps)(App);
