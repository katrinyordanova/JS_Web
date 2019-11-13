import React from 'react';
import '../App/App.css';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from './Main/Main';
import Posts from '../Posts/Posts';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
        <Navigation />
        <div className="Container">
          <Aside />
          <Main title="Articles"><Posts /></Main>
        </div>
        <Footer />
    </div>
  );
}

export default App;
