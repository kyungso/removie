import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet"; 

import styles from './DetailPresenter.scss';
import classNames from 'classnames/bind';

import DetailTab from "components/detail/DetailTab";
import DetailActionBar from "components/detail/DetailActionBar";
import DetailInActionBar from 'components/detail/DetailActionBar/DetailInActionBar';
import Video from "components/detail/Video";

const cx = classNames.bind(styles);

const DetailPresenter = ({ result, account_state, imdb_id, videos, handleFavoriteBtn, handleClearRating, handleRating }) => {
    return (
    <>
    <div className={cx('detail-container')}>
        <Helmet>
            <title>
                {result.title ? result.title : result.name}{" "}
            </title>
        </Helmet>
        <div className={cx('detail-backdrop')} 
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})` }}>
        </div>
        <div className={cx('detail-content')}>
            <div className={cx('detail-cover')} 
                 style={{ backgroundImage: (result.poster_path ? `url(https://image.tmdb.org/t/p/original${result.poster_path})` : `url(require("lib/assets/noPosterSmall.png"))`) }}>
            </div>
            <div className={cx('detail-data')}>
                <h3 className={cx('detail-title')}>
                    {result.title
                        ? result.title
                        : result.name}
                </h3>
                <div className={cx('detailItem-container')}>
                    <span className={cx('detailItem')}>
                        {result.release_date
                            ? result.release_date.substring(0,4)
                            : result.first_air_date.substring(0, 4)}
                    </span>
                    <span className={cx('detailItem-divider')}>•</span>
                    <span>
                        {result.runtime ? result.runtime : (result.runtime === 0 ? '' : result.episode_run_time[0])} min
                    </span> 
                    <span className={cx('detailItem-divider')}>•</span>
                    <span>
                        {result.genres &&
                            result.genres.map((genre, index) =>
                                index === result.genres.length - 1
                                    ? genre.name
                                    : `${genre.name} / `
                        )}
                    </span>
                    <span className={cx('detailItem-divider')}>•</span>
                    <span className={cx("imdbRatingPlugin")} data-user="ur107063764" data-title={`${imdb_id.imdb_id}`} data-style="t1">
                        <a href={`https://www.imdb.com/title/${imdb_id.imdb_id}/?ref_=plg_rt_1`}>IMDb</a>
                    </span>                
                </div>
                <div className={cx('detailItem-container')}>
                    { account_state ?
                    <DetailActionBar 
                        account_state={account_state} 
                        handleFavoriteBtn={handleFavoriteBtn} 
                        handleClearRating={handleClearRating}
                        handleRating={handleRating} 
                    />
                    : <DetailInActionBar />
                    }
                </div>
                <div className={cx('detailItem-container', 'detailTab-wrapper')}>
                    <DetailTab overview={result.overview} result={result}/>
                </div>
                <div className={cx('detailItem-container')}>
                    <Video videos={videos} />
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

DetailPresenter.propTypes = {
    result: PropTypes.object,
    account_state: PropTypes.object,
    imdb_id: PropTypes.object,
    videos: PropTypes.object,
    handleFavoriteBtn: PropTypes.func,
    handleClearRating: PropTypes.func,
    handleRating: PropTypes.func,
};

export default DetailPresenter;