import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

const Pagination = withRouter(({ location: { pathname } }) => {
    return (
    <div className={cx('pagination_wrapper')}>
        <div className={cx('pagination')}>
            <Link to={``}>&laquo;</Link>
            <Link to={``}>1</Link>
            <Link to={``} className={cx('active')}>2</Link>
            <Link to={``}>3</Link>
            <Link to={``}>4</Link>
            <Link to={``}>5</Link>
            <Link to={``}>&raquo;</Link>
        </div>
     </div>
    );
});

export default Pagination;