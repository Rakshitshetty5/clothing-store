import React from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { createStructuredSelector } from 'reselect'


import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component'

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import CheckoutPage from './pages/checkout/checkout.component'

import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.actions'
import { dispatch } from 'rxjs/internal/observable/pairs';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession();
    
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage} />
        <Route 
          exact 
          path='/signin' 
          render={() => 
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage/>
              )
            } 
          />
        <Route exact path='/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    );
  }
}

/*
const mapStateToProps = ({user}) => (
  {currentUser : user.currentUser }
) */
// above code is same as below with memoization. header has furether explanation 

const mapStateToProps = createStructuredSelector(
  {
    currentUser : selectCurrentUser,
  
  }
) 

const dispatchStateToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, dispatchStateToProps)(App);
