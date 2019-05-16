import React, { Component } from 'react';
import './App.css';
import HeaderButton from './components/HeaderButton';
import FormFilter from './components/FormFilter';
import NewsFeed from './components/NewsFeed';
import FilteredNews from './components/FilteredNews';
class App extends Component {
  state = {
    news: []
  }
  onstateHandler = (newnews) => {
    this.setState({ news: newnews });
  }
  chooserightcomponent = () => {
    //checking whether to display the latest news or filtered news
    if ((this.state.news).length === 0) {
      return (
        <div className="feed">
          <NewsFeed />
        </div>)
    }
    else {
      return (
        <div className="feed">
          <FilteredNews news={this.state.news} onclickHandler={this.onstateHandler} />
        </div>)
    }
  }
  render() {
    return (
      <div>
        <HeaderButton />
        <div className="container">
          <FormFilter onclickHandler={this.onstateHandler} />
          {this.chooserightcomponent()}
        </div>
      </div>
    )
  }
}

export default App;
