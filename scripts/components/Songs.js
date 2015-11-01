import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {fetchSongsIfNeeded} from '../actions/playlists';

import InfiniteScrollify from '../components/InfiniteScrollify';
import SongsCards from '../components/SongsCards';
import Stickify from '../components/Stickify';
import Toolbar from '../components/Toolbar';

class Songs extends Component {
    componentWillMount() {
        const {dispatch, playlist, playlists} = this.props;
        if (!(playlist in playlists) || playlists[playlist].items.length === 0) {
            dispatch(fetchSongsIfNeeded(playlist));
        }
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, playlist, playlists} = this.props;
        if (playlist !== nextProps.playlist) {
            if (!(nextProps.playlist in playlists) || playlists[nextProps.playlist].items.length === 0) {
                dispatch(fetchSongsIfNeeded(nextProps.playlist));
            }
        }
    }

    render() {
        const {dispatch, playingSongId, playlist, playlists, sticky, songs, time, users} = this.props;

        return (
            <div className={'songs' + (sticky ? ' sticky' : '')}>
                <Toolbar dispatch={dispatch} playlist={playlist} sticky={sticky} time={time} />
                <div className='container'>
                    <SongsCards
                        dispatch={dispatch}
                        playingSongId={playingSongId}
                        playlist={playlist}
                        playlists={playlists}
                        scrollFunc={fetchSongsIfNeeded.bind(null, playlist)}
                        songs={songs}
                        users={users} />
                </div>
            </div>
        );
    }
}

Songs.propTypes = {
    playlists: PropTypes.object.isRequired,
};

export default Stickify(Songs, 50);
