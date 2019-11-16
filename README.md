# REMOVIE

Enjoying a variety of movie, tv series, collection

- react / redux / redux-saga / Sass + CSS Module / axios

## API Verbs

using **['The Movie Database(TMDb) API v3'](https://www.themoviedb.org/documentation/api?language=en-US)** for Data

<br>

## Screens

- [x] Home
- [x] Login
- [x] Account
- [x] Movie
- [x] TV
- [x] Collection
- [x] Detail
- [x] Search

<br>

## Main Function

#### Home

- using Carousel [(react-slick)](https://github.com/akiran/react-slick)

<br>

#### Login

- get session-id by login using TMDB id, password 
- get account data using session-id 

<br>

#### Account

- Tabs inside of this page [ Overview / Favorites / Ratings ] 
- using chart [(react-chartjs-2)](https://github.com/jerairrest/react-chartjs-2) for overview of rated movies, tv shows
- favorite button to cancel favorite movie list or tv show list
- rating button to rate movies or tv shows

<br>

#### Detail

- IMDB(Internet Movie Database) Link 
- favorite button to mark or cancel movies and tv shows
- rating button to rate movies and tv shows
- Tabs inside of this page [ Overview / Production Companies / Production Countries ]
- add related Youtube Videos

<br>

#### Search

- result Tabs inside of this page [ Movies / TV shows / Collections ]
- Pagination for results
- maintain state after a page refresh

<br>

# Preview:

Try it on [https://removie.netlify.com/](https://removie.netlify.com/)