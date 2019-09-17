import React from 'react';
import styles from './Country.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Country = ({ result }) => (
    <div className={cx('country-container')}>
       <span className={cx('countries')}>
        {result.production_countries 
            ? result.production_countries.map((country, index) =>
                    index === result.production_countries.length - 1 ? country.name : `${country.name} / ` )
            : result.origin_country[0]
        }
       </span>
    </div>
);

export default Country;


