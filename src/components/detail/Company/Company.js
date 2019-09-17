import React from 'react';
import styles from './Company.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Company = ({ result }) => (
    <div className={cx('company-container')}>
       <div className={cx('company-grid')}>
           <div className={cx('grid-wrapper')}>
                {result.production_companies &&
                            result.production_companies.map((company) =>
                    company.logo_path !== null &&
                        <div className={cx('logo-wrapper')} key={company.id}>
                            <div className={cx('logo')} 
                                 style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${company.logo_path})`}}/>
                            <span className={cx('logo-title')}>{company.name}</span> 
                        </div>
                )}
            </div>
        </div> 
    </div>
);

export default Company;


