import React from "react";
import PropTypes from "prop-types";

import styles from './SectionTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Section = ({ title, children }) => (
    <div className={cx('section-container')}>
      {title && <span className={cx('section-title')}>{title}</span>}
      <div className={cx('section')}>{children}</div>
    </div>
);

Section.propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Section;