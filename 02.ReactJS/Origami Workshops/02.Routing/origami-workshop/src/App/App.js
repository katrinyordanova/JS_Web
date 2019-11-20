import React from 'react';
import '../App/App.css';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from './Main/Main';
import Posts from './publications/Posts/Posts';
import Footer from '../Footer/Footer';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import CreatePost from './publications/CreatePost/CreatePost';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from './NotFound/NotFound';
import Loader from './Loader/Loader';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Loader local={true} isLoading={false} />
        <Navigation />
        <div className="Container">
          <Aside />
          <Main>
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/create-post" exact component={CreatePost} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/profile" exact component={Profile} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </Main>
        </div>
        <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
