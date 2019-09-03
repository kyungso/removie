import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "../Routes/Home/index";
import Movie from "../Routes/Movie/index";
import TV from "../Routes/TV/index";
import Search from "../Routes/Search/index";
import Detail from "../Routes/Detail/index"
import Collection from "../Routes/Collection/index";
import Header from "./Header";

export default () => (
  <Router>
    <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movie" exact component={Movie} />
          <Route path="/tv" exact component={TV} />
          <Route path="/search" exact component={Search} />
          <Route path="/search/tv_result" exact component={Search} />
          <Route path="/search/collection_result" exact component={Search} />
          <Route path="/movie/:id" exact component={Detail} />
          <Route path="/show/:id" exact component={Detail} />
          <Route path="/collection/:id" exact component={Collection} />
          <Redirect from="*" to="/" />
        </Switch>
    </>
  </Router>
);
