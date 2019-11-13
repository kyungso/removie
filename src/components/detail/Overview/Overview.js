import React from 'react';

import styles from './Overview.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Overview = ({ overview }) => (
    <p className={cx('overview')}>{overview}</p>
);

export default Overview;


