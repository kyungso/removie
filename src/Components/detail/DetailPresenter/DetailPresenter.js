import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";  // public/index.html 변경

import styles from './DetailPresenter.scss';
import classNames from 'classnames/bind';

import DetailTab from "components/detail/DetailTab";
import Video from "components/detail/Video";

const cx = classNames.bind(styles);

const DetailPresenter = ({ result, imdb_id, videos }) => (
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
                        {   
                            <>
                                <span className="imdbRatingPlugin" data-user="ur107063764" data-title={`${imdb_id.imdb_id}`} data-style="t1">
                                    <a href={`https://www.imdb.com/title/${imdb_id.imdb_id}/?ref_=tt_plg_rt`}>
                                        <img alt={`${result.title ? result.title : result.name} on IMDb`} src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" />
                                    </a>
                                </span>
                                <script>
                                    {(function(d,s,id){
                                        var js,stags=d.getElementsByTagName(s)[0];
                                        if(d.getElementById(id)){return;}
                                            js=d.createElement(s);
                                            js.id=id;
                                            js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";
                                            stags.parentNode.insertBefore(js,stags);
                                    })(document,'script','imdb-rating-api')}    
                                </script>                    
                            </>                
                        }        
                    </span>
                </div>
                <div className={cx('detailItem-container')}>
                    <span>
                        {result.genres &&
                            result.genres.map((genre, index) =>
                                index === result.genres.length - 1
                                    ? genre.name
                                    : `${genre.name} / `
                        )}
                    </span>
                </div>
                <div className={cx('detailItem-container')}>
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

DetailPresenter.propTypes = {
    result: PropTypes.object,
};

export default DetailPresenter;