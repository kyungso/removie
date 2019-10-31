import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { HomePage, LoginPage, AccountPage, MoviePage, TVPage, SearchPage, DetailPage, CollectionPage } from 'pages';
import HeaderContainer from "containers/HeaderContainer";
import Footer from 'components/common/Footer';

class App extends Component {
  render() {
    return(
        <>
            <HeaderContainer/>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/account" exact component={AccountPage} />
              <Route path={`/account/favorite?media_type=:media_type&media_id=:media_id&favorite=:favorite`} exact component={AccountPage} />
              <Route path={`/account/favorite/tv?media_type=:media_type&media_id=:media_id&favorite=:favorite`} exact component={AccountPage} />
              <Route path="/account/favorite" exact component={AccountPage} />
              <Route path="/account/favorite/tv" exact component={AccountPage} />
              <Route path="/account/rating" exact component={AccountPage} />
              <Route path="/account/rating/tv" exact component={AccountPage} />
              <Route path="/movie" exact component={MoviePage} />
              <Route path="/tv" exact component={TVPage} />
              <Route path="/search/movie_result?keyword=:searchValue" exact component={SearchPage} />
              <Route path="/search/tv_result?keyword=:searchValue" exact component={SearchPage} />
              <Route path="/search/collection_result?keyword=:searchValue" exact component={SearchPage} />
              <Route path="/search" exact component={SearchPage} />
              <Route path="/search/movie_result" exact component={SearchPage} />
              <Route path="/search/tv_result" exact component={SearchPage} />
              <Route path="/search/collection_result" exact component={SearchPage} />
              <Route path="/movie/:id" exact component={DetailPage} />
              <Route path="/movie/:id/companies" exact component={DetailPage} />
              <Route path="/movie/:id/countries" exact component={DetailPage} />
              <Route path="/show/:id" exact component={DetailPage} />
              <Route path="/show/:id/companies" exact component={DetailPage} />
              <Route path="/show/:id/countries" exact component={DetailPage} />
              <Route path="/collection/:id" exact component={CollectionPage} />
              <Redirect from="*" to="/" />
            </Switch>
            <Footer/>
        </>
    );
  }
}

export default App;
