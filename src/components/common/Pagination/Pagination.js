import React from 'react';
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './Pagination.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Pagination = withRouter(({ pages, toLink, activePage, onClick, scrollTo }) => {
    let indexArr = [];
    for(let i = 1; i <= pages; i++) {
        indexArr.push(i); 
    }
    
    return (
    <>
    { pages > 0 &&
        <div className={cx('pagination_wrapper')}>
            <div className={cx('pagination')}>
                {activePage === 1 
                    ? <></> 
                    : <Link to={`${toLink}${activePage-1}`}
                            onClick={() => { window.scrollTo(scrollTo[0], scrollTo[1]); onClick(activePage-1)}}>
                        &laquo;
                    </Link>
                }
                {indexArr.map(index => (
                    <Link to={`${toLink}${index}`}
                        key={index}
                        className={cx(index === activePage ? "active" : "")}
                        onClick={() => { window.scrollTo(scrollTo[0], scrollTo[1]); onClick(index)}}>{index}</Link>
                ))}
                {activePage === pages 
                    ? <></> 
                    : <Link to={`${toLink}${activePage+1}`}
                            onClick={() => { window.scrollTo(scrollTo[0], scrollTo[1]); onClick(activePage+1)}}>
                        &raquo;
                    </Link>
                }
            </div>
        </div>
    }
    </>
    );
});

Pagination.propTypes = {
    pages: PropTypes.number,
    toLink: PropTypes.string,
    activePage: PropTypes.number,
    onClick: PropTypes.func,
    scrollTo: PropTypes.array,
};

export default Pagination;