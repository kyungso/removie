import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, withRouter } from 'react-router-dom';

import styles from './AccountPresenter.scss';
import classNames from 'classnames/bind';

import Overview from 'components/account/Overview';
import Favorites from 'components/account/Favorites';
import Rating from 'components/account/Rating';

const cx = classNames.bind(styles);

const AccountPresenter = withRouter(({ location: { pathname }, accountDetail, favoriteMovies }) => (
<>
    <Helmet>
         <title>{accountDetail.username} | REMOVIE</title>
    </Helmet>
   <div className={cx('account-container')}>
        <div className={cx('account-header')}> 
            <div className={cx('account-content')}>
                <Link to="/account" className={cx('account-avartar')}>K</Link>
                <div className={cx('account-about')}>
                    <div className={cx('account-name')}>{accountDetail.username}</div>
                    <div className={cx('account-year')}>Member since August 2019</div>
                </div>
            </div>
        </div>

        <div className={cx('account-tab')}>
            <ul className={cx('tab-menu')} >
                <li className={cx('tab-menu-items')}
                    style={{ borderBottom: (pathname === "/account" ? `3px solid #ce3462` : `3px solid transparent`) }}
                >
                    <Link to="/account" className={cx('link')}
                        style={{ color: (pathname === "/account" ? `#ffffff` : `#AAAAAA`) }}
                    >Overview</Link>
                </li>
                <li className={cx('tab-menu-items')}
                    style={{ borderBottom: (pathname === "/account/favorites" ? `3px solid #ce3462` : `3px solid transparent`) }}
                >
                    <Link to="/account/favorites" className={cx('link')}
                        style={{ color: (pathname === "/account/favorites" ? `#ffffff` : `#AAAAAA`) }}
                    >Favorites</Link>
                </li>
                <li className={cx('tab-menu-items')}
                    style={{ borderBottom: (pathname === "/account/rating" ? `3px solid #ce3462` : `3px solid transparent`) }}
                >
                    <Link to="/account/rating" className={cx('link')}
                        style={{ color: (pathname === "/account/rating" ? `#ffffff` : `#AAAAAA`) }}
                    >Rating</Link>
                </li>
            </ul>
        </div>

        <div className={cx('account-tab-data')}>
        {pathname === "/account" && <Overview /> }
        {pathname === "/account/favorites" && <Favorites favoriteMovies={favoriteMovies} /> }
        {pathname === "/account/rating" && <Rating /> }
        </div>
    </div>
</>
));

AccountPresenter.propTypes = {
    accountDetail: PropTypes.object,
    favoriteMovies: PropTypes.array,
    loading: PropTypes.bool,
};

export default AccountPresenter;