import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

//components
import Navbar from './components/Navbar';
import Trending from './components/Trending';
import Search from './components/Search';
import Upload from './components/Upload';
import UploadPreview from './components/Uploaded-Preview';

class App extends React.Component {

  state = {
    data : []
  }

  render () {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path='/trending' render={() => <Trending/>}/>
          <Route path='/search' component={Search}/>
          <Route path='/upload' component={Upload}/>
          <Route path='/preview/:id' component={UploadPreview}/>
          <Redirect from='/' to='/trending'/>
        </Switch>
      </div>
    );
  }
}

export default App;
