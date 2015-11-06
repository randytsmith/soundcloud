import React, {Component, PropTypes} from 'react';
import {playSong} from '../actions/player';
import {getImageUrl} from '../utils/SongUtils';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {shownPlaylistIndex: null};
    }

    componentWillUnmount() {
        this.setState({shownPlaylistIndex : null});
    }

    changeShownPlaylistIndex(i, e) {
        e.preventDefault();
        const {player} = this.props;
        const {selectedPlaylists} = player;
        if (i < 0 || i >= selectedPlaylists.length) {
            return;
        }
        this.setState({shownPlaylistIndex: i});
    }

    handleMouseEnter() {
        document.body.style.overflow = 'hidden';
    }

    handleMouseLeave() {
        document.body.style.overflow = 'auto';
    }

    playSong(shownPlaylist, i) {
        const {dispatch, player} = this.props;
        dispatch(playSong(shownPlaylist, i));
        this.setState({shownPlaylistIndex: null});
    }

    render() {
        const {playlists, player, songs} = this.props;
        const {currentSongIndex, selectedPlaylists} = player;
        const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        const shownPlaylistIndex = this.state.shownPlaylistIndex !== null ? this.state.shownPlaylistIndex : selectedPlaylists.length - 1;
        const shownPlaylist = selectedPlaylists[shownPlaylistIndex];

        const items = playlists[shownPlaylist].items.map((songId, i) => {
            const song = songs[songId];
            return (
                <li
                    className={'playlist-song' + (currentPlaylist === shownPlaylist && i === currentSongIndex ? ' active' : '' )}
                    key={song.id + '-' + i}
                    onClick={this.playSong.bind(this, shownPlaylist, i)}>
                    <img className='playlist-song-image' src={getImageUrl(song.artwork_url)} />
                    <div className='playlist-song-title'>{song.title}</div>
                </li>
            );
        });

        return (
            <div
                className='popover-content playlist'
                onClick={e => e.stopPropagation() }
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                <div className='playlist-header'>
                    <a
                        className={'playlist-header-button' + (shownPlaylistIndex === 0 ? ' disabled' : '')}
                        href='#'
                        onClick={this.changeShownPlaylistIndex.bind(this, shownPlaylistIndex - 1)}>
                        <i className='icon ion-ios-arrow-back'></i>
                    </a>
                    <div className='playlist-header-title'>{shownPlaylist.split('|')[0]}</div>
                    <a
                        className={'playlist-header-button' + (shownPlaylistIndex === selectedPlaylists.length - 1 ? ' disabled' : '')}
                        href='#'
                        onClick={this.changeShownPlaylistIndex.bind(this, shownPlaylistIndex + 1)}>
                        <i className='icon ion-ios-arrow-forward'></i>
                    </a>
                </div>
                <div className='playlist-body'>
                    <ul className='playlist-songs'>{items}</ul>
                </div>
                <div className='playlist-footer'>{items.length + (items.length === 1 ? ' Song' : ' Songs')}</div>
            </div>
        );
    }
}

Playlist.propTypes = {
    dispatch: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    playlists: PropTypes.object.isRequired
};

export default Playlist;
