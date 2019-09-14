import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "pages/Home";
import Movie from "pages/Movie";
import TV from "pages/TV";
import Search from "pages/Search";
import Detail from "pages/Detail"
import Collection from "pages/Collection";
import Header from "components/common/Header";
import Footer from 'components/common/Footer';

class App extends Component {
  render() {
    return(
      <Router>
        <>
            <Header/>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/movie" exact component={Movie} />
              <Route path="/tv" exact component={TV} />
              <Route path="/search" exact component={Search} />
              <Route path="/search/tv_result" exact component={Search} />
              <Route path="/search/collection_result" exact component={Search} />
              <Route path="/movie/:id" exact component={Detail} />
              <Route path="/movie/:id/companies" exact component={Detail} />
              <Route path="/movie/:id/countries" exact component={Detail} />
              <Route path="/show/:id" exact component={Detail} />
              <Route path="/show/:id/companies" exact component={Detail} />
              <Route path="/show/:id/countries" exact component={Detail} />
              <Route path="/collection/:id" exact component={Collection} />
              <Redirect from="*" to="/" />
            </Switch>
            <Footer/>
        </>
      </Router>
    );
  }
}

export default App;
