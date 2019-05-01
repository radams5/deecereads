import React, { Component } from 'react';
import routes from './routes'
import NavBar from './components/NavBar/NavBar'
import "antd/dist/antd.css";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='NavBar'><NavBar /></div>
        {routes}
        <div className='Footer'></div>
      </div>
    );
  }
}

export default App;
