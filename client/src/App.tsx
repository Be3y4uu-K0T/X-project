import React from 'react';
import logo from './logo.svg';
import Header from './components/header';
import Footer from './components/footer';
import Events from './components/events';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      {Events()}
      <Footer/>
    </div>
  );
};

export default App;