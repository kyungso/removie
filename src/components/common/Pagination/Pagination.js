import React from 'react';
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './Pagination.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Pagination = withRouter(({ pages, toLink, activePage, onClick, scrollTo }) => {
    let startIndexArr = [];
    let indexArr = [];
    const findPageIndex = totalPage => {
        for(let j = 0; j < Math.floor(totalPage / 5) + 1; j++) {
            startIndexArr.push(5 * j + 1);
        }
    };

    const IndexCondition = activePage => {
        if(startIndexArr.length === 1) {
            partPagination(startIndexArr[0]);
        }else if(activePage >= startIndexArr[startIndexArr.length-1]) {
            partPagination(startIndexArr[startIndexArr.length-1]);
        }
        for(let k = 0; k < startIndexArr.length - 1; k++){
            if(startIndexArr[k] <= activePage && activePage < startIndexArr[k+1]) {
                partPagination(startIndexArr[k]);
            }
        }
    };

    const partPagination = startIndex => {
        for(let i = startIndex; i < startIndex + 5; i++){
           if(pages === i) {
               indexArr.push(i);
               break;
           }else {
            indexArr.push(i);
           }
        }
    };

    findPageIndex(pages);
    IndexCondition(activePage);

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