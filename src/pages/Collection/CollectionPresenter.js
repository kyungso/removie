import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './Collection.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Message from "components/common/Message";
import Poster from "components/common/Poster";

const cx = classNames.bind(styles);

const CollectionPresenter = ({ result, error, loading }) => (
    <>
        <Helmet>
            <title>Collections | Netflix</title>
        </Helmet>
        {loading ? (
            <Loader /> 
            ) : (
            <div className={cx('collection-container')}>
                <Helmet>
                    <title>Collections | Netflix</title>
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
                {error && <Message color="#e74c3c" text={error} />}
            </div>
        )}
    </>
);

CollectionPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default CollectionPresenter;