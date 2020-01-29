import React from 'react';
import PropTypes from "prop-types";

import styles from './SearchResults.scss';
import classNames from 'classnames/bind';

import Message from "components/common/Message";
import Slider from "components/common/Slider";

const cx = classNames.bind(styles);

const SearchResults = ({ movieResults, tvResults, collectionResults, searchTerm }) => {
  const result = [...movieResults, ...tvResults, ...collectionResults];

  const calcStartIndex = (movieLength) => {
    const startIndex = [];
    for(let i = 0; i < movieLength; i++) {
        if(i % 5 === 0) {
            startIndex.push(i);
        }
    }
    return startIndex;
  };
  
  return (
    <div className={cx('search-results')}>
      <h5>'{searchTerm}' 검색결과</h5>
      {result && result.length > 0 && (
        calcStartIndex(result.length).map(startIdx => (
        <Slider key={startIdx}>
          {result.slice(startIdx, startIdx+5).map((media, index) => (
          <Slider.Item media={media} key={media.id} index={index} isTV={media.title ? false : true}></Slider.Item>
          ))}
        </Slider>
        ))
      )}
      {result.length === 0 &&
       <Message text="Nothing found" color="#95a5a6" />
      }
    </div>
  );
};

SearchResults.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array, 
    collectionResults: PropTypes.array,  
    searchTerm: PropTypes.string
};

export default SearchResults;