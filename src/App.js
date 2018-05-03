import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          <div style={{ padding: 20 }}>
            <Search />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
