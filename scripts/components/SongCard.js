import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import SongDetails from '../components/SongDetails';
import SongHeart from '../components/SongHeart';
import {IMAGE_SIZES} from '../constants/SongConstants';
import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer';
import {formatSongTitle} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';

class SongCard extends Component {
    renderTogglePlayButton() {
        const {isActive, playSong} = this.props;

        if (isActive) {
            return <TogglePlayButtonContainer />;
        }

        return (
            <div className='toggle-play-button' onClick={playSong}>
                <i className='toggle-play-button-icon ion-ios-play'></i>
            </div>
        );
    }
    render() {
        const {authed, dispatch, isActive, playSong, song, user} = this.props;
        const isLiked = song.id in authed.likes && authed.likes[song.id] == 1;
        const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);

        return (
            <div className={'card song-card' + (isActive ? ' active' : '')}>
                <div className='song-card-image' style={{backgroundImage: `url(${image})`}}>
                    {this.renderTogglePlayButton()}
                </div>
                <div className='song-card-user clearfix'>
                    <img
                        className='song-card-user-image'
                        src={getImageUrl(user.avatar_url)} />
                    <div className='song-card-details'>
                        <Link
                            className='song-card-title'
                            dispatch={dispatch}
                            route={{path: ['songs', song.id]}}>
                            {formatSongTitle(song.title)}
                        </Link>
                        <Link
                            className='song-card-user-username'
                            dispatch={dispatch}
                            route={{path: ['users', user.id]}}>
                            {user.username}
                        </Link>
                        <SongHeart
                            authed={authed}
                            className='song-card-heart'
                            dispatch={dispatch}
                            isLiked={isLiked}
                            songId={song.id} />
                    </div>
                </div>
            </div>
        );
    }
}

SongCard.propTypes = {
    isActive: PropTypes.bool.isRequired,
    playSong: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
};

export default SongCard;
