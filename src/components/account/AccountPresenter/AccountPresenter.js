import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, withRouter } from 'react-router-dom';

import styles from './AccountPresenter.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Overview from 'components/account/Overview';
import Favorites from 'components/account/Favorites';
import Rating from 'components/account/Rating';

const cx = classNames.bind(styles);

const AccountPresenter = withRouter(({ location: { pathname }, accountDetail, favoriteMovies, favoriteTV, ratedMovies, ratedTV, genreList, loading, handleFavoriteBtn, handleClearRating, handleRating }) => {
    const checkOverview = pathname === "/account";
    const checkFavorite = pathname === "/account/favorite" || pathname === "/account/favorite/tv";
    const checkRating = pathname === "/account/rating" || pathname === "/account/rating/tv";

    return (
    <>
    {loading 
        ? <Loader />
        : accountDetail && favoriteMovies && favoriteTV && ratedMovies && ratedTV && genreList &&
        (<div className={cx('account-container')}>
            <Helmet>
                <title>{accountDetail.username} | REMOVIE</title>
            </Helmet>
            <div className={cx('account-header')}> 
                <div className={cx('account-content')}>
                    <Link to="/account" className={cx('account-avartar')}>{accountDetail.username.substring(0,1).toUpperCase()}</Link>
                    <div className={cx('account-about')}>
                        <div className={cx('account-name')}>{accountDetail.username}</div>
                        <div className={cx('account-year')}>Member since November 2019</div>
                    </div>
                </div>
            </div>

            <div className={cx('account-tab')}>
                <ul className={cx('tab-menu')} >
                    <li className={cx('tab-menu-items')}
                        style={{ borderBottom: checkOverview ? `3px solid #ce3462` : `3px solid transparent` }}
                    >
                        <Link to="/account" className={cx(['link', checkOverview ? "" : "notActiveLink"])}
                        >Overview</Link>
                    </li>
                    <li className={cx('tab-menu-items')}
                        style={{ borderBottom: checkFavorite ? `3px solid #ce3462` : `3px solid transparent` }}
                    >
                        <Link to="/account/favorite" className={cx(['link', checkFavorite ? "" : "notActiveLink"])}
                        >Favorites</Link>
                    </li>
                    <li className={cx('tab-menu-items')}
                        style={{ borderBottom: checkRating ? `3px solid #ce3462` : `3px solid transparent` }}
                    >
                        <Link to="/account/rating" className={cx(['link', checkRating ? "" : "notActiveLink"])}
                        >Ratings</Link>
                    </li>
                </ul>
            </div>

            <div className={cx('account-tab-data')}>
            {checkOverview 
            && <Overview favoriteMovies={favoriteMovies} 
                         favoriteTV={favoriteTV} 
                         ratedMovies={ratedMovies} 
                         ratedTV={ratedTV} 
                         genreList={genreList} /> 
            }
            {checkFavorite
            && <Favorites favoriteMovies={favoriteMovies} 
                          favoriteTV={favoriteTV} 
                          handleFavoriteBtn={handleFavoriteBtn} /> 
            }
            {checkRating
            && <Rating ratedMovies={ratedMovies} 
                       ratedTV={ratedTV} 
                       handleClearRating={handleClearRating} 
                       handleRating={handleRating} /> 
            }
            </div>
        </div>
        )
    }
    </>
    );}
);

AccountPresenter.propTypes = {
    accountDetail: PropTypes.object,
    favoriteMovies: PropTypes.array,
    favoriteTV: PropTypes.array,
    ratedMovies: PropTypes.array, 
    ratedTV: PropTypes.array,
    genreList: PropTypes.array,
    handleFavoriteBtn: PropTypes.func,
    handleClearRating: PropTypes.func,
    handleRating: PropTypes.func,
};

export default AccountPresenter;