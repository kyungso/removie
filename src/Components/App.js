import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { HomePage, MoviePage, TVPage, SearchPage, DetailPage, CollectionPage } from 'pages';
import Header from "components/common/Header";
import Footer from 'components/common/Footer';

class App extends Component {
  render() {
    return(
        <>
            <Header/>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/movie" exact component={MoviePage} />
              <Route path="/tv" exact component={TVPage} />
              <Route path="/search" exact component={SearchPage} />
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
