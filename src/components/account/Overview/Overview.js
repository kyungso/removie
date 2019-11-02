import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Bar, Pie } from 'react-chartjs-2';

import styles from './Overview.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

//** check for data
let  arr_Bar = {};
const isBarCheck = (name) => {
  !arr_Bar[name] ? arr_Bar[name] = 1 : arr_Bar[name] = arr_Bar[name] + 1;
}

let arr_Pie = {};
const isPieCheck = (name) => {
  !arr_Pie[name] ? arr_Pie[name] = 1 : arr_Pie[name] = arr_Pie[name] + 1;
}

const toBeZero = (index) => {
  arr_Bar[index] = arr_Bar[index] || 0;
}

const Overview = ({ favoriteMovies, favoriteTV, ratedMovies, ratedTV, genreList }) => {    

    //** for barData
    const ratingList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr_Bar = {};
    ratedMovies.map(movie => isBarCheck(movie.rating));
    ratedTV.map(tv => isBarCheck(tv.rating));
    ratingList.map(rating => toBeZero(rating));
  
    const [barData] = useState({
        labels: ratingList,
        datasets:[
          {
            data:[
              arr_Bar[1], arr_Bar[2], arr_Bar[3], arr_Bar[4], arr_Bar[5], arr_Bar[6], arr_Bar[7], arr_Bar[8], arr_Bar[9], arr_Bar[10]
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
            ],
          }
        ]
      });

      //** for PieData ** 
      arr_Pie = {}     
      genreList.filter(genre => {
        ratedMovies.map(movie => (movie.genre_ids).map(id => {
          if(genre.id === id) {
            isPieCheck(genre.name);
          }
          return null;
        }))
        return null;
      })

      arr_Pie = Object.entries(arr_Pie).sort((a,b) => b[1] - a[1]);

      let otherData = 0;
      for(let i = 4; i < arr_Pie.length; i++) {
        otherData = otherData + arr_Pie[i][1];
      }

      const [PieData] = useState({
        labels: [arr_Pie[0][0], arr_Pie[1][0], arr_Pie[2][0], arr_Pie[3][0], 'Other'],
        datasets:[
          {
            data:[
              arr_Pie[0][1], arr_Pie[1][1], arr_Pie[2][1], arr_Pie[3][1], otherData
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
      
      //** for Total
      const Total_Favorites = favoriteMovies.length + favoriteTV.length;
      const Total_Ratings = ratedMovies.length + ratedTV.length;

    return (
    <>
        <div className={cx('overview-container')}>
            <div className={cx('overview-content')}>
                <h2 className={cx('title')}>Stats</h2>
                <div className={cx('stat_blocks')}>
                    <div className={cx('stat_block')}>
                        <h3>Total Favorites</h3>
                        <h2 className={cx('color')}>{Total_Favorites}</h2>
                    </div>
                    <div className={cx('stat_block')}>
                        <h3>Total Ratings</h3>
                        <h2 className={cx('color')}>{Total_Ratings}</h2>
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
                                tooltips: {
                                  callbacks: {
                                    label: function(tooltipItem, data) {
                                      //get the concerned dataset
                                      var dataset = data.datasets[tooltipItem.datasetIndex];
                                      //get the current items value
                                      var currentValue = dataset.data[tooltipItem.index];
                                      return currentValue + " ratings";
                                    },
                                    title: function(tooltipItem, data) {
                                      return "★ " + tooltipItem[0].xLabel;
                                    }
                                  }
                              } 
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
                                    position: 'right',
                                    labels: {
                                      fontColor: 'rgb(192, 192, 192)'
                                    }
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

Overview.propTypes = {
    favoriteMovies: PropTypes.array,
    favoriteTV: PropTypes.array,
    ratedMovies: PropTypes.array,
    ratedTV: PropTypes.array,
    genreList: PropTypes.array,
};

export default Overview;