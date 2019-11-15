import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './CollectionPresenter.scss';
import classNames from 'classnames/bind';

import Poster from "components/common/Poster";

const cx = classNames.bind(styles);

const CollectionPresenter = ({ result }) => (
    <div className={cx('collection-container')}>
        <Helmet>
            <title>Collections | REMOVIE</title>
        </Helmet> 
        <div className={cx('collection-backdrop')} 
             style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})` }}>
        </div>
        <div className={cx('collection-content')}>
            <div className={cx('collection-cover')}
                 style={{ backgroundImage: (result.poster_path ? `url(https://image.tmdb.org/t/p/original${result.poster_path})` : `url(require("lib/assets/noPosterSmall.png"))`) }}>
            </div>
            <div className={cx('collection-data')}>
                <h3 className={cx('collection-title')}>{result.name}</h3>
                <div className={cx('collectionItem-container')}>
                    <div className={cx('collectionItem')}>
                        {result.parts && result.parts != null &&
                        result.parts.map(series => 
                            <Poster 
                                key={series.id}
                                id={series.id}
                                imageUrl={series.poster_path}
                                title={series.title}
                                rating={series.vote_average}
                                year={series.release_date.substring(0, 4)}
                                isMovie={true}
                            />)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
);

CollectionPresenter.propTypes = {
    result: PropTypes.object
};

export default CollectionPresenter;