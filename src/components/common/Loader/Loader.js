import React from "react";
import styles from './Loader.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default () => (
    <div className={cx('loader')}></div>
);