import React from 'react';
import styles from './Video.scss';
import classNames from 'classnames/bind';

import ReactPlayer from "react-player";

const cx = classNames.bind(styles);

const Video = ({ videos }) => (
    <div className={cx('video-container')}>
       <h3 className={cx('video-title')}>Related Videos</h3>
       <div className={cx('video-list')}>
            {videos.results && videos.results !== null &&
                videos.results.map(video => 
                <div className={cx('video')} key={video.key}>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`} controls width='100%' height='100%'/>
                </div>
            )}
       </div>
    </div>
);

export default Video;


