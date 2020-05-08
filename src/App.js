import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component';

const HatsPage = (props) => {console.log(props)
  return (
    <div>
<h1>HatsPage: {props.match.params.hatsId}</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/shop/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
