import React from "react";
import { Link, withRouter } from 'react-router-dom';
import styles from './DetailTab.scss';
import classNames from 'classnames/bind';

import Overview from "components/detail/Overview";
import Company from "components/detail/Company";
import Country from "components/detail/Country";

const cx = classNames.bind(styles);

const DetailTab = withRouter(({ location, overview, result }) => {
   const id = `${result.id}`;
   const isMovie = location.pathname.includes("/movie/");
   const url = (isMovie ? `/movie/${id}` : `/show/${id}`);

   return (
    <>
    <header className={cx('detailTab-container')}>
        <ul className={cx('tab-list')}>
            <li className={cx('tab-items')} 
                style={{ borderBottom: (location.pathname === url ? `3px solid #3498db` : `3px solid transparent`),
                         color: (location.pathname === url ? `#ffffff` : `#7d7d7d`)}}>
                <Link to={url} className={cx('tab-link')}>OVERVIEW</Link>
            </li>
            <li className={cx('tab-items')}
                style={{ borderBottom: (location.pathname === `${url}/companies` ? `3px solid #3498db` : `3px solid transparent`),
                         color: (location.pathname === `${url}/companies` ? `#ffffff` : `#7d7d7d`)}} >
                <Link to={`${url}/companies`} className={cx('tab-link')}>Production Companies</Link>
            </li>
            <li className={cx('tab-items')} 
                style={{ borderBottom: (location.pathname === `${url}/countries` ? `3px solid #3498db` : `3px solid transparent`),
                         color: (location.pathname === `${url}/countries` ? `#ffffff` : `#7d7d7d`)}}>
                <Link to={`${url}/countries`} className={cx('tab-link')}>Production Countries</Link>
            </li>
        </ul>
    </header>

    <div className={cx('detailTab-content')}>
        {location.pathname === url && <Overview overview={overview} /> }
        {location.pathname === `${url}/companies` && <Company result={result}/>}
        {location.pathname === `${url}/countries` && <Country result={result}/>}
    </div>
    </>
   );
});

export default DetailTab;