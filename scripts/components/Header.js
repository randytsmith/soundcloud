import React, {Component, PropTypes} from 'react';
import {loginUser} from '../actions/authed';
import HeaderSearch from '../components/HeaderSearch';
import Link from '../components/Link';
import Popover from '../components/Popover';


class Header extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        const {dispatch} = this.props;
        dispatch(loginUser());
    }

    renderHeaderUser() {
        const {authed, dispatch, navigator} = this.props;
        const {path} = navigator.route;
        const isActive = path[0] === 'me' ? true : false;
        const targetRoute = isActive ? {path: ['songs'], query: {q: 'house'}} : {path: ['me', 'stream']};

        if (authed.user) {
            return (
                <Link
                    className={'header-authed' + (isActive ? ' active' : '')}
                    dispatch={dispatch}
                    route={targetRoute}>
                    <img className='header-authed-image' src={authed.user.avatar_url} />
                </Link>
            );
        }

        return (
            <Popover className='header-user bottom-right'>
                <div className='header-user-link'>
                    <i className='icon ion-person'></i>
                    <i className='icon ion-chevron-down'></i>
                </div>
                <div className='header-user-panel popover-content'>
                    <ul className='header-user-panel-list'>
                        <li className='header-user-panel-item'>
                            <a className='button orange block' onClick={this.login}>Sign into SoundCloud</a>
                        </li>
                    </ul>
                </div>
            </Popover>
        );
    }

    render() {
        const {dispatch} = this.props;

        return (
            <div className='header'>
                <div className='container clearfix'>
                    <div className='header-logo'>
                        <i className='icon ion-radio-waves' />
                    </div>
                    <ul className='header-nav float-left'>
                        <li className='header-nav-item'>
                            <Link
                                className='header-nav-item-link active'
                                dispatch={dispatch}
                                route={{path: ['songs']}}>
                                SoundRedux
                            </Link>
                        </li>
                    </ul>
                    <ul className='header-nav float-right'>
                        <li className='header-nav-item'>
                            <HeaderSearch dispatch={dispatch} />
                        </li>
                        <li className='header-nav-item'>
                            {this.renderHeaderUser()}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

Header.propTypes = {

};

export default Header;
