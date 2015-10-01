import React, {Component, PropTypes} from 'react';
import {changeActivePlaylist} from '../actions/songs';
import {GENRES} from '../constants/Genres';

class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    changeActivePlaylist(playlist) {
        const {activePlaylist, dispatch} = this.props;
        if (activePlaylist === playlist) {
            return;
        }

        dispatch(changeActivePlaylist(playlist));
    }

    renderGenres() {
        const {activePlaylist} = this.props;

        return GENRES.map(genre => {
            return (
                <div
                    className={'toolbar-item toolbar-genre' + (activePlaylist === genre ? ' active' : '')}
                    key={genre}
                    onClick={this.changeActivePlaylist.bind(this, genre)}>
                    {genre}
                </div>
            );
        });
    }

    render() {
        return (
            <div className='toolbar'>
                <div className='container'>
                    <div className='toolbar-items'>
                        {this.renderGenres()}
                        <div className='toolbar-item toolbar-search'>
                            <input placeholder='SEARCH' type='text' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;
