import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

const Pagination = withRouter(({ pages, toLink, activePage, onClick }) => {
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
                            onClick={() => { onClick(activePage-1)}}>
                        &laquo;
                    </Link>
                }
                {indexArr.map(index => (
                    <Link to={`${toLink}${index}`}
                        key={index}
                        className={cx(index === activePage ? "active" : "")}
                        onClick={() => { onClick(index)}}>{index}</Link>
                ))}
                {activePage === pages 
                    ? <></> 
                    : <Link to={`${toLink}${activePage+1}`}
                            onClick={() => { onClick(activePage+1)}}>
                        &raquo;
                    </Link>
                }
            </div>
        </div>
    }
    </>
    );
});

export default Pagination;