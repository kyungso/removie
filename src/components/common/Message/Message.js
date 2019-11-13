import React from 'react';
import PropTypes from "prop-types";

import styles from './Message.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Message = ({ text, color }) => (
    <div className={cx('message')}>
        <span style={{color: `${color}`}}>{text}</span>
    </div>
);

Message.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Message;