import React, { useState } from "react";
import PropTypes from "prop-types";
import { Bar, Pie } from 'react-chartjs-2';

import styles from './Rating.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Rating = () => {    
    const [barData, setBarData] = useState({
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets:[
          {
            data:[
              1, 1, 1, 1, 1, 1, 2, 3, 4, 5
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ]
          }
        ]
      });
      
      const [PieData, setPieData] = useState({
        labels: ['Action', 'Adventure', 'Comedy', 'Crime', 'Other'],
        datasets:[
          {
            data:[
              16.67, 16.67, 8.33, 8.33, 50
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ]
          }
        ]
      });

    return (
    <>
        <div className={cx('overview-container')}>
            <div className={cx('overview-content')}>
                <h2 className={cx('title')}>Stats</h2>
                <div className={cx('stat_blocks')}>
                    <div className={cx('stat_block')}>
                        <h3>Total Edits</h3>
                        <h2 className={cx('color')}>44</h2>
                    </div>
                    <div className={cx('stat_block')}>
                        <h3>Total Ratings</h3>
                        <h2 className={cx('color')}>5</h2>
                    </div>
                    <div className={cx('stat_block')}>
                        <h3>Rating Overview</h3>
                       <div className={cx('rating_chart')}>
                        <Bar 
                            data={barData}
                            options={{
                                legend: {
                                    labels: false
                                },
                            }}

                        />
                       </div>
                    </div>
                    <div className={cx('stat_block')}>
                        <h3>Most Watched Genres</h3>
                        <div className={cx('genre_chart')}>
                        <Pie
                            data={PieData}
                            options={{
                                legend: {
                                    position: 'right'
                                },
                                tooltips: {
                                    callbacks: {
                                      label: function(tooltipItem, data) {
                                        //get the concerned dataset
                                        var dataset = data.datasets[tooltipItem.datasetIndex];
                                        //calculate the total of this data set
                                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                          return previousValue + currentValue;
                                        });
                                        //get the current items value
                                        var currentValue = dataset.data[tooltipItem.index];
                                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                                        var percentage = ((currentValue/total) * 100).toFixed(2);
                                  
                                        return percentage + "%";
                                      }
                                    }
                                  } 
                            }}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

Rating.propTypes = {
    
};

export default Rating;