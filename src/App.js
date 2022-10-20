import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 9;
  country = 'in';
  apiKey = process.env.REACT_APP_NEWS_API;

  state = { progress : 0 };

  setProgress = (progress) => {
    this.setState({progress : progress });
  }

  render() {
    return (
        <div>
            <Router>
                <NavBar/>
                <LoadingBar
                  color='#f11946'
                  progress={this.state.progress}
                />
                <Routes>
                    <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country={this.country} category="general"/>} />
                    <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country={this.country} category="business"/>} />
                    <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country={this.country} category="entertainment"/>} />
                    <Route exact path="/general" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country={this.country} category="general"/>} />
                    <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country={this.country} category="health"/>} />
                    <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country={this.country} category="science"/>} />
                    <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country={this.country} category="sports"/>} />
                    <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country={this.country} category="technology"/>} />
                </Routes>
            </Router>
        </div>
    )
  }
}
