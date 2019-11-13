import React from "react";
import PropTypes from "prop-types";

import styles from './SectionTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Section = ({ title, isHome, children }) => (
    <div className={cx('section-container')}>
        <span className={cx('section-title')}>{title}</span>
        {isHome 
         ? <div className={cx('section-home')}>{children}</div>
         : <div className={cx('section')}>{children}</div>}
    </div>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    isHome: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Section;