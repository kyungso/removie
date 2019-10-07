import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { HomePage, LoginPage, MoviePage, TVPage, SearchPage, DetailPage, CollectionPage } from 'pages';
import Header from "components/common/Header";
import Footer from 'components/common/Footer';

class App extends Component {
  render() {
    return(
        <>
            <Header/>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/permission" exact component={() => {
                let token = localStorage.getItem('token');
                //window.location.href=`https://www.themoviedb.org/authenticate/${token}`;
                window.location.replace(`https://www.themoviedb.org/authenticate/${token}`);
                return null;
              }} />
              <Route path="/login" exact component={LoginPage} />
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
