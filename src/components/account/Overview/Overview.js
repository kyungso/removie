import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Bar, Pie } from 'react-chartjs-2';

import styles from './Overview.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Overview = ({ favoriteMovies, favoriteTV, ratedMovies, ratedTV, genreList }) => {    

  //** for Total
  const Total_Favorites = favoriteMovies.length + favoriteTV.length;
  const Total_Ratings = ratedMovies.length + ratedTV.length;
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});

  //** for barData
  useEffect(() => {
    let  arr_Bar = {};
    const isBarCheck = (name) => {
      !arr_Bar[name] ? arr_Bar[name] = 1 : arr_Bar[name] = arr_Bar[name] + 1;
    };

    const toBeZero = (index) => {
      arr_Bar[index] = arr_Bar[index] || 0;
    };

    const ratingList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr_Bar = {};
    ratedMovies.map(movie => isBarCheck(movie.rating));
    ratedTV.map(tv => isBarCheck(tv.rating));
    ratingList.map(rating => toBeZero(rating));

    setBarData({
      labels: ratingList,
      datasets:[{
        data: Object.values(arr_Bar),
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
      }]
    });
  },[ratedMovies, ratedTV]);

  //** for PieData ** 
  useEffect(() => {
    let arr_Pie = {};
    const isPieCheck = (name) => {
      !arr_Pie[name] ? arr_Pie[name] = 1 : arr_Pie[name] = arr_Pie[name] + 1;
    };

    genreList.filter(genre => {
      ratedMovies.map(movie => (movie.genre_ids).map(id => {
        if(genre.id === id) {
          isPieCheck(genre.name);
        }
        return null;
      }))
      return null;
    })

    // sort main genre
    arr_Pie = Object.entries(arr_Pie).sort((a,b) => b[1] - a[1]);

    // calculate rest of main genre, when less than 4 genres 
    if(arr_Pie.length <= 4) {
      setPieData({
        labels: arr_Pie.map(a => a[0]),
        datasets:[{
          data: arr_Pie.map(b => b[1]),
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ]
        }]
      }); // calculate rest of main genre, when more than 4 genres 
    } else if(arr_Pie.length > 4) {
      let otherData = 0;
      for(let i = 4; i < arr_Pie.length; i++) {
        otherData = otherData + arr_Pie[i][1];
      }

      setPieData({
        labels: [arr_Pie[0][0], arr_Pie[1][0], arr_Pie[2][0], arr_Pie[3][0], 'Other'],
        datasets:[{
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
        }]
      });
    }
  }, [genreList, ratedMovies]);

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
                {Total_Ratings > 0 && 
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
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                        stepSize: 1
                        }
                      }]
                    }  
                  }}
                 />
                </div>
                }
                {Total_Ratings === 0 && <div style={{ color: `#95a5a6` }}>아직 평가한 작품이 없어요.</div>}
              </div>
              <div className={cx('stat_block')}>
                <h3>Most Watched Genres</h3>
                {ratedMovies.length > 0 && 
                 <div className={cx('genre_chart')}>
                  <Pie
                    data={pieData}
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
                }
                {ratedMovies.length === 0 && <div style={{ color: `#95a5a6` }}>아직 본 작품이 없어요.</div>}
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